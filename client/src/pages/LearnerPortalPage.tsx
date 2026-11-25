import { useState, type FormEvent } from "react";
import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { PageHero } from "../components/PageHero";
import { formContent, portalContent } from "../content";
import { signIn } from "../lib/api";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function LearnerPortalPage() {
  useDocumentTitle(formContent.portalPageTitle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = formContent.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = formContent.invalidEmail;
    if (!password) next.password = formContent.required;
    setErrors(next);
    setErrorMessage("");
    setStatus("idle");
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      await signIn({ email: email.trim(), password });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : portalContent.loginError);
    }
  }

  return (
    <>
      <PageHero eyebrow={portalContent.eyebrow} title={portalContent.title} description={portalContent.intro} />
      <section className="bg-bg py-14 sm:py-20">
        <Container className="max-w-lg">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="space-y-5">
              <FormField
                id="portal-email"
                name="email"
                type="email"
                label={formContent.email}
                autoComplete="username"
                required
                value={email}
                error={errors.email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormField
                id="portal-password"
                name="password"
                type="password"
                label={formContent.password}
                autoComplete="current-password"
                required
                value={password}
                error={errors.password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {status === "success" && <p role="status" className="mt-5 rounded-lg border border-ok/30 bg-surface-2 p-3 text-sm text-ok">{portalContent.intro}</p>}
            {status === "error" && <p role="alert" className="mt-5 rounded-lg border border-bad/30 bg-surface-2 p-3 text-sm text-bad">{errorMessage}</p>}
            <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-fg transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60">
              {status === "sending" ? formContent.sending : formContent.signIn}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
