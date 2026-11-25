import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseFieldProps = { label: string; error?: string; id: string };
type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaFieldProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-3.5 py-3 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

export function FormField(props: InputFieldProps | TextareaFieldProps) {
  const { label, error, id, multiline, ...fieldProps } = props;
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-fg">{label}</label>
      {multiline ? (
        <textarea
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${fieldClass} min-h-32 resize-y`}
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={fieldClass}
        />
      )}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-bad">{error}</p>}
    </div>
  );
}
