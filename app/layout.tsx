import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/utils/providers/AppProviders";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/utils/context/authContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="infinity-saas-theme"
          attribute="class"
          enableSystem
          enableColorScheme
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
