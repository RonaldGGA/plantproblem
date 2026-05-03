import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: "PlantProblem | Houseplant Care & Troubleshooting",
    template: "%s | PlantProblem",
  },
  description:
    "Practical, no-fluff guides to diagnose and fix your houseplant problems. Yellow leaves, root rot, pests — we have the answer.",
  applicationName: "PlantProblem",
  authors: [{ name: "PlantProblem", url: process.env.NEXT_PUBLIC_BASE_URL! }],
  generator: "Next.js",
  keywords: [
    "houseplant care",
    "plant problems",
    "plant troubleshooting",
    "yellow leaves",
    "root rot",
    "indoor plants",
    "plant care guide",
  ],
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    languages: {
      "en-US": process.env.NEXT_PUBLIC_BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "PlantProblem",
    title: "PlantProblem | Houseplant Care & Troubleshooting",
    description:
      "Practical, no-fluff guides to diagnose and fix your houseplant problems.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PlantProblem | Houseplant Care & Troubleshooting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@plantproblem",
    creator: "@plantproblem",
    title: "PlantProblem | Houseplant Care & Troubleshooting",
    description:
      "Practical, no-fluff guides to diagnose and fix your houseplant problems.",
    images: ["/opengraph-image.png"],
  },
  verification: {
    google: "xXAVFFoSJ0DJ-pRzB3UhtoDBH611SzZOwixtUiYTDDE",
  },
  category: "lifestyle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head />
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "PlantProblem",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            description:
              "Practical, no-fluff guides to diagnose and fix your houseplant problems.",
            publisher: {
              "@type": "Organization",
              name: "PlantProblem",
              url: process.env.NEXT_PUBLIC_BASE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/blog?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
