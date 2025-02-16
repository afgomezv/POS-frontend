import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Punto de Venta",
  description: "Sistema de punto de venta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.className} bg-gray-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
