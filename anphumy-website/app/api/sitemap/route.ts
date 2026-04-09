import { getServices, getPosts, getProjects, getLocations } from '@/lib/sanity';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khoancocnhoianphumy.vercel.app';

  // Fetch all dynamic content
  const [services, posts, projects, locations] = await Promise.all([
    getServices(),
    getPosts(),
    getProjects(),
    getLocations(),
  ]);

  // Static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/gioi-thieu', changefreq: 'weekly', priority: 0.8 },
    { url: '/gioi-thieu-chung', changefreq: 'weekly', priority: 0.8 },
    { url: '/khoan-coc-nhoi', changefreq: 'daily', priority: 0.9 },
    { url: '/cong-trinh', changefreq: 'daily', priority: 0.8 },
    { url: '/cong-trinh/dang-thuc-hien', changefreq: 'daily', priority: 0.7 },
    { url: '/cong-trinh/da-hoan-thanh', changefreq: 'weekly', priority: 0.7 },
    { url: '/bao-gia', changefreq: 'weekly', priority: 0.8 },
    { url: '/video', changefreq: 'weekly', priority: 0.6 },
    { url: '/tin-tuc', changefreq: 'daily', priority: 0.8 },
    { url: '/lien-he', changefreq: 'monthly', priority: 0.7 },
    { url: '/ho-so-nang-luc', changefreq: 'monthly', priority: 0.6 },
  ];

  // Generate sitemap XML
  const generateUrlEntry = (route: { url: string; changefreq: string; priority: number; lastmod?: string }) => `
    <url>
      <loc>${baseUrl}${route.url}</loc>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
      ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
    </url>
  `;

  // Dynamic routes
  const serviceRoutes = services.map((service: { slug: { current: string } }) => ({
    url: `/khoan-coc-nhoi/${service.slug.current}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const postRoutes = posts.map((post: { slug: { current: string }; publishedAt: string }) => ({
    url: `/tin-tuc/${post.slug.current}`,
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: post.publishedAt,
  }));

  const projectRoutes = projects.map((project: { slug: { current: string } }) => ({
    url: `/cong-trinh/${project.slug.current}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const locationRoutes = locations.map((location: { slug: { current: string } }) => ({
    url: `/khoan-coc-nhoi-tai-${location.slug.current}`,
    changefreq: 'weekly',
    priority: 0.6,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...postRoutes,
    ...projectRoutes,
    ...locationRoutes,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(generateUrlEntry).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
