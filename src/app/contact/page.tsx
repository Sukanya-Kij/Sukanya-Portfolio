import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/portfolio/contact-form";
import { profile } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("Contact", "Contact Sukanya Kijjapalo", "/contact");

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-10">
      {/* Abstract Luxury Hero Section */}
      <section className="reveal premium-card relative overflow-hidden rounded-3xl min-h-[45vh] shadow-2xl flex flex-col justify-center items-center text-center p-10 md:p-16">
        {/* Background Network Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/abstract/contact-emerald-gold-network.png"
            alt="Abstract networking lines"
            fill
            sizes="100vw"
            className="object-cover opacity-90 mix-blend-screen"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/60 to-emerald-900/70 z-10" />

        <div className="relative z-20 max-w-3xl transform hover:scale-[1.01] transition-transform duration-1000">
          <div className="inline-flex items-center gap-2 mb-6 justify-center">
            <span className="h-px w-8 bg-[#dfca9f]/60"></span>
            <p className="eyebrow text-[#dfca9f] tracking-widest uppercase">Get in Touch</p>
            <span className="h-px w-8 bg-[#dfca9f]/60"></span>
          </div>
          <h1 className="heading-luxe text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
            {ui.contact.title}
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/90 font-light leading-relaxed max-w-xl mx-auto">
            {ui.contact.subtitle}
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-5 lg:items-start max-w-6xl mx-auto">
        {/* Contact Info Card */}
        <article className="reveal premium-card overflow-hidden group lg:col-span-2">
          <div className="relative h-64 sm:h-80 w-full">
            <Image
              src="/images/people/formal/office-portrait-saigon.jpg"
              alt="Fern portrait for contact section"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="media-lift object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-2xl mb-1">{profile.nickname} ({profile.fullName})</h3>
              <p className="text-emerald-300 font-medium text-sm">Coordination & CRM Professional</p>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white/70 backdrop-blur-md space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 hover:bg-emerald-100/50 transition-colors group/contact">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center shrink-0 shadow-inner group-hover/contact:-translate-y-1 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dfca9f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-bold tracking-widest text-[#b89555] uppercase">{ui.contact.emailLabel}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-[44px] items-center text-emerald-950 font-semibold tracking-wide hover:text-emerald-700 transition-colors break-all"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            {profile.phone && (
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 hover:bg-emerald-100/50 transition-colors group/contact">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center shrink-0 shadow-inner group-hover/contact:-translate-y-1 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dfca9f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-bold tracking-widest text-[#b89555] uppercase">Phone</p>
                  <a
                    href={`tel:${profile.phone.replace(/\D/g, '')}`}
                    className="inline-flex min-h-[44px] items-center text-emerald-950 font-semibold tracking-wide hover:text-emerald-700 transition-colors break-all"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 hover:bg-emerald-100/50 transition-colors group/contact">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 flex items-center justify-center shrink-0 shadow-inner group-hover/contact:-translate-y-1 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dfca9f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-bold tracking-widest text-[#b89555] uppercase">Instagram</p>
                <a
                  href="https://www.instagram.com/tonfern98/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-emerald-950 font-semibold tracking-wide hover:text-emerald-700 transition-colors break-all"
                >
                  @tonfern98
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Form Card */}
        <div className="reveal premium-card lg:col-span-3 h-full" style={{ animationDelay: '100ms' }}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
