import { CheckCircle2, XCircle } from "lucide-react";
import { expectations } from "../content";

export function ExpectationCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
      {[expectations.is, expectations.isNot].map((group, index) => (
        <article key={group.title} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h3 className="font-display text-base font-bold text-fg">{group.title}</h3>
          <ul className="mt-4 space-y-3">
            {group.items.map((item) => {
              const Icon = index === 0 ? CheckCircle2 : XCircle;
              return (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                  <Icon size={16} className={`mt-0.5 shrink-0 ${index === 0 ? "text-ok" : "text-bad"}`} aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
