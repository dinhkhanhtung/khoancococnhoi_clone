'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  mainImage?: { asset?: { url?: string } };
  features?: string[];
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="section-padding bg-white" id="dich-vu">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Dịch vụ của chúng tôi
          </span>
          <h2 className="heading-lg text-secondary mb-4">
            Giải Pháp Khoan Cọc Nhồi
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Cung cấp dịch vụ khoan cọc nhồi chuyên nghiệp cho mọi loại công trình
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.mainImage?.asset?.url || '/images/service-placeholder.jpg'}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.shortDescription || 'Dịch vụ khoan cọc nhồi chuyên nghiệp với đội ngũ kỹ sư giàu kinh nghiệm.'}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/khoan-coc-nhoi/${service.slug.current}`}
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
          <Link href="/khoan-coc-nhoi" className="btn-primary">
            Xem tất cả dịch vụ
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
