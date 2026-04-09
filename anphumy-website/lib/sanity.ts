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
  const query = `*[_type == "siteSettings"][0]`;
  return client.fetch(query);
}

export async function getPosts(limit = 10) {
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
  const query = `*[_type == "page" && slug.current == $slug && published == true][0]`;
  return client.fetch(query, { slug });
}
