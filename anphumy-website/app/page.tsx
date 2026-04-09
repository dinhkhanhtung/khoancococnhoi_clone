import { Metadata } from 'next';
import { getSiteSettings, getServices, getProjects, getPosts } from '@/lib/sanity';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { NewsSection } from './components/NewsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { getLocalBusinessJsonLd } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  return {
    title: settings?.seoTitle || 'Thi Công Khoan Cọc Nhồi Toàn Quốc - An Phú Mỹ',
    description: settings?.seoDescription || 'CÔNG TY TNHH XD TM AN PHÚ MỸ - Khoan cọc nhồi nhà phố, thi công dự án với giá cả hợp lý. Đảm bảo làm đúng cam kết. Thi công đúng tiến độ.',
    keywords: settings?.keywords || ['khoan cọc nhồi', 'thi công nền móng', 'khoan cọc nhồi giá rẻ', 'An Phú Mỹ'],
    openGraph: {
      title: settings?.seoTitle || 'Thi Công Khoan Cọc Nhồi Toàn Quốc - An Phú Mỹ',
      description: settings?.seoDescription || 'CÔNG TY TNHH XD TM AN PHÚ MỸ - Khoan cọc nhồi nhà phố, thi công dự án',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const [settings, services, projects, posts] = await Promise.all([
    getSiteSettings(),
    getServices(6),
    getProjects(6),
    getPosts(4),
  ]);

  const localBusinessSchema = getLocalBusinessJsonLd({
    companyName: settings?.companyName || 'CÔNG TY TNHH AN PHÚ MỸ',
    address: settings?.address || '20/161S Phan Huy Ích – Phường 12 – Q.Gò Vấp – TP.HCM',
    phone: settings?.phone || '0903 961 168',
    email: settings?.email || 'nenmongapm@gmail.com',
    coordinates: settings?.coordinates,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <HeroSection settings={settings} />
      
      <WhyChooseUs />
      
      <ServicesSection services={services} />
      
      <ProjectsSection projects={projects} />
      
      <ContactSection settings={settings} />
      
      <NewsSection posts={posts} />
    </>
  );
}
