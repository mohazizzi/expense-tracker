import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "./components/Providers";

const fontHoda = localFont({
  src: "../public/fonts/HodaTorabikhah/HodaTorabikhah.ttf",
  variable: "--font-hoda",
});
const fontIranSansMed = localFont({
  src: "../public/fonts/iran-sans/IRANSans-Medium-web.woff2",
  variable: "--font-sans-med",
});
const fontIranSansLight = localFont({
  src: "../public/fonts/iran-sans/IRANSans-Light-web.woff2",
  variable: "--font-sans-light",
});

export const metadata: Metadata = {
  title: "مدیریت مالی",
  description: "وبسایت فول استک با nextjs و mongoDB",
  manifest: "/manifest.json",
  icons: { apple: "/icon-512x512.png" },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`bg-main-bg text-white ${fontHoda.variable} ${fontIranSansLight.variable} ${fontIranSansMed.variable}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
