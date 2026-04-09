export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khoancocnhoianphumy.vercel.app';

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin/studio
Disallow: /studio
Disallow: /admin
Disallow: /api/

# Block specific bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
