'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  author?: { name?: string };
  mainImage?: { asset?: { url?: string } };
  categories?: { title?: string }[];
}

interface NewsSectionProps {
  posts: Post[];
}

export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section className="section-padding bg-white" id="tin-tuc">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Tin tức & Kiến thức
          </span>
          <h2 className="heading-lg text-secondary mb-4">
            Tin Tức Ngành Xây Dựng
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Cập nhật kiến thức chuyên ngành và tin tức mới nhất về khoan cọc nhồi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts?.map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.mainImage?.asset?.url || '/images/blog-placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.categories && post.categories[0] && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {post.categories[0].title}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publishedAt ? formatDate(post.publishedAt) : 'Mới đây'}
                  </span>
                  {post.author?.name && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author.name}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {post.excerpt || 'Xem thêm thông tin chi tiết về bài viết này...'}
                </p>

                <Link
                  href={`/tin-tuc/${post.slug.current}`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all"
                >
                  Đọc tiếp
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/tin-tuc" className="btn-primary">
            Xem tất cả tin tức
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
