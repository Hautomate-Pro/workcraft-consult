import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { commonContent, notFoundContent } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle(commonContent.notFoundPageTitle);
  return (
    <section className="bg-bg py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-accent">{notFoundContent.eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-fg sm:text-5xl">{notFoundContent.title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">{notFoundContent.intro}</p>
        <Button to="/" className="mt-7">{notFoundContent.home}</Button>
      </Container>
    </section>
  );
}
