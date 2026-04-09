import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'color',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description ? description.slice(0, 50) + '...' : '',
      };
    },
  },
});
