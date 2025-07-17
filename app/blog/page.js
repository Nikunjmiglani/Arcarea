import { client } from '@/lib/sanity'
import Link from 'next/link'

export default async function BlogList() {
  const blogs = await client.fetch(`*[_type == "blog"]{ title, slug, publishedAt }`)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {blogs.map(post => (
          <li key={post.slug.current} className="mb-2">
            <Link href={`/blog/${post.slug.current}`}>
              <span className="text-blue-600 hover:underline">{post.title}</span>
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.publishedAt).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
