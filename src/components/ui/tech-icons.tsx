"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiVite,
  SiSupabase,
  SiOpenai,
  SiExpo,
  SiGooglegemini,
  SiReactrouter,
  SiTailwindcss,
  SiTelegram,
} from "react-icons/si";
import { LuDatabase, LuBot } from "react-icons/lu";

export const techIconClassName = "w-5 h-5 text-neutral-500 dark:text-neutral-400 opacity-70 transition hover:opacity-100 hover:drop-shadow";

export const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Python: SiPython,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Vite: SiVite,
  Supabase: SiSupabase,
  OpenAI: SiOpenai,
  ChromaDB: LuDatabase,
  "React Native": SiReact,
  Expo: SiExpo,
  "Gemini AI": SiGooglegemini,
  Duckling: LuBot,
  "React Router": SiReactrouter,
  "Tailwind CSS": SiTailwindcss,
  "Telegram API": SiTelegram,
};
