import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: { update: true, create: true, delete: false },
  groups: [
    { name: 'general', title: 'General' },
    { name: 'seo', title: 'SEO' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'hotline',
      title: 'Hotline',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'zalo',
      title: 'Zalo Link',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
