// lib/queries.js
import { client } from './sanity';

export async function getTrendingBlogs() {
  const query = `*[_type == "blog" && category == "trending"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    publishedAt,
    image {
      asset -> {
        url
      }
    },
    author->{
      name,
      image {
        asset -> {
          url
        }
      }
    }
  }`;

  return await client.fetch(query);
}
