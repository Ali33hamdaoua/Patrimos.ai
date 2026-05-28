import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact — réception du formulaire de demande de démo.
 *
 * Sécurité (règle absolue) :
 *   - `RESEND_API_KEY` n'est lue QUE depuis process.env, jamais hardcodée.
 *   - Aucune valeur sensible ne traverse la frontière serveur → client.
 *   - Validation systématique côté serveur, on ne fait pas confiance au
 *     payload du formulaire.
 *
 * Honeypot : si le champ caché `website` est rempli, on simule un succès
 * sans envoyer d'email — ça empêche les bots simples de spammer
 * contact@nobilisds.com sans leur indiquer qu'ils ont été détectés.
 */

const TO_EMAIL = "contact@nobilisds.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Patrimos.ai <onboarding@resend.dev>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROOMS = new Set(["", "<50", "50-150", "150-300", "300+"]);

type ContactPayload = {
  fullName: string;
  role: string;
  establishment: string;
  email: string;
  phone: string;
  rooms?: string;
  message?: string;
  website?: string;
};

function getString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function validatePayload(
  raw: unknown,
): { ok: true; payload: ContactPayload } | { ok: false; reason: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, reason: "invalid_payload" };
  }
  const record = raw as Record<string, unknown>;

  const fullName = getString(record, "fullName")?.trim() ?? "";
  const role = getString(record, "role")?.trim() ?? "";
  const establishment = getString(record, "establishment")?.trim() ?? "";
  const email = getString(record, "email")?.trim() ?? "";
  const phone = getString(record, "phone")?.trim() ?? "";
  const rooms = getString(record, "rooms")?.trim() ?? "";
  const message = getString(record, "message")?.trim() ?? "";
  const website = getString(record, "website") ?? "";

  if (!fullName || !role || !establishment || !email || !phone) {
    return { ok: false, reason: "missing_required" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, reason: "invalid_email" };
  }
  if (!ALLOWED_ROOMS.has(rooms)) {
    return { ok: false, reason: "invalid_rooms" };
  }

  return {
    ok: true,
    payload: { fullName, role, establishment, email, phone, rooms, message, website },
  };
}

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

function buildText(p: ContactPayload): string {
  return `Nouvelle demande de démo Patrimos.ai

Nom        : ${p.fullName}
Fonction   : ${p.role}
Établissement : ${p.establishment}
Email      : ${p.email}
Téléphone  : ${p.phone}
Chambres   : ${p.rooms || "non précisé"}

Message :
${p.message || "—"}`;
}

function buildHtml(p: ContactPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#606060">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;

  return `<div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#1a1a1a;max-width:640px">
  <h2 style="font-family:Georgia,serif;color:#8c6d3f;margin:0 0 20px">Nouvelle demande de démo</h2>
  <table style="border-collapse:collapse;font-size:14px">
    ${row("Nom", p.fullName)}
    ${row("Fonction", p.role)}
    ${row("Établissement", p.establishment)}
    ${row("Email", p.email)}
    ${row("Téléphone", p.phone)}
    ${row("Chambres", p.rooms || "non précisé")}
  </table>
  ${
    p.message
      ? `<h3 style="margin:24px 0 8px;color:#8c6d3f">Message</h3>
         <p style="white-space:pre-wrap;font-size:14px;line-height:1.5">${escapeHtml(p.message)}</p>`
      : ""
  }
</div>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Clé absente : on logge côté serveur mais on n'expose pas la cause au client.
    console.error("[api/contact] RESEND_API_KEY est manquante.");
    return NextResponse.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot : si rempli, on prétend un succès et on n'envoie rien.
  if (
    typeof raw === "object" &&
    raw !== null &&
    typeof (raw as Record<string, unknown>).website === "string" &&
    ((raw as Record<string, unknown>).website as string).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const result = validatePayload(raw);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.reason },
      { status: 400 },
    );
  }

  const { payload } = result;
  const resend = new Resend(apiKey);

  try {
    const sent = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: payload.email,
      subject: `[Patrimos.ai] Demande de démo — ${payload.establishment}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });

    if (sent.error) {
      console.error("[api/contact] Resend error:", sent.error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] send threw:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }
}
