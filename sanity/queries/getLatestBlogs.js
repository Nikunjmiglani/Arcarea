// /sanity/queries/getLatestBlogs.js
import { client } from '@/lib/sanity'

export async function getLatestBlogs() {
  const query = `
    *[_type == "blog"] | order(_createdAt desc)[0...10] {
      title,
      slug,
      image
    }
  `;
  return await client.fetch(query);
}
