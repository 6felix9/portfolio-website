/**
 * Pixel portrait — the hero image drawn as a grid of square dots.
 *
 *  - On load the dots assemble with the same rise + fade used across the site.
 *  - With a mouse, dots near the cursor are pushed away and shimmer.
 *  - Click / tap sends a ripple that re-assembles the picture from that point.
 *  - When nothing is moving the animation loop stops completely: the finished
 *    picture is cached on an offscreen canvas and the page does zero work.
 *
 * Usage: <canvas data-pixel-portrait data-src="/path/to/image.webp">
 */

const CELL = 4; // grid spacing in CSS px
const DOT_SCALE = 0.9; // dot size relative to the cell
const BACKGROUND = "#000";
const MIN_LUMA = 9; // near-black cells are skipped (they match the background)

const INTRO_DURATION = 0.75; // seconds each dot takes to settle
const INTRO_SPREAD = 0.75; // seconds between the first and last dot starting
const INTRO_RISE = 14; // px

const RADIUS = 110; // cursor influence in CSS px
const REPEL = 7; // max push away from the cursor
const JITTER = 2.2; // max shimmer near the cursor

interface Dot {
  x: number;
  y: number;
  color: string;
  seed: number;
  delay: number;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

function createPortrait(canvas: HTMLCanvasElement) {
  const src = canvas.dataset.src;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!src || !ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const image = new Image();
  const still = document.createElement("canvas"); // cached, fully-assembled picture
  const stillCtx = still.getContext("2d", { alpha: false })!;

  let ready = false;
  let visible = true;
  let raf = 0;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let cols = 0;
  let rows = 0;
  let offsetX = 0;
  let offsetY = 0;
  let dotSize = CELL * DOT_SCALE;
  let dots: (Dot | null)[] = [];

  let introStart = 0;
  let introDone = reduceMotion;

  const target = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0 };
  let activity = 0;
  let activityTarget = 0;

  /** Sample the image into a grid of dots and cache the finished picture. */
  function build() {
    const rect = canvas.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    if (!width || !height) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = still.width = Math.round(width * dpr);
    canvas.height = still.height = Math.round(height * dpr);

    cols = Math.floor(width / CELL);
    rows = Math.floor(height / CELL);
    offsetX = (width - cols * CELL) / 2;
    offsetY = (height - rows * CELL) / 2;
    dotSize = Math.max(1, Math.floor(CELL * DOT_SCALE * dpr)) / dpr;
    const inset = (CELL - dotSize) / 2;

    // Let the browser do the averaging: draw the photo (cover-fit) onto a
    // canvas that has exactly one pixel per dot.
    const sample = document.createElement("canvas");
    sample.width = cols;
    sample.height = rows;
    const sampleCtx = sample.getContext("2d", { willReadFrequently: true })!;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const gridRatio = cols / rows;
    let sw = image.naturalWidth;
    let sh = image.naturalHeight;
    if (imageRatio > gridRatio) sw = sh * gridRatio;
    else sh = sw / gridRatio;
    const sx = (image.naturalWidth - sw) / 2;
    const sy = (image.naturalHeight - sh) / 2;
    sampleCtx.imageSmoothingQuality = "high";
    sampleCtx.drawImage(image, sx, sy, sw, sh, 0, 0, cols, rows);
    const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;

    dots = new Array(cols * rows);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = row * cols + col;
        const r = pixels[i * 4];
        const g = pixels[i * 4 + 1];
        const b = pixels[i * 4 + 2];
        if (0.2126 * r + 0.7152 * g + 0.0722 * b < MIN_LUMA) {
          dots[i] = null;
          continue;
        }
        dots[i] = {
          x: offsetX + col * CELL + inset,
          y: offsetY + row * CELL + inset,
          color: `rgb(${r},${g},${b})`,
          seed: Math.random() * Math.PI * 2,
          // diagonal sweep, top-left → bottom-right, with a little noise
          delay: ((col / cols + row / rows) / 2) * INTRO_SPREAD * 0.8 + Math.random() * INTRO_SPREAD * 0.2,
        };
      }
    }

    stillCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stillCtx.fillStyle = BACKGROUND;
    stillCtx.fillRect(0, 0, width, height);
    for (const dot of dots) {
      if (!dot) continue;
      stillCtx.fillStyle = dot.color;
      stillCtx.fillRect(dot.x, dot.y, dotSize, dotSize);
    }
  }

  function drawStill() {
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.drawImage(still, 0, 0);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawIntro(now: number) {
    const elapsed = (now - introStart) / 1000;
    let settled = true;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.fillStyle = BACKGROUND;
    ctx!.fillRect(0, 0, width, height);
    for (const dot of dots) {
      if (!dot) continue;
      const t = clamp01((elapsed - dot.delay) / INTRO_DURATION);
      if (t < 1) settled = false;
      if (t <= 0) continue;
      const k = easeOut(t);
      ctx!.globalAlpha = k;
      ctx!.fillStyle = dot.color;
      ctx!.fillRect(dot.x, dot.y + (1 - k) * INTRO_RISE, dotSize, dotSize);
    }
    ctx!.globalAlpha = 1;
    if (settled) introDone = true;
  }

  /** Redraw only the patch of dots around the cursor on top of the cached picture. */
  function drawInteraction(now: number) {
    pointer.x += (target.x - pointer.x) * 0.18;
    pointer.y += (target.y - pointer.y) * 0.18;
    activity += (activityTarget - activity) * 0.09;

    drawStill();
    if (activity < 0.004) return;

    const reach = RADIUS + REPEL + JITTER + CELL;
    const col0 = Math.max(0, Math.floor((pointer.x - reach - offsetX) / CELL));
    const col1 = Math.min(cols - 1, Math.ceil((pointer.x + reach - offsetX) / CELL));
    const row0 = Math.max(0, Math.floor((pointer.y - reach - offsetY) / CELL));
    const row1 = Math.min(rows - 1, Math.ceil((pointer.y + reach - offsetY) / CELL));
    if (col1 < col0 || row1 < row0) return;

    ctx!.fillStyle = BACKGROUND;
    ctx!.fillRect(
      offsetX + col0 * CELL,
      offsetY + row0 * CELL,
      (col1 - col0 + 1) * CELL,
      (row1 - row0 + 1) * CELL,
    );

    const half = dotSize / 2;
    for (let row = row0; row <= row1; row++) {
      for (let col = col0; col <= col1; col++) {
        const dot = dots[row * cols + col];
        if (!dot) continue;
        let x = dot.x;
        let y = dot.y;
        const dx = dot.x + half - pointer.x;
        const dy = dot.y + half - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < RADIUS) {
          let force = 1 - distance / RADIUS;
          force = force * force * (3 - 2 * force) * activity; // smoothstep falloff
          const inv = distance > 0.001 ? 1 / distance : 0;
          x += dx * inv * REPEL * force + Math.sin(now * 0.004 + dot.seed) * JITTER * force;
          y += dy * inv * REPEL * force + Math.cos(now * 0.0033 + dot.seed * 1.7) * JITTER * force;
        }
        ctx!.fillStyle = dot.color;
        ctx!.fillRect(x, y, dotSize, dotSize);
      }
    }
  }

  function frame(now: number) {
    raf = 0;
    if (!introDone) {
      drawIntro(now);
      request();
      return;
    }
    drawInteraction(now);
    // Keep running only while the cursor effect is visible or fading out.
    if (activityTarget > 0 || activity >= 0.004) request();
  }

  function request() {
    if (!raf && ready && visible) raf = requestAnimationFrame(frame);
  }

  function replay(fromX?: number, fromY?: number) {
    if (reduceMotion || !ready) return;
    if (fromX !== undefined && fromY !== undefined) {
      const farthest = Math.hypot(Math.max(fromX, width - fromX), Math.max(fromY, height - fromY));
      for (const dot of dots) {
        if (!dot) continue;
        const distance = Math.hypot(dot.x - fromX, dot.y - fromY);
        dot.delay = (distance / farthest) * INTRO_SPREAD * 0.8 + Math.random() * INTRO_SPREAD * 0.12;
      }
    }
    introStart = performance.now();
    introDone = false;
    request();
  }

  // --- wiring -------------------------------------------------------
  const local = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  if (finePointer && !reduceMotion) {
    canvas.addEventListener("pointerenter", (event) => {
      Object.assign(target, local(event));
      if (activity < 0.01) Object.assign(pointer, target);
      activityTarget = 1;
      request();
    });
    canvas.addEventListener("pointermove", (event) => {
      Object.assign(target, local(event));
      activityTarget = 1;
      request();
    });
    canvas.addEventListener("pointerleave", () => {
      activityTarget = 0;
      request();
    });
  }
  canvas.addEventListener("click", (event) => {
    const { x, y } = local(event);
    replay(x, y);
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
  }).observe(canvas);

  let resizeTimer = 0;
  new ResizeObserver(() => {
    if (!ready) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const before = `${width}x${height}`;
      const rect = canvas.getBoundingClientRect();
      if (`${Math.round(rect.width)}x${Math.round(rect.height)}` === before) return;
      build();
      if (introDone) drawStill();
      request();
    }, 150);
  }).observe(canvas);

  image.decoding = "async";
  image.src = src;
  image
    .decode()
    .then(() => {
      build();
      ready = true;
      if (introDone) {
        drawStill();
      } else {
        introStart = performance.now();
        request();
      }
    })
    .catch(() => {
      /* image failed to load — leave the canvas blank */
    });
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-pixel-portrait]").forEach(createPortrait);
