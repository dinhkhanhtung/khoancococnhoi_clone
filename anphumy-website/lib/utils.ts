import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale = 'vi-VN') {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPhone(phone: string) {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 96);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getLocalBusinessJsonLd(settings: {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  coordinates?: { lat: number; lng: number };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.companyName,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    telephone: settings.phone,
    email: settings.email,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    priceRange: '$$',
    ...(settings.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: settings.coordinates.lat,
        longitude: settings.coordinates.lng,
      },
    }),
  };
}

export function getArticleJsonLd(post: {
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage?: { asset: { _ref: string } };
  publishedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? urlFor(post.featuredImage).url() : undefined,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tin-tuc/${post.slug.current}`,
  };
}

import { urlFor } from './sanity';
