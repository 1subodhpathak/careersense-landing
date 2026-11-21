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

    // 1. GENERATE APP SHELL FOR PRIVATE / INTERNAL ROUTES (dist/app.html + pre-created directories)
    // Prevents flash of homepage when users directly hit /dashboard, /admin, /career-assessment, etc.
    // Instead of showing the full pre-rendered landing page, it renders a clean brand spinner
    // loader on frame 1 until React mounts.
    // All SEO pages continue to receive 100% full semantic content with ZERO loader.
    const APP_ROUTES = [
      '/dashboard',
      '/admin',
      '/career-assessment',
      '/interview-simulator',
      '/learning',
      '/ebooks',
      '/u',
      '/public-profile',
      '/partner-program/apply',
      '/fellowships/apply',
      '/fellowships/data-analyst/apply',
      '/fellowships/data-science/apply',
      '/fellowships/artificial-intelligence/apply',
      '/fellowships/ui-ux-design/apply',
      '/fellowships/app-development/apply',
      '/fellowships/full-stack-development/apply'
    ];

    const appShellLoader = '<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #F8FAFC;"><div style="width: 36px; height: 36px; border: 3.5px solid #E2E8F0; border-top-color: #0284c7; border-radius: 50%; animation: cs-spin 0.8s linear infinite;"></div></div>';
    const appShellStyles = '<style>@keyframes cs-spin { to { transform: rotate(360deg); } }</style>';
    const appShellHtml = rawHtml
      .replace('</head>', `${appShellStyles}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${appShellLoader}</div>`);

    for (const appRoute of APP_ROUTES) {
      const dir = new URL(`.${appRoute}/`, distDir);
      await mkdir(dir, { recursive: true });
      await writeFile(new URL('index.html', dir), appShellHtml, 'utf8');
      const directHtmlPath = new URL(`.${appRoute}.html`, distDir);
      await writeFile(directHtmlPath, appShellHtml, 'utf8');
    }
    await writeFile(new URL('app.html', distDir), appShellHtml, 'utf8');
    console.log('âœ“ Generated CareerSense app.html shell with theme loader for internal app routes.');

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
