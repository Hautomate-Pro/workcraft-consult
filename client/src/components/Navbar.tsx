import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks, siteContent } from "../content";
import { useAuth } from "../lib/auth";
import { Button } from "./Button";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const areaPath = user?.role === "admin" ? "/admin" : "/dashboard";
  const areaLabel = user?.role === "admin" ? "Admin" : "Dashboard";

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    navigate("/");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-2 py-2 text-sm font-semibold transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${isActive ? "text-accent" : "text-muted"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-xl">
      <Container className="flex min-h-[72px] items-center justify-between gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <img src="/brand/logo-mark.png" alt="" className="h-9 w-9 object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-fg">{siteContent.wordmark}</span>
            <span className="block text-[9px] font-semibold tracking-[0.24em] text-muted">{siteContent.descriptor}</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Link to={areaPath} className="px-2 text-sm font-semibold text-muted transition hover:text-accent">
                {areaLabel}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-2 text-sm font-semibold text-muted transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/learner-portal" className="px-2 text-sm font-semibold text-muted transition hover:text-accent">
              Learner portal
            </Link>
          )}
          <Button to="/register-interest" className="min-h-10 px-3 py-2 text-xs">
            Register interest
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-fg hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-line bg-bg px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold ${isActive ? "bg-surface text-accent" : "text-fg hover:bg-surface"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to={areaPath} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-fg hover:bg-surface">
                  {areaLabel}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-fg hover:bg-surface"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/learner-portal" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-fg hover:bg-surface">
                Learner portal
              </Link>
            )}
            <Button to="/register-interest" onClick={() => setMenuOpen(false)} className="mt-2">
              Register interest
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
