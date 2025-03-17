import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Home from "./page";
import Ring3 from "@/components/RingScene";

const goFraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const goMontserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tecí Semijoias",
  description: "Venha descobrir sua marca de semijoias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${goFraunces.variable} ${goMontserrat.variable} antialiased bg-background`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
