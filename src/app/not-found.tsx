import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you requested does not exist.</p>
      <Link href="/th" className="mt-6 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">
        Back to home
      </Link>
    </div>
  );
}
