"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 12 — Demande de démo. Formulaire contrôlé, validation client +
 * serveur, POST JSON vers /api/contact. id="contact" : cible de tous les
 * boutons "Demander une démo" du site.
 *
 * La clé API Resend n'est JAMAIS lue ici — ce composant est client (use
 * client), il ne fait que poster un JSON. La clé vit dans process.env
 * côté route serveur uniquement.
 */

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  fullName: string;
  role: string;
  establishment: string;
  email: string;
  phone: string;
  rooms: string;
  message: string;
  /** Honeypot — laissé vide par un humain, rempli par les bots simples. */
  website: string;
};

const EMPTY_FORM: FormState = {
  fullName: "",
  role: "",
  establishment: "",
  email: "",
  phone: "",
  rooms: "",
  message: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "block w-full rounded-md border border-[#C9A55C]/20 bg-surface px-3.5 py-2.5 text-sm text-ink-primary placeholder:text-ink-tertiary transition-colors focus:border-gold focus:outline-none";

export function Contact({
  contact: dict,
}: {
  contact: Dictionary["contact"];
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [clientError, setClientError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateClient(): string | null {
    if (
      !form.fullName.trim() ||
      !form.role.trim() ||
      !form.establishment.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      return dict.form.requiredField;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      return dict.form.invalidEmail;
    }
    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);

    const error = validateClient();
    if (error) {
      setClientError(error);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok?: boolean } = await response
        .json()
        .catch(() => ({ ok: false }));

      if (response.ok && data.ok) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <Section
      id="contact"
      variant="base"
      padding="default"
      ariaLabel="Demander une démo"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Colonne gauche — texte. */}
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                {dict.overline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-xl font-serif text-3xl leading-[1.2] text-ink-primary md:text-4xl lg:text-5xl">
                {dict.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-secondary">
                {dict.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-8 space-y-3">
                {dict.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-ink-primary"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 space-y-1.5 border-t border-line pt-6 text-xs text-ink-tertiary">
                <p>{dict.coordinates.company}</p>
                <p>
                  <a
                    href={`mailto:${dict.coordinates.email}`}
                    className="transition-colors hover:text-gold"
                  >
                    {dict.coordinates.email}
                  </a>
                </p>
                <p>{dict.coordinates.location}</p>
              </div>
            </Reveal>
          </div>

          {/* Colonne droite — carte formulaire. */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[#C9A55C]/25 bg-[#141414] p-6 shadow-2xl shadow-black/40 md:p-8">
              {status === "success" ? (
                <SuccessPanel message={dict.form.success} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  {/* Honeypot — hors-écran, hors-tab, invisible des humains. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                      />
                    </label>
                  </div>

                  <Field label={dict.form.nameLabel} required>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label={dict.form.roleLabel} required>
                    <input
                      type="text"
                      required
                      autoComplete="organization-title"
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label={dict.form.establishmentLabel} required>
                    <input
                      type="text"
                      required
                      autoComplete="organization"
                      value={form.establishment}
                      onChange={(e) => update("establishment", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label={dict.form.emailLabel} required>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={dict.form.phoneLabel} required>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label={dict.form.roomsLabel}>
                    <select
                      value={form.rooms}
                      onChange={(e) => update("rooms", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{dict.form.roomsPlaceholder}</option>
                      {dict.form.roomsOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={dict.form.messageLabel}>
                    <textarea
                      rows={4}
                      placeholder={dict.form.messagePlaceholder}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={cn(inputClass, "resize-none")}
                    />
                  </Field>

                  {(clientError || status === "error") && (
                    <p role="alert" className="text-sm text-ink-secondary">
                      {clientError ?? dict.form.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? dict.form.submitting : dict.form.submit}
                  </button>

                  <p className="mt-3 text-[11px] leading-relaxed text-ink-tertiary">
                    {dict.form.consent}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-ink-secondary">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function SuccessPanel({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-surface">
        <Check
          className="h-6 w-6 text-gold"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-primary">
        {message}
      </p>
    </div>
  );
}
