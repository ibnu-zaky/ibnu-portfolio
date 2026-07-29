import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ibnu Zaky — Portfolio",
  description: "Portfolio of Ibnu Zaky, Web Designer & Front End Developer from Depok, Indonesia. Building clean, functional, and beautiful web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="dark" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem("theme");
                if (!theme) {
                  theme = "dark";
                  localStorage.setItem("theme", theme);
                }
                document.documentElement.setAttribute("data-theme", theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ReactLenis root options={{ autoRaf: true, anchors: { offset: -80 } }}>
          <Nav />
          {children}
          <Footer />
        </ReactLenis>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
