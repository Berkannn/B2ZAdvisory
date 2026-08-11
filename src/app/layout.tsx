// Pure pass-through root layout. The <html>/<body> tags are provided by
// `src/app/[locale]/layout.tsx` for localized routes, and by
// `src/app/not-found.tsx` for the top-level 404 fallback.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
