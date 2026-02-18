import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unbound - Interactive PDF Learning Platform",
  description: "Transform Your Textbooks Into Interactive Learning Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
