import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Posts / News',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
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
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Override default page title for SEO',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Override default page description for SEO',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      description: 'SEO keywords for this post',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'metadata',
      initialValue: 'An Phú Mỹ',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
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
      author: 'author',
      media: 'featuredImage',
      published: 'published',
    },
    prepare({ title, author, media, published }) {
      return {
        title,
        subtitle: `${author} ${published ? '' : '(Draft)' }`,
        media,
      };
    },
  },
});
