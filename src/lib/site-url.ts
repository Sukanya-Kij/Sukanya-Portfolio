function withProtocol(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://${value}`;
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return withProtocol(explicit);
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) {
    return withProtocol(production);
  }

  const preview = process.env.VERCEL_URL;
  if (preview) {
    return withProtocol(preview);
  }

  return "http://localhost:3000";
}
