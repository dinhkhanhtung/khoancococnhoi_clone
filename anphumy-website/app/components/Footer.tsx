'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  settings?: {
    companyName?: string;
    address?: string;
    phone?: string;
    hotline?: string;
    email?: string;
    workingHours?: string;
    facebook?: string;
    youtube?: string;
    zalo?: string;
  } | null;
}

const footerLinks = {
  services: [
    { name: 'Khoan cọc nhồi nhà phố', href: '/khoan-coc-nhoi-nha-pho' },
    { name: 'Khoan cọc nhồi công nghiệp', href: '/khoan-coc-nhoi-cong-nghiep' },
    { name: 'Thi công nền móng', href: '/thi-cong-nen-mong' },
    { name: 'Gia cố nền đất yếu', href: '/gia-co-nen-dat-yeu' },
    { name: 'Khoan cọc khoan nhồi', href: '/khoan-coc-khoan-nhoi' },
  ],
  locations: [
    { name: 'TP. Hồ Chí Minh', href: '/khoan-coc-nhoi-tai-tphcm' },
    { name: 'Đà Lạt - Lâm Đồng', href: '/khoan-coc-nhoi-tai-da-lat' },
    { name: 'Bình Định', href: '/khoan-coc-nhoi-tai-binh-dinh' },
    { name: 'Huế', href: '/khoan-coc-nhoi-tai-hue' },
    { name: 'Cần Giờ', href: '/khoan-coc-nhoi-tai-can-gio' },
  ],
  company: [
    { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Hồ sơ năng lực', href: '/ho-so-nang-luc' },
    { name: 'Công trình', href: '/cong-trinh' },
    { name: 'Tin tức', href: '/tin-tuc' },
    { name: 'Liên hệ', href: '/lien-he' },
  ],
};

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">
              {settings?.companyName || 'CÔNG TY TNHH AN PHÚ MỸ'}
            </h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Chuyên thi công khoan cọc nhồi, nền móng công trình với đội ngũ kỹ sư 
              giàu kinh nghiệm và thiết bị hiện đại.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {settings?.zalo && (
                <a
                  href={settings.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="font-bold text-sm">Zalo</span>
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-primary pb-2 inline-block">
              Dịch vụ
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-primary pb-2 inline-block">
              Khu vực phục vụ
            </h4>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-primary pb-2 inline-block">
              Liên hệ
            </h4>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{settings.address}</span>
                </li>
              )}
              {settings?.hotline && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a
                    href={`tel:${settings.hotline}`}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Hotline: {settings.hotline}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.workingHours && (
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-gray-300 text-sm">{settings.workingHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {settings?.companyName || 'An Phú Mỹ'}. 
              All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/dieu-khoan-su-dung" className="hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
