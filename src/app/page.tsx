import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { primary, ui } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { Briefcase, Handshake, TrendingUp } from "lucide-react";

export const metadata: Metadata = buildPageMetadata(
  "Home",
  "Professional portfolio of Sukanya Kijjapalo with certifications, field activities, and project results.",
  "/",
);

export default function HomePage() {
  return (
    <div className="space-y-16 pb-10">
      {/* Hero Section */}
      <section className="reveal premium-card grid overflow-hidden lg:grid-cols-5 relative shadow-2xl border-emerald-900/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-emerald-50/10 z-0"></div>
        <div className="p-8 lg:col-span-3 lg:p-12 z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-emerald-600"></span>
            <p className="eyebrow text-emerald-800 tracking-widest">Executive Portfolio</p>
          </div>

          <h1 className="heading-luxe mt-2 text-5xl leading-tight tracking-tight text-emerald-950 sm:text-6xl md:text-[4.5rem] drop-shadow-sm">
            {profile.fullName} <span className="text-emerald-700/80 font-light text-4xl sm:text-5xl">({profile.nickname})</span>
          </h1>

          <p className="mt-4 text-xl font-medium text-emerald-800 border-l-4 border-[#c8a96f] pl-4 py-1">{ui.role.en}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-900/80">{ui.home.intro.en}</p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/about" className="btn-primary rounded-full bg-gradient-to-r from-emerald-800 to-emerald-950 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl hover:shadow-emerald-900/20 transition-all">
              {ui.home.ctaExperience}
            </Link>
            <Link href="/portfolio" className="group flex items-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide text-emerald-900 hover:text-emerald-700 transition-colors">
              {ui.home.ctaPortfolio}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="relative h-96 lg:col-span-2 lg:h-full min-h-[500px] z-10 group">
          <Image src="/images/people/formal/fern-boardroom-professional.jpg" alt="Fern in professional boardroom meeting" fill className="media-lift object-cover object-[center_30%]" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60"></div>

          {/* Floating Badges */}
          <div className="kpi-chip float-soft absolute right-6 top-10 rounded-2xl px-4 py-3 text-sm font-bold text-emerald-950 backdrop-blur-md flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Certified Pro
          </div>

          <div className="kpi-chip float-soft absolute left-6 bottom-12 rounded-2xl px-5 py-3 text-sm font-bold text-emerald-950 backdrop-blur-md shadow-2xl" style={{ animationDelay: '2s' }}>
            <span className="block text-2xl mb-1 text-emerald-700">90%+</span>
            <span className="text-xs uppercase tracking-wider text-emerald-600/80">Retention KPI</span>
          </div>
        </div>
      </section>

      {/* KPI Highlights */}
      <section className="grid gap-6 sm:grid-cols-3">
        {[
          { title: "Experience", desc: ui.home.yearsExp.en, icon: Briefcase, metric: "4+" },
          { title: "Retention KPI", desc: ui.home.metricRenewal.en, icon: Handshake, metric: "90%" },
          { title: "Process Improvement", desc: ui.home.metricAutomation.en, icon: TrendingUp, metric: "30%" }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <article key={i} className="reveal premium-card p-8 group hover:bg-emerald-50/50 transition-colors border-emerald-950/5 hover:border-emerald-200/60">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10 group-hover:-translate-y-1 transition-transform duration-700">
                <Icon className="h-5 w-5 text-[#dfca9f]" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-emerald-950 tracking-tight">{item.metric}</span>
                <h2 className="text-xs font-bold tracking-widest text-[#b89555] uppercase">{item.title}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900/80 font-medium">{item.desc}</p>
            </article>
          );
        })}
      </section>

      {/* Image Gallery */}
      <section className="grid gap-6 lg:grid-cols-3">
        <article className="reveal premium-card overflow-hidden lg:col-span-2 relative group h-80">
          <Image src="/images/achievements/sgs-team-recognition-stage.jpg" alt="Fern with team during standards recognition event" fill className="media-lift object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-white font-bold text-xl mb-1">Team Recognition</h3>
            <p className="text-emerald-100/80 text-sm">Standards Excellence Award Ceremony</p>
          </div>
        </article>
        <article className="reveal premium-card overflow-hidden relative group h-80">
          <Image src="/images/people/casual/fern-city-night-casual.jpg" alt="Fern portrait at city night" fill className="media-lift object-cover" />
          <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </article>
      </section>

      {/* Professional Summary */}
      <section className="grid gap-6 lg:grid-cols-5">
        <article className="reveal premium-card p-10 lg:col-span-3 flex flex-col justify-center bg-white/40">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[#c8a96f]">✦</span>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-800/60">Overview</span>
          </div>
          <h2 className="heading-luxe text-4xl text-emerald-950 mb-6">Professional Summary</h2>
          <p className="text-base leading-relaxed text-emerald-900/85 md:text-lg">{primary(profile.summary)}</p>
          <div className="mt-8 pt-6 border-t border-emerald-900/10">
            <Link href="/about" className="font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-2 group">
              Read Full Bio
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </article>
        <article className="reveal premium-card overflow-hidden lg:col-span-2 relative group min-h-[350px]">
          <Image
            src="/images/certificates/sgs-certificate-crm-auto-alert-2023.jpg"
            alt="CRM Auto Alert recognition certificate"
            fill
            className="media-lift object-cover lg:object-cover sm:object-contain bg-emerald-50/50 p-6"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-2xl"></div>
        </article>
      </section>
    </div>
  );
}
