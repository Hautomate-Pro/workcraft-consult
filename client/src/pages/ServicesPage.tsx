import { ArrowRight, Briefcase, GraduationCap, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { servicePageContent, services } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const icons = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  monitor: MonitorSmartphone,
};

export function ServicesPage() {
  useDocumentTitle(servicePageContent.pageTitle);
  return (
    <>
      <PageHero eyebrow={servicePageContent.eyebrow} title={servicePageContent.title} description={servicePageContent.intro} />
      <section className="bg-bg py-14 sm:py-20">
        <Container className="space-y-6">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const reverse = index % 2 === 1;
            return (
              <article key={service.title} className={`grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-2 ${reverse ? "md:[&>img]:order-2" : ""}`}>
                <img src={service.image} alt={service.alt} className="h-full min-h-64 w-full object-cover" />
                <div className="flex flex-col justify-center p-6 sm:p-9">
                  <Icon size={24} className="mb-4 text-accent" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-bold text-fg">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
                  <h3 className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{servicePageContent.typicalActivities}</h3>
                  <ul className="mt-3 space-y-2">
                    {service.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2 text-sm leading-6 text-muted">
                        <ArrowRight size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{activity}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                    {servicePageContent.contactLink} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <CTASection />
    </>
  );
}
