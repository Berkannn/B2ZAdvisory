export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow ${light ? "text-brand-300" : ""}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-carbon-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-carbon-300" : "text-carbon-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
