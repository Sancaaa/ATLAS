import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "TalkHub - Ideas Worth Sharing",
  description:
    "A curated collection of inspiring talks from thought leaders, innovators, and changemakers.",
  keywords: ["talks", "ideas", "inspiration", "education", "innovation"],
  openGraph: {
    title: "TalkHub - Ideas Worth Sharing",
    description:
      "A curated collection of inspiring talks from thought leaders, innovators, and changemakers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-200 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} TalkHub. Built for TEDxUdayana
              University Portfolio.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
