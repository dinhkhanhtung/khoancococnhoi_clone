import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Homepage', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Services List', value: 'services' },
          { title: 'Projects List', value: 'projects' },
          { title: 'News/Blog List', value: 'blog' },
          { title: 'Contact', value: 'contact' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'custom',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'enabled',
          title: 'Show Hero',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Liên hệ ngay',
        },
        {
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '/lien-he',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
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
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'servicesSection',
          title: 'Services Section',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'subtitle', type: 'string', title: 'Section Subtitle' },
            { name: 'showFeaturedOnly', type: 'boolean', title: 'Show Featured Only', initialValue: true },
          ],
        },
        {
          type: 'object',
          name: 'projectsSection',
          title: 'Projects Section',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'subtitle', type: 'string', title: 'Section Subtitle' },
            { name: 'limit', type: 'number', title: 'Number of Projects', initialValue: 6 },
          ],
        },
        {
          type: 'object',
          name: 'postsSection',
          title: 'News/Blog Section',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'subtitle', type: 'string', title: 'Section Subtitle' },
            { name: 'limit', type: 'number', title: 'Number of Posts', initialValue: 4 },
          ],
        },
        {
          type: 'object',
          name: 'contactSection',
          title: 'Contact Section',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'showForm', type: 'boolean', title: 'Show Contact Form', initialValue: true },
            { name: 'showMap', type: 'boolean', title: 'Show Map', initialValue: true },
          ],
        },
      ],
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
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
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
      pageType: 'pageType',
      slug: 'slug',
    },
    prepare({ title, pageType, slug }) {
      const typeLabels: Record<string, string> = {
        home: 'Trang chủ',
        about: 'Giới thiệu',
        services: 'Dịch vụ',
        projects: 'Công trình',
        blog: 'Tin tức',
        contact: 'Liên hệ',
        custom: 'Trang tùy chỉnh',
      };
      return {
        title,
        subtitle: `${typeLabels[pageType || 'custom']} - /${slug?.current || ''}`,
      };
    },
  },
});
