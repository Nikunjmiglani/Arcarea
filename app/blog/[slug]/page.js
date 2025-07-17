import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "blog" && defined(slug.current)]{ "slug": slug.current }`)
  return slugs.map(post => ({ slug: post.slug }))
}

export default async function BlogDetail({ params }) {
  const post = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      publishedAt,
      mainImage { asset->{url} },
      body,
      "author": author->name
    }`,
    { slug: params.slug }
  )

  if (!post) return <div>Blog not found</div>

  return (
    <article className="prose lg:prose-xl p-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        By {post.author} on {new Date(post.publishedAt).toDateString()}
      </p>
      {post.mainImage && (
        <img src={post.mainImage.asset.url} alt={post.title} />
      )}
      <PortableText value={post.body} />
    </article>
  )
}
