import { ArrowRight } from "lucide-react";
import { commonContent, homeContent } from "../content";
import { Button } from "./Button";
import { Container } from "./Container";

export function CTASection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(115deg,var(--hero-from),var(--hero-to))] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--brand)_16%,transparent),transparent_58%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">{homeContent.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{homeContent.ctaDescription}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/register-interest">{commonContent.registerInterest} <ArrowRight size={16} aria-hidden="true" /></Button>
              <Button to="/contact" variant="secondary">{commonContent.talkToUs}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
