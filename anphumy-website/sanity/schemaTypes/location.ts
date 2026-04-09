import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          { title: 'Province/City', value: 'province' },
          { title: 'District', value: 'district' },
          { title: 'Ward/Area', value: 'ward' },
        ],
      },
      initialValue: 'province',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Location',
      type: 'reference',
      to: { type: 'location' },
      description: 'Parent province/district for nested locations',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Location Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'For service pages in this location',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'popular',
      title: 'Popular Location',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
    },
    prepare({ name, type }) {
      const typeLabels: Record<string, string> = {
        province: 'Tỉnh/TP',
        district: 'Quận/Huyện',
        ward: 'Phường/Xã',
      };
      return {
        title: name,
        subtitle: typeLabels[type || 'province'],
      };
    },
  },
});
