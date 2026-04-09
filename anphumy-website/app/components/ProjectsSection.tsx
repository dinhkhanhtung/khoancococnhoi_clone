'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  location?: string;
  completedDate?: string;
  mainImage?: { asset?: { url?: string } };
  status?: 'ongoing' | 'completed';
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="section-padding bg-gray-50" id="cong-trinh">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Công trình tiêu biểu
          </span>
          <h2 className="heading-lg text-secondary mb-4">
            Dự Án Đã Thực Hiện
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Những công trình khoan cọc nhồi mà chúng tôi đã hoàn thành với chất lượng cao
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div
              key={project._id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.mainImage?.asset?.url || '/images/project-placeholder.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                
                {project.status && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'ongoing' 
                      ? 'bg-accent text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {project.status === 'ongoing' ? 'Đang thực hiện' : 'Đã hoàn thành'}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1 line-clamp-2">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-sm text-gray-200">{project.client}</p>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {project.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </span>
                  )}
                  {project.completedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.completedDate).getFullYear()}
                    </span>
                  )}
                </div>

                <Link
                  href={`/cong-trinh/${project.slug.current}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/cong-trinh" className="btn-primary">
            Xem tất cả công trình
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
