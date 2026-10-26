import { mkdir, readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';
import { siteUrl, pages, renderPage } from '../src/data/seoPagesData.js';

/* global console */

const distDir = new URL('../dist/', import.meta.url);
const distHtmlPath = new URL('index.html', distDir);

async function prerender() {
  try {
    const rawHtml = await readFile(distHtmlPath, 'utf8');

    for (const page of pages) {
      const renderedHtml = renderPage(rawHtml, page);

      if (page.path === '/') {
        await writeFile(distHtmlPath, renderedHtml, 'utf8');
        console.log(`✓ Prerendered ${page.path} -> dist/index.html`);
      } else {
        const pageDir = new URL(`.${page.path}/`, distDir);
        await mkdir(pageDir, { recursive: true });
        await writeFile(new URL('index.html', pageDir), renderedHtml, 'utf8');
        const directHtmlPath = new URL(`.${page.path}.html`, distDir);
        await writeFile(directHtmlPath, renderedHtml, 'utf8');
        console.log(`✓ Prerendered ${page.path} -> dist${page.path}/index.html and dist${page.path}.html`);
      }
    }

    // Keep sitemaps synced
    const buildDate = new Date().toISOString().slice(0, 10);
    const urls = pages.map((page) => `  <url>
    <loc>${siteUrl}${page.path === '/' ? '/' : page.path}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${page.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page.path === '/' ? '1.0' : page.path === '/partner-program' ? '0.7' : '0.8'}</priority>
  </url>`).join('\n');

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    await writeFile(new URL('sitemap.xml', distDir), sitemapXml, 'utf8');
    await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemapXml, 'utf8');

    console.log(`✓ Successfully prerendered ${pages.length} CareerSense landing pages with distinct SEO content.`);
  } catch (err) {
    console.error('Error during CareerSense prerender:', err);
    process.exit(1);
  }
}

prerender();
