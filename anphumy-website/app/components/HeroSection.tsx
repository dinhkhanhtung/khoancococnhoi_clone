'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

interface HeroSectionProps {
  settings?: {
    companyName?: string;
    hotline?: string;
  } | null;
}

const slides = [
  {
    image: '/images/hero-1.jpg',
    title: 'Thi Công Khoan Cọc Nhồi',
    subtitle: 'Chuyên Nghiệp & Uy Tín',
    description: 'Đội ngũ kỹ sư giàu kinh nghiệm, thiết bị hiện đại, cam kết chất lượng và tiến độ',
  },
  {
    image: '/images/hero-2.jpg',
    title: 'Giải Pháp Nền Móng Toàn Diện',
    subtitle: 'Cho Mọi Công Trình',
    description: 'Từ nhà phố đến công trình công nghiệp, chúng tôi đáp ứng mọi nhu cầu thi công',
  },
  {
    image: '/images/hero-3.jpg',
    title: 'Bảo Hành Dài Hạn',
    subtitle: 'Giá Cả Cạnh Tranh',
    description: 'Báo giá minh bạch, không phát sinh chi phí, bảo hành chất lượng công trình',
  },
];

const features = [
  'Thiết bị hiện đại',
  'Kỹ sư chuyên nghiệp',
  'Giá cả hợp lý',
  'Bảo hành dài hạn',
];

export function HeroSection({ settings }: HeroSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full container-custom flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={selectedIndex === index ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-2xl text-white"
                >
                  <span className="inline-block px-4 py-2 bg-primary/20 text-primary-300 rounded-full text-sm font-medium mb-4">
                    {slide.subtitle}
                  </span>
                  
                  <h1 className="heading-xl mb-4">
                    {slide.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    {slide.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/lien-he"
                      className="btn-primary text-lg"
                    >
                      <Phone className="w-5 h-5" />
                      Nhận báo giá ngay
                    </Link>
                    <Link
                      href="/khoan-coc-nhoi"
                      className="btn-outline text-lg border-white text-white hover:bg-white hover:text-secondary"
                    >
                      Xem dịch vụ
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              selectedIndex === index
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Hotline Badge */}
      <div className="absolute top-32 right-4 md:right-12 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
          <p className="text-sm mb-1">Hotline 24/7</p>
          <p className="text-2xl font-bold text-accent">{settings?.hotline || '0903 961 168'}</p>
        </div>
      </div>
    </section>
  );
}
