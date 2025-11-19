import { NextResponse } from 'next/server';

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devtools.ghosind.com'}/sitemap.xml`;
  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}
