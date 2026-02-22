import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="heading-luxe text-5xl text-emerald-50">Page not found</h1>
      <p className="mt-3 text-emerald-200/85">The page you requested does not exist.</p>
      <Link href="/" className="btn-primary mt-6 rounded-xl border border-emerald-700 bg-emerald-800 px-4 py-2 text-sm font-semibold text-white">
        Back to home
      </Link>
    </div>
  );
}
