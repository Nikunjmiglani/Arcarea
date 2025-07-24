import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

export async function generateMetadata({ params }) {
  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{ title }`,
    { slug: params.slug }
  )
  return { title: post?.title || 'Blog' }
}

export default async function BlogDetail({ params }) {
  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      publishedAt,
      content,
      "author": author->name
    }`,
    { slug: params.slug }
  )

  if (!post) return <div className="p-6 text-red-600">Blog not found</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author || 'Unknown'} on {new Date(post.publishedAt).toDateString()}
      </p>

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.content} />
      </div>
    </div>
  )
}
