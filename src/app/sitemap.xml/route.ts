import { NextResponse } from 'next/server';
import { tools } from '@/constants/tools';
import { DefaultBaseUrl } from '@/constants/global';

export async function GET() {
  // get base URL from environment or default, and remove trailing slash
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? DefaultBaseUrl).replace(/\/$/, '');
  const urls = [
    { loc: '/', priority: 1.0 },
    ...tools.map((t) => ({ loc: t.href, priority: 0.8 }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `
  <url>
    <loc>${`${base}${u.loc}`}</loc>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  });
}
