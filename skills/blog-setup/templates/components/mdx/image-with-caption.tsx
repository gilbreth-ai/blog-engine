import React from "react";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  source,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      {(caption || source) && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
          {source && (
            <>
              {caption && " "}
              <span className="text-xs text-gray-400">
                (Source:{" "}
                {source.startsWith("http") ? (
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors"
                    style={{ color: "inherit" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand, #e8590c)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                  >
                    {source}
                  </a>
                ) : (
                  source
                )}
                )
              </span>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
