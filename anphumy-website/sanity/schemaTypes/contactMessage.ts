import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'string',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Interested',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Replied', value: 'replied' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ name, phone, status, submittedAt }) {
      const statusLabels: Record<string, string> = {
        new: '🟡 New',
        inProgress: '🔵 In Progress',
        replied: '🟢 Replied',
        closed: '⚫ Closed',
      };
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('vi-VN') : '';
      return {
        title: `${name} - ${phone}`,
        subtitle: `${statusLabels[status || 'new']} | ${date}`,
      };
    },
  },
});
