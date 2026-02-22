import Image from "next/image";
import type { Metadata } from "next";
import { GraduationCap, Globe, Check } from "lucide-react";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { profile, experiences } from "@/lib/content";
import { primary, ui } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("About & Experience", "Professional summary, skills, education, and career timeline", "/about");

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <SectionHeading title={ui.about.title + " & " + ui.experience.title} subtitle={ui.home.intro.en} />

      {/* About Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="reveal premium-card p-8 lg:col-span-2 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="heading-luxe text-4xl text-emerald-950 mb-4">{ui.about.summary}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#c8a96f] to-emerald-400 rounded-full mb-6"></div>
          <p className="mt-3 text-base leading-8 text-emerald-900/85 tracking-wide">{primary(profile.summary)}</p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-emerald-950 mb-4">{ui.about.skills}</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.en.map((skill) => (
                <span key={skill} className="bg-emerald-100/50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal premium-card overflow-hidden p-0 group">
          <div className="relative h-full w-full min-h-[400px]">
            <Image src="/images/people/formal/fern-office-portrait-smile.jpg" alt="Fern formal portrait in office attire" fill className="media-lift h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="reveal premium-card p-8">
          <h2 className="heading-luxe text-3xl text-emerald-950 flex items-center gap-3">
            <span className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 text-emerald-700 shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </span>
            {ui.about.education}
          </h2>
          <div className="mt-6 space-y-5 text-sm text-emerald-900/85 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-300/50 before:to-transparent">
            {profile.education.map((item) => (
              <div key={item.institution} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gradient-to-br from-emerald-100 to-[#c8a96f]/20 text-emerald-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                  <p className="font-bold text-emerald-950 text-base">{primary(item.degree)}</p>
                  <p className="text-emerald-800 mt-1">{item.institution}</p>
                  <p className="text-emerald-600/80 font-mono text-xs mt-2 bg-emerald-50 inline-block px-2 py-1 rounded">{item.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal premium-card p-8">
          <h2 className="heading-luxe text-3xl text-emerald-950 flex items-center gap-3">
            <span className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 text-emerald-700 shadow-sm">
              <Globe className="h-6 w-6" />
            </span>
            {ui.about.languages}
          </h2>
          <div className="mt-6 space-y-4 text-sm text-emerald-900/85">
            {profile.languages.map((language) => (
              <div key={language.name} className="flex flex-col gap-2 p-4 rounded-xl border border-emerald-100/50 bg-white/40 hover:bg-white/60 transition-colors">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-emerald-950 text-base">{language.name}</p>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">{primary(language.level)}</span>
                </div>
                {/* Visual indicator of level */}
                <div className="w-full bg-emerald-100/50 rounded-full h-2 mt-1">
                  <div className={`bg-gradient-to-r from-emerald-400 to-[#c8a96f] h-2 rounded-full ${language.name === 'Thai' ? 'w-full' : 'w-4/5'}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative image in languages section */}
          <div className="mt-8 rounded-xl overflow-hidden relative h-48 border border-emerald-100/50 shadow-inner group">
            <Image src="/images/abstract/emerald-gold-texture.png" alt="Abstract luxury emerald texture" fill className="object-cover opacity-90 mix-blend-multiply transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
          </div>
        </section>
      </div>

      {/* Experience Section */}
      <div className="mt-16 pt-8 border-t border-emerald-200/30">
        <div className="text-center mb-10">
          <span className="text-[#c8a96f] font-semibold tracking-widest uppercase text-sm mb-2 block">Career Journey</span>
          <h2 className="heading-luxe text-4xl text-emerald-950">{ui.experience.title}</h2>
        </div>

        <div className="reveal premium-card p-8 bg-white/30 backdrop-blur-md">
          <ExperienceTimeline items={experiences} />
        </div>
      </div>
    </div>
  );
}
