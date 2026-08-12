/**
 * Canonical list of CBAM-covered sectors this site publishes a dedicated
 * landing page for. `id` is the stable key used in messages/*.json; `slug`
 * is the URL segment for /cbam/{slug}, kept identical across locales.
 *
 * Why identical across locales: next-intl's `routing.pathnames` translates
 * only the *static* parts of a path. For a dynamic segment like [sector],
 * the middleware rewrites an incoming request to the internal pathnames
 * *key* — so if the tr/en slug values differed, the page would always see
 * the key's (tr) slug regardless of which locale's URL was requested,
 * breaking lookups on the en URL. Using one slug for both locales sidesteps
 * that entirely.
 */
export const sectorIds = [
  "iron-steel",
  "cement",
  "aluminium",
  "fertilizers",
  "electricity",
  "hydrogen",
] as const;

export type SectorId = (typeof sectorIds)[number];

export const sectors: Record<SectorId, { slug: string }> = {
  "iron-steel": { slug: "demir-celik" },
  cement: { slug: "cimento" },
  aluminium: { slug: "aluminyum" },
  fertilizers: { slug: "gubre" },
  electricity: { slug: "elektrik" },
  hydrogen: { slug: "hidrojen" },
};

export function getSectorIdBySlug(slug: string): SectorId | undefined {
  return sectorIds.find((id) => sectors[id].slug === slug);
}

/** The routing.pathnames key for a sector. */
export function getSectorPathnameKey(id: SectorId) {
  return `/cbam/${sectors[id].slug}` as const;
}
