'use client';

import { 
  Award, 
  Clock, 
  Shield, 
  Users, 
  Wrench, 
  BadgeCheck 
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Kinh nghiệm 10+ năm',
    description: 'Đội ngũ kỹ sư và công nhân giàu kinh nghiệm trong lĩnh vực khoan cọc nhồi',
  },
  {
    icon: Clock,
    title: 'Đúng tiến độ',
    description: 'Cam kết hoàn thành công trình đúng thời hạn, không phát sinh chi phí',
  },
  {
    icon: Shield,
    title: 'Bảo hành dài hạn',
    description: 'Bảo hành công trình lên đến 24 tháng, hỗ trợ kỹ thuật trọn đời',
  },
  {
    icon: Users,
    title: 'Đội ngũ chuyên nghiệp',
    description: 'Kỹ sư có chứng chỉ, công nhân được đào tạo bài bản và chuyên sâu',
  },
  {
    icon: Wrench,
    title: 'Thiết bị hiện đại',
    description: 'Máy móc nhập khẩu từ Nhật Bản, Đức, đảm bảo chất lượng thi công',
  },
  {
    icon: BadgeCheck,
    title: 'Giá cả hợp lý',
    description: 'Báo giá minh bạch, cạnh tranh, không phát sinh chi phí ẩn',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-secondary" id="tai-sao-chon-chung-toi">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="heading-lg text-white mb-4">
            Uy Tín & Chất Lượng
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            An Phú Mỹ - Đối tác tin cậy cho mọi công trình khoan cọc nhồi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
            <div className="text-gray-400">Công trình hoàn thành</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10+</div>
            <div className="text-gray-400">Năm kinh nghiệm</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
            <div className="text-gray-400">Đối tác tin cậy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100%</div>
            <div className="text-gray-400">Khách hàng hài lòng</div>
          </div>
        </div>
      </div>
    </section>
  );
}
