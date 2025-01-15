import "~/styles/globals.css";
import Navbar from "../components/navbar";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Next LLM CTF",
  description: "CyberUCI LLM Attack/Defense CTF",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center px-6">{children}</main>
          <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="max-w-7xl mx-auto text-center text-sm">
              &copy; {new Date().getFullYear()} Next-LLM-CTF. All Rights Reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
