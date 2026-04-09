'use client';

import { Phone, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PhoneFloatButtonProps {
  settings?: {
    hotline?: string;
    phone?: string;
    zalo?: string;
  } | null;
}

export function PhoneFloatButton({ settings }: PhoneFloatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hotline = settings?.hotline || '0903 961 168';
  const phone = settings?.phone;
  const zaloLink = settings?.zalo || '#';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-slide-up">
          {/* Zalo Button */}
          <a
            href={zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-full shadow-lg pl-4 pr-2 py-2 hover:shadow-xl transition-shadow"
          >
            <span className="text-sm font-medium text-gray-700">Chat Zalo</span>
            <div className="w-12 h-12 bg-[#0068FF] rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Hotline Button */}
          <a
            href={`tel:${hotline.replace(/\s/g, '')}`}
            className="flex items-center gap-3 bg-white rounded-full shadow-lg pl-4 pr-2 py-2 hover:shadow-xl transition-shadow"
          >
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Hotline</span>
              <span className="text-sm font-bold text-gray-800">{hotline}</span>
            </div>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Secondary Phone */}
          {phone && phone !== hotline && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 bg-white rounded-full shadow-lg pl-4 pr-2 py-2 hover:shadow-xl transition-shadow"
            >
              <span className="text-sm font-medium text-gray-700">{phone}</span>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
            </a>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300',
          isOpen ? 'bg-gray-700 rotate-45' : 'bg-primary animate-pulse'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Phone className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
