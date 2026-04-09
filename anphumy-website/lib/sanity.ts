import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

export const clientWithToken = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getSiteSettings() {
  if (!projectId || projectId === 'abcd1234') {
    return {
      companyName: 'CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠI DỊCH VỤ AN PHÚ MỸ',
      address: '20/161S Phan Huy Ích – Phường 12 – Q.Gò Vấp – TP.HCM',
      phone: '0903 961 168',
      hotline: '0903 961 168',
      email: 'nenmongapm@gmail.com',
      workingHours: 'Thứ 2 - Thứ 7: 7:00 - 17:30',
      seoTitle: 'Thi Công Khoan Cọc Nhồi Toàn Quốc - An Phú Mỹ',
      seoDescription: 'CÔNG TY TNHH XD TM AN PHÚ MỸ - Khoan cọc nhồi nhà phố, thi công dự án với giá cả hợp lý. Đảm bảo làm đúng cam kết.',
    };
  }
  const query = `*[_type == "siteSettings"][0]`;
  return client.fetch(query);
}

export async function getPosts(limit = 10) {
  if (!projectId || projectId === 'abcd1234') {
    return [];
  }
  const query = `*[_type == "post" && published == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    featured,
    "categories": categories[]->title
  }`;
  return client.fetch(query);
}

export async function getPostBySlug(slug: string) {
  if (!projectId || projectId === 'abcd1234') {
    return null;
  }
  const query = `*[_type == "post" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    publishedAt,
    author,
    metaTitle,
    metaDescription,
    keywords,
    ogImage,
    "categories": categories[]->{title, slug}
  }`;
  return client.fetch(query, { slug });
}

export async function getServices(limit?: number) {
  if (!projectId || projectId === 'abcd1234') {
    return [];
  }
  const limitClause = limit ? `[0...${limit}]` : '';
  const query = `*[_type == "service" && published == true] | order(order asc) ${limitClause} {
    _id,
    title,
    slug,
    subtitle,
    icon,
    featuredImage,
    shortDescription,
    priceRange,
    warranty,
    featured
  }`;
  return client.fetch(query);
}

export async function getServiceBySlug(slug: string) {
  if (!projectId || projectId === 'abcd1234') {
    return null;
  }
  const query = `*[_type == "service" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    subtitle,
    icon,
    featuredImage,
    shortDescription,
    fullDescription,
    features,
    gallery,
    priceRange,
    warranty,
    metaTitle,
    metaDescription,
    keywords,
    "locations": locations[]->{name, slug}
  }`;
  return client.fetch(query, { slug });
}

export async function getProjects(limit?: number) {
  if (!projectId || projectId === 'abcd1234') {
    return [];
  }
  const limitClause = limit ? `[0...${limit}]` : '';
  const query = `*[_type == "project" && published == true] | order(completionDate desc) ${limitClause} {
    _id,
    title,
    slug,
    client,
    featuredImage,
    location->,
    status,
    featured
  }`;
  return client.fetch(query);
}

export async function getLocations() {
  if (!projectId || projectId === 'abcd1234') {
    return [];
  }
  const query = `*[_type == "location"] | order(order asc) {
    _id,
    name,
    slug,
    type,
    popular,
    "children": *[_type == "location" && references(^._id)] { name, slug }
  }`;
  return client.fetch(query);
}

export async function getPageBySlug(slug: string) {
  if (!projectId || projectId === 'abcd1234') {
    return null;
  }
  const query = `*[_type == "page" && slug.current == $slug && published == true][0]`;
  return client.fetch(query, { slug });
}
