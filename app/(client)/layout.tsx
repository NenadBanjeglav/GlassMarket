import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const poppins = localFont({
  src: "../font/Poppins.woff2",
  variable: "--font-poppins",
  weight: "300",
  preload: false,
});

export const metadata: Metadata = {
  title: "Glass Market - Online prodavnica staklene ambalaže | Novi Sad",
  description:
    "Glass Market je deo firme LIKA PROMET DOO iz Novog Sada. Uvoz i prodaja staklene ambalaže: boce, tegle, čepovi, poklopci i PVC kapice za pakovanje i zatvaranje ambalaže.",
  keywords: [
    "staklena ambalaža",
    "boce",
    "tegle",
    "čepovi",
    "poklopci",
    "PVC kapice",
    "uvoz staklene ambalaže",
    "prodaja staklene ambalaže",
    "Glass Market",
    "LIKA PROMET DOO",
    "Novi Sad",
  ],
  openGraph: {
    title: "Glass Market - Online prodavnica staklene ambalaže",
    description:
      "Širok asortiman staklenih boca, tegli, čepova i poklopaca. Posetite Glass Market i pronađite idealnu ambalažu za vaše potrebe.",
    url: "https://glassmarket.rs",
    type: "website",
    locale: "sr_RS",
    images: [
      {
        url: "https://glassmarket.rs/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Glass Market - Online prodavnica staklene ambalaže",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass Market - Online prodavnica staklene ambalaže",
    description:
      "Uvoz i prodaja staklene ambalaže: boce, tegle, čepovi, poklopci i PVC kapice. Posetite Glass Market iz Novog Sada.",
    images: ["https://glassmarket.rs/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="sr-Latn">
        <body className={`${poppins.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
