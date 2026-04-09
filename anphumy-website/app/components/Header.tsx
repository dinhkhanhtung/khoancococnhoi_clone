'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Menu, X, ChevronDown, Drill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  settings?: {
    companyName?: string;
    address?: string;
    phone?: string;
    hotline?: string;
    logo?: { asset?: { _ref?: string; url?: string } };
  } | null;
}

const mainNav = [
  { name: 'Trang chủ', href: '/' },
  {
    name: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { name: 'Giới thiệu chung', href: '/gioi-thieu-chung' },
      { name: 'Hồ sơ năng lực', href: '/ho-so-nang-luc' },
    ],
  },
  {
    name: 'Khoan cọc nhồi',
    href: '/khoan-coc-nhoi',
    children: [
      { name: 'Khoan cọc nhồi TPHCM', href: '/khoan-coc-nhoi-tai-tphcm' },
      { name: 'Khoan cọc nhồi Đà Lạt', href: '/khoan-coc-nhoi-tai-da-lat' },
      { name: 'Khoan cọc nhồi Bình Định', href: '/khoan-coc-nhoi-tai-binh-dinh' },
      { name: 'Khoan cọc nhồi Cần Giờ', href: '/khoan-coc-nhoi-tai-can-gio' },
      { name: 'Xem tất cả', href: '/khoan-coc-nhoi', featured: true },
    ],
  },
  {
    name: 'Công trình',
    href: '/cong-trinh',
    children: [
      { name: 'Đang thực hiện', href: '/cong-trinh/dang-thuc-hien' },
      { name: 'Đã hoàn thành', href: '/cong-trinh/da-hoan-thanh' },
    ],
  },
  { name: 'Báo giá', href: '/bao-gia' },
  { name: 'Video', href: '/video' },
  { name: 'Tin tức', href: '/tin-tuc' },
  { name: 'Liên hệ', href: '/lien-he' },
];

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const logoUrl = settings?.logo?.asset?.url || '/logo.png';

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 hidden md:block">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            {settings?.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{settings.address}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            {settings?.hotline && (
              <Link
                href={`tel:${settings.hotline}`}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent animate-pulse" />
                <span className="font-semibold">Hotline: {settings.hotline}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Drill className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-secondary leading-tight">
                  {settings?.companyName || 'AN PHÚ MỸ'}
                </h1>
                <p className="text-xs text-gray-500">Thi công khoan cọc nhồi</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                      'text-gray-700 hover:text-primary hover:bg-gray-50'
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          activeDropdown === item.name && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-2 z-50 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm transition-colors',
                            child.featured
                              ? 'text-primary font-medium bg-primary/5 hover:bg-primary/10'
                              : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/lien-he"
                className="hidden md:flex btn-primary text-sm py-2 px-4"
              >
                <Phone className="w-4 h-4" />
                Nhận báo giá
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t animate-slide-up">
          <nav className="container-custom py-4">
            {mainNav.map((item) => (
              <div key={item.name} className="border-b last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 hover:text-primary font-medium"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-sm text-gray-500 hover:text-primary"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
