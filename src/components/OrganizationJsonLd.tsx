import { siteUrl } from "@/lib/seo";

export default function OrganizationJsonLd({
  locale,
  name,
  description,
}: {
  locale: string;
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    alternateName: "Business to Zero Carbon",
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/logo-mark.png`,
    image: `${siteUrl}/logo-mark.png`,
    description,
    email: "info@b2zpartners.com",
    telephone: "+90-537-866-89-54",
    areaServed: "EU",
    knowsAbout: [
      "CBAM",
      "Carbon Border Adjustment Mechanism",
      "Embedded emissions calculation",
      "Sustainability strategy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@b2zpartners.com",
      telephone: "+90-537-866-89-54",
      availableLanguage: ["Turkish", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
