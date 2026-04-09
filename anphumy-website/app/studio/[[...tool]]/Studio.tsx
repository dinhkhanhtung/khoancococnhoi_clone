'use client';

import { NextStudio } from 'next-sanity/studio/client';
import config from '@/sanity/sanity.config';

export function Studio() {
  return <NextStudio config={config} />;
}
