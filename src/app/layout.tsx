import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://app.lynk.lat'), // Base para resolver imágenes
  title: {
    default: "Lynk | Acortador de URLs Profesional y Rápido",
    template: "%s | Lynk.lat"
  },
  description: "Acorta tus enlaces largos, personalízalos y mide tu impacto con estadísticas en tiempo real. La herramienta definitiva para marketers y creadores.",
  keywords: ["acortador url", "url shortener", "link shortener", "estadísticas", "analytics", "marketing", "gratis", "sin registro"],
  authors: [{ name: "Jean Chavez", url: "https://jeanchavez.dev" }],
  creator: "Jean Chavez",
  
  // Open Graph (Cómo se ve en Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://app.lynk.lat",
    title: "Lynk - Acorta. Comparte. Mide.",
    description: "Transforma enlaces largos en URLs cortas y poderosas. Rastrea clicks, países y dispositivos totalmente gratis.",
    siteName: "Lynk.lat",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Lynk.lat Dashboard Preview",
      },
    ],
  },

  // Twitter Card (Cómo se ve en X)
  twitter: {
    card: "summary_large_image",
    title: "Lynk | El Acortador de URLs que sí funciona",
    description: "Estadísticas detalladas y redirección ultra rápida. Prueba Lynk ahora.",
    images: ["/og-image.png"], // Misma imagen
    creator: "@Jean612", // Tu usuario si tienes
  },

  // // Iconos
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png", // Opcional si la creas
  // },
  
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}