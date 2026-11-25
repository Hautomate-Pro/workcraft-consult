import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { PageHero } from "../components/PageHero";
import { commonContent, contactContent, formContent, siteContent } from "../content";
import { submitContact, type ContactPayload } from "../lib/api";
import { useDocumentTitle } from "../lib/useDocumentTitle";

type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactPage() {
  useDocumentTitle(formContent.contactPageTitle);
  const [values, setValues] = useState<ContactPayload>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate() {
    const next: ContactErrors = {};
    if (!values.name.trim()) next.name = formContent.required;
    if (!values.email.trim()) next.email = formContent.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = formContent.invalidEmail;
    if (!values.message.trim()) next.message = formContent.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage("");
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject?.trim() || undefined,
        message: values.message.trim(),
      });
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : commonContent.submitError);
    }
  }

  return (
    <>
      <PageHero eyebrow={contactContent.eyebrow} title={contactContent.title} description={contactContent.intro} />
      <section className="bg-bg py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-fg">{contactContent.detailsTitle}</h2>
            <ul className="mt-6 space-y-5">
              <li>
                <a href={`mailto:${siteContent.email}`} className="flex items-start gap-3 text-sm text-muted hover:text-accent">
                  <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span><span className="block font-semibold text-fg">{formContent.email}</span>{siteContent.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${siteContent.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 text-sm text-muted hover:text-accent">
                  <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span><span className="block font-semibold text-fg">{formContent.phone}</span>{siteContent.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span><span className="block font-semibold text-fg">{formContent.location}</span>{siteContent.location}</span>
              </li>
            </ul>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="contact-name"
                name="name"
                label={formContent.name}
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(event) => setValues({ ...values, name: event.target.value })}
              />
              <FormField
                id="contact-email"
                name="email"
                type="email"
                label={formContent.email}
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(event) => setValues({ ...values, email: event.target.value })}
              />
              <div className="sm:col-span-2">
                <FormField
                  id="contact-subject"
                  name="subject"
                  label={formContent.subject}
                  value={values.subject}
                  onChange={(event) => setValues({ ...values, subject: event.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <FormField
                  id="contact-message"
                  name="message"
                  label={formContent.message}
                  multiline
                  value={values.message}
                  error={errors.message}
                  onChange={(event) => setValues({ ...values, message: event.target.value })}
                />
              </div>
            </div>

            {status === "success" && <p role="status" className="mt-5 rounded-lg border border-ok/30 bg-surface-2 p-3 text-sm text-ok">{formContent.contactSuccess}</p>}
            {status === "error" && <p role="alert" className="mt-5 rounded-lg border border-bad/30 bg-surface-2 p-3 text-sm text-bad">{errorMessage}</p>}
            <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-fg transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60">
              {status === "sending" ? formContent.sending : formContent.sendMessage}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
