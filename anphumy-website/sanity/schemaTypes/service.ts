import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'content',
      description: 'Lucide icon name (e.g., Drill, Building, HardHat)',
      initialValue: 'Drill',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Shown in service listings',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'content',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'locations',
      title: 'Available Locations',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: { type: 'location' } }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      group: 'metadata',
      description: 'e.g., "Liên hệ" or "Từ 500,000đ/m"',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty Info',
      type: 'string',
      group: 'metadata',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'metadata',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      group: 'metadata',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'metadata',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'featuredImage',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title,
        subtitle: `${subtitle || ''} ${published ? '' : '(Draft)' }`,
        media,
      };
    },
  },
});
