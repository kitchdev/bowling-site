import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import ThemeRegistry from "@/app/[lang]/components/ThemeRegistry/ThemeRegistry";
import AppBar from "@/app/[lang]/components/AppBar";
import { Box } from "@mui/material";
import { getDictionary } from "@/get-dictionaries";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Valois Bowling";
const description = "";
export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await getServerSession();
  const dictionary = getDictionary(params.lang);
  return (
    <ThemeRegistry>
      <html lang={params.lang}>
        <body className={inter.variable}>
          <AppBar lang={params.lang} session={session} />
          <Toaster />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            {children}
          </Box>
        </body>
      </html>
    </ThemeRegistry>
  );
}
