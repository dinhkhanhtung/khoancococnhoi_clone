import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects / Constructions',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'reference',
      group: 'content',
      to: { type: 'location' },
    }),
    defineField({
      name: 'address',
      title: 'Project Address',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
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
      name: 'projectValue',
      title: 'Project Value',
      type: 'string',
      group: 'metadata',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'metadata',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
      group: 'metadata',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Đang thực hiện', value: 'ongoing' },
          { title: 'Đã hoàn thành', value: 'completed' },
          { title: 'Sắp bắt đầu', value: 'upcoming' },
        ],
      },
      initialValue: 'ongoing',
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: { type: 'service' } }],
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
      name: 'featured',
      title: 'Featured Project',
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
      client: 'client',
      media: 'featuredImage',
      status: 'status',
    },
    prepare({ title, client, media, status }) {
      const statusLabels: Record<string, string> = {
        ongoing: 'Đang thực hiện',
        completed: 'Đã hoàn thành',
        upcoming: 'Sắp bắt đầu',
      };
      return {
        title,
        subtitle: `${client || ''} - ${statusLabels[status || 'ongoing']}`,
        media,
      };
    },
  },
});
