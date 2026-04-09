'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

interface ContactSectionProps {
  settings?: {
    address?: string;
    phone?: string;
    hotline?: string;
    email?: string;
    workingHours?: string;
    mapEmbedUrl?: string;
  } | null;
}

const contactSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().min(10, 'Vui lòng nhập số điện thoại hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().optional(),
  location: z.string().optional(),
  serviceType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection({ settings }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-secondary mb-4">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-body max-w-2xl mx-auto">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 24h
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="heading-sm text-secondary mb-6">Thông tin liên hệ</h3>
              
              <div className="space-y-6">
                {settings?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">Địa chỉ</h4>
                      <p className="text-gray-600">{settings.address}</p>
                    </div>
                  </div>
                )}

                {(settings?.hotline || settings?.phone) && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">Điện thoại</h4>
                      <a href={`tel:${settings.hotline || settings.phone}`} className="text-primary font-medium">
                        {settings.hotline || settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">Email</h4>
                      <a href={`mailto:${settings.email}`} className="text-gray-600">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.workingHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">Giờ làm việc</h4>
                      <p className="text-gray-600">{settings.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            {settings?.mapEmbedUrl && (
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <iframe
                  src={settings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="heading-sm text-secondary mb-6">Gửi yêu cầu báo giá</h3>

            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-secondary mb-2">
                  Gửi thành công!
                </h4>
                <p className="text-gray-600">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ tên *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="0903 961 168"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khu vực công trình
                    </label>
                    <input
                      {...register('location')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="TP.HCM, Đà Lạt..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại dịch vụ
                    </label>
                    <select
                      {...register('serviceType')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="khoan-coc-nhoi-nha-pho">Khoan cọc nhồi nhà phố</option>
                      <option value="khoan-coc-nhoi-cong-nghiep">Khoan cọc nhồi công nghiệp</option>
                      <option value="gia-co-nen">Gia cố nền móng</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung yêu cầu
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Mô tả công trình, yêu cầu báo giá..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi yêu cầu báo giá
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
