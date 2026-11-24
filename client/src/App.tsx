import { useEffect, useState } from "react";

export default function App() {
  const [api, setApi] = useState("checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setApi(d.status))
      .catch(() => setApi("unreachable"));
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("workcraft-theme", next);
    } catch {}
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6">
      <img src="/brand/logo-mark.png" alt="Workcraft logo" className="h-12 w-12" />
      <h1 className="text-5xl font-bold">
        Skills that turn into <span className="text-brand">real results</span>.
      </h1>
      <p className="text-muted">Setup check: API status is <b className="text-fg">{api}</b>.</p>
      <img src="/images/hero-image.png" alt="" className="w-full rounded-2xl border border-line" />
      <button
        onClick={toggleTheme}
        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-fg"
      >
        Toggle theme
      </button>
    </main>
  );
}