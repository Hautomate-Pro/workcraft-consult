import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { faqContent, faqItems } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function FAQPage() {
  useDocumentTitle(faqContent.pageTitle);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHero eyebrow={faqContent.eyebrow} title={faqContent.title} description={faqContent.intro} />
      <section className="bg-bg py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-answer-${index}`;
              return (
                <article key={item.question}>
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-display text-sm font-bold text-fg hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-6"
                    >
                      {item.question}
                      <ChevronDown size={18} className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  </h2>
                  {isOpen && <div id={panelId} className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6">{item.answer}</div>}
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
