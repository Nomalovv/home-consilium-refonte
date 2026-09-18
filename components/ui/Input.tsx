"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const champBase =
  "w-full cible-tactile rounded-md border-2 bg-white/85 dark:bg-white/[0.06] " +
  "px-4 py-3 text-[16px] text-ink placeholder:text-ink-muted/70 " +
  "border-terre-200 dark:border-white/20 " +
  "transition-colors duration-200 focus:border-terre-600 focus:bg-white dark:focus:bg-white/[0.1]";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  obligatoire?: boolean;
};

export function Label({ htmlFor, children, obligatoire }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[14px] font-semibold text-ardoise-900 dark:text-ardoise-100"
    >
      {children}
      {obligatoire && (
        <span className="ml-1 text-terre-700 dark:text-terre-300" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function Erreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] font-medium text-etat-erreur">
      {message}
    </p>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(champBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(champBase, "min-h-[120px] resize-y", className)} {...props} />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(champBase, className)} {...props}>
      {children}
    </select>
  );
}
