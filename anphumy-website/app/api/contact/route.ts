import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clientWithToken } from '@/lib/sanity';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, location, serviceType } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng nhập tên và số điện thoại' },
        { status: 400 }
      );
    }

    // Save to Sanity
    const contactMessage = await clientWithToken.create({
      _type: 'contactMessage',
      name,
      phone,
      email: email || '',
      subject: subject || 'Liên hệ từ website',
      message: message || '',
      location: location || '',
      serviceType: serviceType || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Send Email Notification
    const contactEmail = process.env.CONTACT_EMAIL || 'nenmongapm@gmail.com';
    
    await resend.emails.send({
      from: 'An Phú Mỹ Website <noreply@khoancocnhoianphumy.com>',
      to: [contactEmail],
      subject: `[Liên hệ mới] ${subject || 'Khách hàng liên hệ'} - ${name}`,
      html: `
        <h2>Thông tin liên hệ mới</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Họ tên:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Số điện thoại:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email || 'Không có'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tiêu đề:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subject || 'Không có'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Khu vực:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${location || 'Không có'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Dịch vụ quan tâm:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${serviceType || 'Không có'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Nội dung:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message || 'Không có'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">
          Thời gian: ${new Date().toLocaleString('vi-VN')}<br>
          ID: ${contactMessage._id}
        </p>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/studio" 
             style="background: #d9534f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Xem trong Admin Dashboard
          </a>
        </p>
      `,
    });

    // Auto-reply to customer
    if (email) {
      await resend.emails.send({
        from: 'An Phú Mỹ <noreply@khoancocnhoianphumy.com>',
        to: [email],
        subject: 'Cảm ơn bạn đã liên hệ - An Phú Mỹ',
        html: `
          <h2>Cảm ơn ${name} đã liên hệ!</h2>
          <p>Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
          <p>Thông tin bạn đã gửi:</p>
          <ul>
            <li><strong>Tiêu đề:</strong> ${subject || 'Liên hệ từ website'}</li>
            <li><strong>Nội dung:</strong> ${message || 'Không có'}</li>
          </ul>
          <hr style="margin: 20px 0;">
          <p><strong>CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠI DỊCH VỤ AN PHÚ MỸ</strong></p>
          <p>Hotline: ${process.env.CONTACT_PHONE || '0903 961 168'}</p>
          <p>Email: ${contactEmail}</p>
          <p>Website: ${process.env.NEXT_PUBLIC_SITE_URL}</p>
        `,
      }).catch(() => {
        // Silent fail for auto-reply
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
      id: contactMessage._id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
