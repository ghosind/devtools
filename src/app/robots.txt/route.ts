import { NextResponse } from 'next/server';
import { DefaultBaseUrl } from '@/constants/global';

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? DefaultBaseUrl).replace(/\/$/, '');
  const body = `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml`;

  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}
