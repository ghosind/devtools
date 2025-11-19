import { NextResponse } from 'next/server';
import { tools } from '@/constants/tools';

function buildUrl(loc: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devtools.ghosind.com';
  return `${base.replace(/\/$/, '')}${loc}`;
}

export async function GET() {
  const urls = [
    { loc: '/', priority: 1.0 },
    ...tools.map((t) => ({ loc: t.href, priority: 0.8 }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${buildUrl(u.loc)}</loc>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  });
}
