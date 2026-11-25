import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { aboutContent, values } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle(aboutContent.pageTitle);
  return (
    <>
      <PageHero eyebrow={aboutContent.eyebrow} title={aboutContent.title} description={aboutContent.intro} />
      <section className="bg-bg py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-accent">{aboutContent.missionTitle}</p>
            <p className="font-display text-xl font-semibold leading-relaxed text-fg">{aboutContent.mission}</p>
          </article>
          <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-fg">{aboutContent.supportingTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{aboutContent.intro}</p>
            <Button to="/services" variant="secondary" className="mt-6">{aboutContent.servicesLink}</Button>
          </article>
        </Container>
      </section>
      <section className="bg-bg-alt py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={aboutContent.eyebrow} title={aboutContent.valuesTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="font-display text-base font-bold text-fg">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
