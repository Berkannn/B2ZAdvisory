import { notFound } from "next/navigation";

// Catches any unmatched path under a valid locale (e.g. /tr/unknown-page)
// so that the localized `not-found.tsx` in this segment is rendered instead
// of falling back to the unlocalized root not-found page.
export default function CatchAll() {
  notFound();
}
