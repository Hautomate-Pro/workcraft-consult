import { CheckCircle2 } from "lucide-react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { CTASection } from "../components/CTASection";
import { ExpectationCards } from "../components/ExpectationCards";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { bootcamp, expectations, trainingPageContent } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function TrainingPage() {
  useDocumentTitle(trainingPageContent.pageTitle);
  return (
    <>
      <PageHero eyebrow={trainingPageContent.eyebrow} title={trainingPageContent.title} description={trainingPageContent.intro} />

      <section className="bg-bg py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-fg">{bootcamp.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{bootcamp.description}</p>
            <h3 className="mt-8 font-display text-lg font-bold text-fg">{trainingPageContent.audienceTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{trainingPageContent.audience}</p>
            <h3 className="mt-8 font-display text-lg font-bold text-fg">{trainingPageContent.outputsTitle}</h3>
            <ul className="mt-4 space-y-3">
              {bootcamp.outputs.map((output) => (
                <li key={output} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{output}
                </li>
              ))}
            </ul>
            <div className="mt-7"><Button to="/register-interest">{trainingPageContent.registerInterest}</Button></div>
          </div>
          <aside className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-fg">{trainingPageContent.formatTitle}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {bootcamp.details.map((item) => (
                <div key={item.label} className="rounded-lg border border-line bg-bg-alt p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-fg">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">{trainingPageContent.scheduleNote}</p>
          </aside>
        </Container>
      </section>

      <section className="bg-bg-alt py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={trainingPageContent.eyebrow} title={trainingPageContent.outlineTitle} />
          <ol className="mx-auto max-w-3xl">
            {bootcamp.schedule.map((item, index) => (
              <li key={item.title} className="relative flex gap-5 pb-8 last:pb-0">
                {index < bootcamp.schedule.length - 1 && <span aria-hidden="true" className="absolute left-[13px] top-8 h-full w-px bg-line" />}
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-brand-fg">
                  {index === 0 ? "•" : index}
                </span>
                <div className="rounded-xl border border-line bg-surface p-4 sm:flex-1">
                  <h3 className="font-display text-sm font-bold text-fg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-bg py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={trainingPageContent.expectationsEyebrow} title={trainingPageContent.expectationsTitle} />
          <ExpectationCards />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
