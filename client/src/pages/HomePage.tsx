import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  MonitorSmartphone,
  Sparkles,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { CTASection } from "../components/CTASection";
import { SectionHeading } from "../components/SectionHeading";
import { bootcamp, expectations, homeContent, services, values } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const serviceIcons = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  monitor: MonitorSmartphone,
};

const valueIcons = {
  target: Target,
  users: Users,
  sparkles: Sparkles,
  calendar: CalendarClock,
};

export function HomePage() {
  useDocumentTitle(homeContent.pageTitle);

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(115deg,var(--hero-from),var(--hero-to))]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--fg)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--fg)_5%,transparent)_1px,transparent_1px)] [background-size:38px_38px]"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:min-h-[500px] lg:grid-cols-[1fr_1.04fr] lg:gap-14 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-accent">{homeContent.heroEyebrow}</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.12] text-fg sm:text-5xl lg:text-[3.6rem]">
              {homeContent.heroTitle} <span className="text-accent">{homeContent.heroHighlight}</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base">{homeContent.heroDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/register-interest">{homeContent.heroPrimary}<ArrowRight size={16} aria-hidden="true" /></Button>
              <Button to="/services" variant="secondary">{homeContent.heroSecondary}</Button>
            </div>
          </div>
          <div className="relative pb-10 sm:pb-12">
            <img
              src="/images/hero-image.png"
              alt={homeContent.heroImageAlt}
              className="aspect-[1.42] w-full rounded-2xl border border-line object-cover shadow-2xl"
            />
            <div className="absolute bottom-0 right-0 max-w-[19rem] rounded-xl border border-line bg-surface p-4 shadow-xl sm:right-[-0.5rem]">
              <span className="inline-flex rounded-full bg-brand px-2.5 py-1 text-[10px] font-extrabold text-brand-fg">{bootcamp.badge}</span>
              <p className="mt-2 font-display text-sm font-bold text-fg">{bootcamp.title}</p>
              <p className="mt-1 text-xs text-muted">{bootcamp.descriptor}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={homeContent.servicesEyebrow} title={homeContent.servicesTitle} subtitle={homeContent.servicesSubtitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article key={service.title} className="overflow-hidden rounded-xl border border-line bg-surface">
                  <img src={service.image} alt={service.alt} className="aspect-[1.75] w-full object-cover" />
                  <div className="p-5">
                    <Icon className="mb-3 text-accent" size={20} aria-hidden="true" />
                    <h3 className="font-display text-base font-bold text-fg">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                    <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                      {homeContent.learnMore}<ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-bg-alt py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{bootcamp.eyebrow}</p>
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">{bootcamp.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{bootcamp.description}</p>
            <ul className="mt-5 space-y-3">
              {bootcamp.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm leading-6 text-fg">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{benefit}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/register-interest">{homeContent.registerInterest}</Button>
              <Button to="/training" variant="secondary">{bootcamp.detailsLink}</Button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              {bootcamp.details.map((detail) => (
                <div key={detail.label} className="rounded-xl border border-line bg-surface p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">{detail.label}</p>
                  <p className="mt-2 font-display text-sm font-bold text-fg">{detail.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-line bg-surface-2 p-5">
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">{bootcamp.howItWorks}</p>
              <ol className="grid gap-4 sm:grid-cols-2">
                {bootcamp.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-brand-fg">{index + 1}</span>
                    <span>
                      <span className="block text-sm font-bold text-fg">{step.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">{step.description}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={homeContent.expectationsEyebrow} title={homeContent.expectationsTitle} />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {[expectations.is, expectations.isNot].map((group, index) => (
              <article key={group.title} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                <h3 className="font-display text-base font-bold text-fg">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => {
                    const Icon = index === 0 ? CheckCircle2 : XCircle;
                    return (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                        <Icon size={16} className={`mt-0.5 shrink-0 ${index === 0 ? "text-ok" : "text-bad"}`} aria-hidden="true" />{item}
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow={homeContent.whyEyebrow} title={homeContent.whyTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = valueIcons[value.icon];
              return (
                <article key={value.title} className="rounded-xl border border-line bg-surface p-5">
                  <div className="mb-4 inline-flex rounded-lg bg-surface-2 p-2.5 text-accent"><Icon size={19} aria-hidden="true" /></div>
                  <h3 className="font-display text-sm font-bold text-fg">{value.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{value.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
