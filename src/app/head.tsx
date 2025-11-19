export default function Head() {
  const title = 'DevTools';
  const description = 'A collection of small developer utilities.';
  const url = 'https://devtools.ghosind.com';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "url": url,
    "description": description
  };

  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* canonical */}
      <link rel="canonical" href={url} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
