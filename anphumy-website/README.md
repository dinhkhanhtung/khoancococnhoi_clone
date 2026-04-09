# An Phú Mỹ Website - Next.js + Sanity CMS

A modern, SEO-optimized, dynamic website for An Phú Mỹ (a foundation drilling company) built with Next.js App Router, Tailwind CSS, and Sanity CMS.

## Features

- **Next.js 14** with App Router for optimal performance
- **Sanity CMS** for easy content management
- **Tailwind CSS** for responsive, modern styling
- **SEO Optimized** with JSON-LD, meta tags, sitemap, robots.txt
- **Contact Form** with Resend email integration
- **Vercel Edge Functions** compatible deployment

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Sanity account (free at [sanity.io](https://sanity.io))
- A Resend account (free at [resend.com](https://resend.com)) - optional for email

### 1. Clone and Install

```bash
cd anphumy-website
npm install
```

### 2. Set up Sanity CMS

1. Create a new project at [sanity.io/manage](https://sanity.io/manage)
2. Get your Project ID from the dashboard
3. Create a read + write API token

### 3. Environment Variables

Create `.env.local` file:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token

# Resend Email (optional)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=nenmongapm@gmail.com

# Site Config
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠI DỊCH VỤ AN PHÚ MỸ
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin Dashboard: [http://localhost:3000/studio](http://localhost:3000/studio)

## Deployment to Vercel

### 1. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for auto-deployment.

### 2. Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `RESEND_API_KEY` (optional)
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

### 3. Redeploy

```bash
vercel --prod
```

## CMS Usage

### Accessing the Admin Dashboard

1. Navigate to `/studio` on your deployed site
2. Log in with your Sanity credentials
3. Start managing content!

### Content Types

- **Site Settings**: Company info, contact details, social links
- **Posts/News**: Blog articles with rich text editor
- **Services**: Service listings with features, gallery
- **Projects**: Portfolio/construction projects
- **Locations**: Service areas (TPHCM, Đà Lạt, etc.)
- **Contact Messages**: Form submissions with status tracking

## Project Structure

```
anphumy-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form handler
│   │   ├── sitemap/       # Dynamic sitemap
│   │   └── robots/        # robots.txt
│   ├── components/        # React components
│   ├── studio/            # Sanity Studio embedded
│   ├── globals.css        # Tailwind styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility functions
│   ├── sanity.ts          # Sanity client & queries
│   └── utils.ts           # Helper functions
├── sanity/                # Sanity CMS config
│   ├── schemaTypes/       # Content schemas
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── public/                # Static assets
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## SEO Features

- **Meta Tags**: Auto-generated from CMS
- **JSON-LD Schema**: LocalBusiness, Article, Breadcrumb
- **Sitemap**: Dynamic with all pages
- **Robots.txt**: Configured for crawlers
- **Open Graph**: Social media previews
- **Canonical URLs**: Duplicate prevention
- **Google Verification**: Pre-configured

## Customization

### Styling

Edit `tailwind.config.ts` to customize:
- Colors (primary: red, secondary: dark blue, accent: orange)
- Fonts (Roboto, Montserrat)
- Breakpoints
- Animations

### Adding New Pages

1. Create file in `app/[page]/page.tsx`
2. Export `generateMetadata` for SEO
3. Fetch data from Sanity
4. Build your component

Example:
```tsx
// app/gioi-thieu/page.tsx
import { getPageBySlug } from '@/lib/sanity';

export default async function AboutPage() {
  const page = await getPageBySlug('gioi-thieu');
  return <div>{/* render page */}</div>;
}
```

## Support

For issues or questions:
- Check [Next.js docs](https://nextjs.org/docs)
- Check [Sanity docs](https://sanity.io/docs)
- Check [Tailwind docs](https://tailwindcss.com/docs)

## License

MIT - Feel free to use for your own projects!
