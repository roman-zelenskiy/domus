import { company, faq, packages, reviews, seo, stats } from "@/content/site";
import { siteUrl } from "./site-url";

/** Структурированные данные schema.org (JSON-LD) для главной страницы */
export function buildJsonLd() {
  const { description } = seo;
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
        inLanguage: "uk-UA",
        publisher: { "@id": business },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: "Ремонт квартир під ключ у Києві",
        description,
        inLanguage: "uk-UA",
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
        priceRange: "від 3 200 ₴/м²",
        currenciesAccepted: "UAH",
        paymentAccepted: "Готівка, банківський переказ",
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: "Київ",
          postalCode: "03150",
          addressCountry: "UA",
        },
        geo: { "@type": "GeoCoordinates", latitude: 50.4325, longitude: 30.516 },
        hasMap: company.mapsUrl,
        areaServed: { "@type": "City", name: "Київ" },
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
          name: "Ремонт квартир під ключ",
          itemListElement: packages.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${p.name} ремонт квартири`,
              description: `${p.tagline}. Термін: ${p.term}. Входить: ${p.includes.join(", ")}.`,
              areaServed: "Київ",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.price,
              priceCurrency: "UAH",
              unitText: "м²",
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
