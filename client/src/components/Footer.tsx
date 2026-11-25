import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { exploreLinks, services, siteContent } from "../content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-2.5">
              <img src="/brand/logo-mark.png" alt="" className="h-9 w-9 object-contain" />
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold text-fg">{siteContent.wordmark}</span>
                <span className="block text-[9px] font-semibold tracking-[0.24em] text-muted">{siteContent.descriptor}</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-muted">{siteContent.description}</p>
            <p className="mt-4 text-sm font-bold text-accent">{siteContent.tagline}</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold text-fg">{siteContent.footerServices}</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link to="/services" className="text-sm text-muted transition hover:text-accent">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold text-fg">{siteContent.footerExplore}</h2>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted transition hover:text-accent">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold text-fg">{siteContent.footerContact}</h2>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${siteContent.email}`} className="flex items-center gap-3 text-sm text-muted hover:text-accent">
                  <Mail size={16} className="shrink-0 text-accent" aria-hidden="true" />{siteContent.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteContent.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-muted hover:text-accent">
                  <Phone size={16} className="shrink-0 text-accent" aria-hidden="true" />{siteContent.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm leading-6 text-muted">
                <MapPin size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{siteContent.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-xs leading-6 text-muted">{siteContent.disclaimer}</p>
          <p className="mt-4 text-xs text-muted">{siteContent.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
