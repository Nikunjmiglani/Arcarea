// /sanity/schemas/blog.js
export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
