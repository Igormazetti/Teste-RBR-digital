import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500"] });

export const metadata: Metadata = {
  title: "RBR Digital",
  description: "Teste da RBR Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} style={{ backgroundColor: "#e9e9e9" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
