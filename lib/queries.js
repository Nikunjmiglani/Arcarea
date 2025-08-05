// lib/queries.js
import { client } from './sanity';

export async function getTrendingBlogs() {
 const query = `
    *[
      _type == "post"
    ] | order(publishedAt desc)[0...20] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset -> {
          url
        }
      },
      categories[]->{
        title
      },
      author->{
        name
      }
    }
  `;

  return await client.fetch(query);
}
