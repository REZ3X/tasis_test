import "./globals.css";

export const metadata = {
  title: "Tes Minat Divisi TASIS 2025/2026",
  description: "Tes minat divisi TASIS (Tata Tertib Siswa) periode 2025/2026 - Intel, Program/Media, Humas",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#0d1216",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Tes Minat Divisi TASIS 2025/2026",
    description: "Tes minat untuk menentukan divisi yang sesuai dengan minat dan kemampuan kamu di TASIS - Divisi Intel, Program/Media, dan Humas",
    siteName: "TASIS Division Test",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TASIS Logo - Tata Tertib Siswa",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tes Minat Divisi TASIS 2025/2026",
    description: "Tes minat untuk menentukan divisi yang sesuai dengan minat dan kemampuan kamu di TASIS",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0d1216" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'ui-sans-serif, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
