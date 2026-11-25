import { useState, type FormEvent } from "react";
import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { PageHero } from "../components/PageHero";
import { commonContent, formContent, interestContent } from "../content";
import { submitInterest, type InterestPayload } from "../lib/api";
import { useDocumentTitle } from "../lib/useDocumentTitle";

type InterestErrors = Partial<Record<"fullName" | "email" | "consent", string>>;

const initialValues: InterestPayload = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  currentRole: "",
  note: "",
  consent: false,
  programme: "pmp-bootcamp",
};

export function RegisterInterestPage() {
  useDocumentTitle(formContent.interestPageTitle);
  const [values, setValues] = useState<InterestPayload>(initialValues);
  const [errors, setErrors] = useState<InterestErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate() {
    const next: InterestErrors = {};
    if (!values.fullName.trim()) next.fullName = formContent.required;
    if (!values.email.trim()) next.email = formContent.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = formContent.invalidEmail;
    if (!values.consent) next.consent = formContent.consentRequired;
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
      await submitInterest({
        ...values,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || undefined,
        location: values.location?.trim() || undefined,
        currentRole: values.currentRole?.trim() || undefined,
        note: values.note?.trim() || undefined,
      });
      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : commonContent.submitError);
    }
  }

  return (
    <>
      <PageHero eyebrow={interestContent.eyebrow} title={interestContent.title} description={interestContent.intro} />
      <section className="bg-bg py-14 sm:py-20">
        <Container className="max-w-3xl">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="interest-full-name"
                name="fullName"
                label={formContent.fullName}
                autoComplete="name"
                required
                value={values.fullName}
                error={errors.fullName}
                onChange={(event) => setValues({ ...values, fullName: event.target.value })}
              />
              <FormField
                id="interest-email"
                name="email"
                type="email"
                label={formContent.email}
                autoComplete="email"
                required
                value={values.email}
                error={errors.email}
                onChange={(event) => setValues({ ...values, email: event.target.value })}
              />
              <FormField
                id="interest-phone"
                name="phone"
                type="tel"
                label={formContent.phone}
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => setValues({ ...values, phone: event.target.value })}
              />
              <FormField
                id="interest-location"
                name="location"
                label={formContent.location}
                autoComplete="address-level2"
                value={values.location}
                onChange={(event) => setValues({ ...values, location: event.target.value })}
              />
              <FormField
                id="interest-current-role"
                name="currentRole"
                label={formContent.currentRole}
                autoComplete="organization-title"
                value={values.currentRole}
                onChange={(event) => setValues({ ...values, currentRole: event.target.value })}
              />
              <div className="sm:col-span-2">
                <FormField
                  id="interest-note"
                  name="note"
                  label={formContent.note}
                  multiline
                  value={values.note}
                  onChange={(event) => setValues({ ...values, note: event.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-start gap-3">
                  <input
                    id="interest-consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "interest-consent-error" : undefined}
                    onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-line accent-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  />
                  <label htmlFor="interest-consent" className="text-sm leading-6 text-fg">{formContent.consent}</label>
                </div>
                {errors.consent && <p id="interest-consent-error" className="mt-1.5 text-xs text-bad">{errors.consent}</p>}
              </div>
            </div>

            {status === "success" && <p role="status" className="mt-5 rounded-lg border border-ok/30 bg-surface-2 p-3 text-sm text-ok">{formContent.interestSuccess}</p>}
            {status === "error" && <p role="alert" className="mt-5 rounded-lg border border-bad/30 bg-surface-2 p-3 text-sm text-bad">{errorMessage}</p>}
            <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-fg transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60">
              {status === "sending" ? formContent.sending : formContent.submitInterest}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
