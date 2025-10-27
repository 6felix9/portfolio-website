"use client";
import { LinkPreview } from "./link-preview";

type ExperienceImage = {
  src: string;
  href?: string;
  alt?: string;
};

type ExperienceCardProps = {
  content: {
    position: string;
    company: string;
    description: string[];
    images?: ExperienceImage[];
  };
};

export const ExperienceCard = ({ content }: ExperienceCardProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {content.position}
        </h4>
        <p className="text-base md:text-lg text-foreground/60">
          {content.company}
        </p>
      </div>
      <div className="space-y-3">
        {content.description.map((desc, index) => (
          <p
            key={index}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-foreground/80"
          >
            {desc}
          </p>
        ))}
      </div>
      {content.images && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {content.images.map((image, index) => {
            const key = `${image.src}-${index}`;
            const alt =
              image.alt ??
              `${content.position} at ${content.company} - Photo ${index + 1}`;

            if (image.href) {
              return (
                <LinkPreview key={key} url={image.href}>
                  <img
                    src={image.src}
                    alt={alt}
                    width={500}
                    height={500}
                    className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
                  />
                </LinkPreview>
              );
            }

            return (
              <img
                key={key}
                src={image.src}
                alt={alt}
                width={500}
                height={500}
                className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
