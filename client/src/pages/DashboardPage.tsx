import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { useAuth } from "../lib/auth";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function DashboardPage() {
  useDocumentTitle("Dashboard");
  const { user } = useAuth();
  if (!user) return null;

  const firstName = user.fullName.trim().split(/\s+/)[0] || user.fullName;

  return (
    <>
      <PageHero
        eyebrow="Learner dashboard"
        title={`Welcome, ${firstName}`}
        description="Your sessions, resources and project assignment will appear here once your cohort starts."
      />
      <section className="bg-bg py-14 sm:py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-fg">Your account</h2>
            <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Name</dt>
                <dd className="mt-1 font-semibold text-fg">{user.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Email</dt>
                <dd className="mt-1 break-all font-semibold text-fg">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Account type</dt>
                <dd className="mt-1 font-semibold text-fg">{user.role === "admin" ? "Administrator" : "Learner"}</dd>
              </div>
            </dl>
            {user.role === "admin" && (
              <div className="mt-6">
                <Button to="/admin">Open admin</Button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
