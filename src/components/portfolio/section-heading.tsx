export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="reveal mb-8 max-w-4xl">
      <h1 className="heading-luxe text-4xl tracking-tight text-emerald-50 sm:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-3 max-w-3xl text-base text-emerald-100/90 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
