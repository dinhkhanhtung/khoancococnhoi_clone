import type { Metadata } from 'next';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getSiteSettings } from '@/lib/sanity';
import { PhoneFloatButton } from './components/PhoneFloatButton';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khoancocnhoianphumy.vercel.app'),
    title: {
      default: settings?.seoTitle || settings?.title || 'Thi Công Khoan Cọc Nhồi Toàn Quốc - An Phú Mỹ',
      template: `%s | ${settings?.siteName || 'An Phú Mỹ'}`,
    },
    description: settings?.seoDescription || settings?.description || 'CÔNG TY TNHH XD TM AN PHÚ MỸ - Khoan cọc nhồi nhà phố, thi công dự án với giá cả hợp lý. Đảm bảo làm đúng cam kết.',
    keywords: settings?.keywords || ['khoan cọc nhồi', 'thi công nền móng', 'khoan cọc nhồi giá rẻ'],
    authors: [{ name: settings?.companyName || 'An Phú Mỹ' }],
    creator: settings?.companyName || 'An Phú Mỹ',
    publisher: settings?.companyName || 'An Phú Mỹ',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: settings?.siteName || settings?.companyName || 'An Phú Mỹ',
      title: settings?.seoTitle || settings?.title,
      description: settings?.seoDescription || settings?.description,
      images: settings?.ogImage ? [
        {
          url: settings.ogImage,
          width: 1200,
          height: 630,
          alt: settings?.siteName,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seoTitle || settings?.title,
      description: settings?.seoDescription || settings?.description,
      images: settings?.ogImage ? [settings.ogImage] : undefined,
    },
    verification: {
      google: 'mUbBHuDGLBZTzgw8zSnpWDh74JCOi_78rhTAdTzfpb0',
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL,
    },
    other: {
      'geo.region': 'VN',
      'geo.placename': 'Hồ Chí Minh',
      'geo.position': '10.823099;106.629664',
      ICBM: '10.823099, 106.629664',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header settings={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={settings} />
        <PhoneFloatButton settings={settings} />
      </body>
    </html>
  );
}
