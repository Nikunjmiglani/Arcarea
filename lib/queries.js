// lib/queries.js
import { client } from './sanity';

export async function getTrendingBlogs() {
  const query = `
    *[
      _type == "post" &&
      "trending" in categories[]->title
    ] | order(publishedAt desc)[0...6] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset -> {
          url
        }
      },
      author->{
        name
      }
    }
  `;

  return await client.fetch(query);
}
