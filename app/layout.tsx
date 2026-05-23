import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construred MVP",
  description: "Sistema de gestión de materiales de construcción - Construred",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="h-full">
      <body className="bg-gray-50 text-slate-900 antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
