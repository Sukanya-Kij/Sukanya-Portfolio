export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal mb-8 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
