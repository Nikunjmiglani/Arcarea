import { client } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogList() {
  const blogs = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    publishedAt,
    mainImage {
      asset -> {
        url
      }
    }
  }`)

  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Explore Our Blog</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(post => (
          <Link href={`/blog/${post.slug.current}`} key={post.slug.current}>
            <div className="bg-white rounded-2xl shadow hover:shadow-md transition duration-300 cursor-pointer">
              {post.mainImage?.asset?.url && (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
                  {post.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
