import type { Dict } from "./i18n";
import { siteUrl } from "./site-url";

/** Структурированные данные schema.org (JSON-LD) для главной страницы */
export function buildJsonLd({ lang, site, t }: Dict) {
  const { company, faq, packages, reviews, seo, stats } = site;
  const s = t.schema;
  const { description } = seo;
  const home = `${siteUrl}/${lang}/`;
  const business = `${siteUrl}/#business`;
  const website = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": website,
        url: `${siteUrl}/`,
        name: "Domus",
        inLanguage: s.inLanguage,
        publisher: { "@id": business },
      },
      {
        "@type": "WebPage",
        "@id": `${home}#webpage`,
        url: home,
        name: s.pageName,
        description,
        inLanguage: s.inLanguage,
        isPartOf: { "@id": website },
        about: { "@id": business },
        primaryImageOfPage: `${siteUrl}/opengraph-image`,
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": business,
        name: "Domus",
        description,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/icon.svg`,
        image: `${siteUrl}/opengraph-image`,
        telephone: company.phone,
        email: company.email,
        foundingDate: "2018",
        priceRange: s.priceRange,
        currenciesAccepted: "UAH",
        paymentAccepted: s.payment,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: s.city,
          postalCode: "03150",
          addressCountry: "UA",
        },
        geo: { "@type": "GeoCoordinates", latitude: 50.4325, longitude: 30.516 },
        hasMap: company.mapsUrl,
        areaServed: { "@type": "City", name: s.city },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
        sameAs: Object.values(company.socials),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(stats.rating),
          reviewCount: String(stats.reviews),
          bestRating: "5",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewBody: r.text,
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: s.catalog,
          itemListElement: packages.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.service(p.name),
              description: s.serviceText(p.tagline, p.term, p.includes.join(", ")),
              areaServed: s.city,
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.price,
              priceCurrency: "UAH",
              unitText: s.unit,
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MTK" },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
