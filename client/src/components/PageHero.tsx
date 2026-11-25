import { Container } from "./Container";

type PageHeroProps = { eyebrow: string; title: string; description?: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(115deg,var(--hero-from),var(--hero-to))] py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-fg sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{description}</p>}
        </div>
      </Container>
    </section>
  );
}
