import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

/* global console */

const siteUrl = String(process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://careersenseai.com').replace(/\/$/, '');
const distHtmlPath = new URL('../dist/index.html', import.meta.url);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

const pageTitle = 'CareerSense | All-in-One AI Career Copilot & Job Readiness Platform';
const pageDescription = 'Accelerate your career with CareerSense AI. Access AI Resume Builder, ATS Checker, Cover Letter Generator, Career Readiness diagnostics, and fellowship programs.';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      'name': 'CareerSense',
      'url': siteUrl,
      'description': pageDescription,
      'publisher': {
        '@type': 'Organization',
        'name': 'CareerSense',
        'url': siteUrl,
        'logo': `${siteUrl}/CSlogo.png`
      }
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#webapp`,
      'name': 'CareerSense AI Platform',
      'url': siteUrl,
      'applicationCategory': 'CareerApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'description': pageDescription,
      'featureList': [
        'AI Resume Builder with ATS Templates',
        'ATS Resume Score & Keyword Checker',
        'AI Cover Letter Builder',
        'Career GPS Readiness Diagnostics',
        'LinkedIn Profile Optimizer',
        'Data Analyst & Tech Fellowships',
        'Verifiable Skill Certification'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is CareerSense?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'CareerSense is an all-in-one AI career copilot that helps students, job seekers, and working professionals build ATS resumes, check job-description match scores, craft cover letters, practice interviews, and upskill with verifiable certifications.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Which AI career tools are available on CareerSense?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'CareerSense provides the AI Resume Builder (resume.careersenseai.com), ATS Score Checker (ats.careersenseai.com), AI Cover Letter Builder (coverletter.careersenseai.com), Skill Certification (certifi.careersenseai.com), Career GPS, and LinkedIn Optimizer.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does the ATS Score Checker help job seekers?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The ATS Score Checker compares your resume directly with a target job description, identifying missing keywords, formatting flaws, and role-fit gaps before you submit applications.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can colleges and training institutes partner with CareerSense?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. CareerSense provides placement readiness dashboards, real-time student analytics, interview simulators, and skill-tracking tools for universities, colleges, and training institutes.'
          }
        }
      ]
    }
  ]
};

const prerenderBody = `
  <div id="root">
    <div style="min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; background: #f8fafc;">
      <div style="width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #0d9488; border-radius: 50%; animation: cs-spin 0.8s linear infinite;"></div>
    </div>
  </div>
  <noscript>
    <style>
      #root { display: none !important; }
      .cs-seo-fallback {
        max-width: 960px;
        margin: 40px auto;
        padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #071426;
        line-height: 1.6;
      }
      .cs-seo-fallback h1 { font-size: 32px; font-weight: 700; color: #071426; margin-bottom: 16px; }
      .cs-seo-fallback h2 { font-size: 22px; font-weight: 600; color: #0284c7; margin-top: 28px; margin-bottom: 12px; }
      .cs-seo-fallback h3 { font-size: 17px; font-weight: 600; color: #071426; margin-top: 18px; margin-bottom: 6px; }
      .cs-seo-fallback p { color: #475569; margin-bottom: 16px; font-size: 16px; }
      .cs-seo-fallback a { color: #0284c7; font-weight: 600; text-decoration: underline; }
      .cs-seo-fallback ul, .cs-seo-fallback ol { padding-left: 22px; margin-bottom: 20px; }
      .cs-seo-fallback li { margin-bottom: 8px; color: #334155; }
      .cs-seo-fallback .badge { display: inline-block; background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
      .cs-seo-fallback .tool-card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 14px; background: #F8FAFC; }
      .cs-seo-fallback .faq-item { border-bottom: 1px solid #E2E8F0; padding-bottom: 14px; margin-bottom: 14px; }
    </style>
    <div class="cs-seo-fallback">
      <span class="badge">Unified AI Career Ecosystem</span>
      <h1>CareerSense — All-in-One AI Career Acceleration Platform</h1>
      <p>CareerSense is your AI career copilot for job readiness diagnostics, ATS-optimized resumes, cover letter generation, interview preparation, verifiable skill certifications, and professional fellowship programs.</p>

      <h2>Core CareerSense AI Tools &amp; Ecosystem</h2>
      
      <div class="tool-card">
        <h3><a href="https://resume.careersenseai.com/">AI Resume Builder</a></h3>
        <p>Build ATS-friendly, professional resumes with 60+ job-tailored examples, role-based bullet suggestions, executive formatting, and 1-click PDF export.</p>
      </div>

      <div class="tool-card">
        <h3><a href="https://ats.careersenseai.com/">ATS Resume Score Checker</a></h3>
        <p>Upload your resume and paste your target job description. Get instant match scores, keyword gap analysis, and ATS formatting audits.</p>
      </div>

      <div class="tool-card">
        <h3><a href="https://coverletter.careersenseai.com/">AI Cover Letter Builder</a></h3>
        <p>Craft tailored, boardroom-ready cover letters calibrated to any job description in seconds using advanced AI synthesis.</p>
      </div>

      <div class="tool-card">
        <h3><a href="https://certifi.careersenseai.com/">Verifiable Skill Certification</a></h3>
        <p>Validate your competencies through AI-proctored skill assessments and earn shareable, cryptographic certificate credentials.</p>
      </div>

      <h2>Specialized Career Readiness Programs</h2>
      <ul>
        <li><strong>Career GPS:</strong> Comprehensive multi-dimensional assessment diagnosing resume strength, ATS score, JD match, and interview readiness.</li>
        <li><strong>LinkedIn Optimizer:</strong> Calibrate your LinkedIn headline, summary, and experience to recruiter search algorithms.</li>
        <li><strong>Data Analyst &amp; Tech Fellowships:</strong> Practical, mentor-backed fellowship tracks preparing candidates for high-demand tech roles.</li>
        <li><strong>Partner Program &amp; Campus Solutions:</strong> Placement readiness dashboards, student progress tracking, and scaled mock interview suites for universities and training institutes.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>What is CareerSense?</h3>
        <p>CareerSense is an all-in-one AI career copilot that helps students, job seekers, and working professionals build ATS resumes, check job-description match scores, craft cover letters, practice interviews, and upskill with verifiable certifications.</p>
      </div>
      <div class="faq-item">
        <h3>Which AI career tools are available on CareerSense?</h3>
        <p>CareerSense provides the AI Resume Builder (resume.careersenseai.com), ATS Score Checker (ats.careersenseai.com), AI Cover Letter Builder (coverletter.careersenseai.com), Skill Certification (certifi.careersenseai.com), Career GPS, and LinkedIn Optimizer.</p>
      </div>
      <div class="faq-item">
        <h3>How does the ATS Score Checker help job seekers?</h3>
        <p>The ATS Score Checker compares your resume directly with a target job description, identifying missing keywords, formatting flaws, and role-fit gaps before you submit applications.</p>
      </div>
      <div class="faq-item">
        <h3>Can colleges and training institutes partner with CareerSense?</h3>
        <p>Yes. CareerSense provides placement readiness dashboards, real-time student analytics, interview simulators, and skill-tracking tools for universities, colleges, and training institutes.</p>
      </div>
    </div>
  </noscript>`;

async function prerender() {
  try {
    const rawHtml = await readFile(distHtmlPath, 'utf8');

    const headInject = `
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(pageDescription)}" />
    <meta name="keywords" content="AI career copilot, resume builder, ATS checker, cover letter builder, interview simulator, career acceleration, job readiness, CareerSense" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${siteUrl}/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CareerSense" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(pageDescription)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${siteUrl}/" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}" />
    <style>@keyframes cs-spin{to{transform:rotate(360deg)}}body{margin:0;background-color:#f8fafc;}</style>
    <script type="application/ld+json">${escapeJson(schema)}</script>`;

    let processed = rawHtml
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(/<meta name="description"[\s\S]*?>/i, '')
      .replace(/<meta name="keywords"[\s\S]*?>/i, '')
      .replace(/<meta name="robots"[\s\S]*?>/i, '')
      .replace(/<link rel="canonical"[\s\S]*?>/i, '')
      .replace(/<meta property="og:[\s\S]*?>/gi, '')
      .replace(/<meta name="twitter:[\s\S]*?>/gi, '')
      .replace(/<meta property="twitter:[\s\S]*?>/gi, '')
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    processed = processed.replace('</head>', `${headInject}\n  </head>`);

    if (processed.includes('<div id="root"></div>')) {
      processed = processed.replace('<div id="root"></div>', prerenderBody);
    }

    await writeFile(distHtmlPath, processed, 'utf8');
    console.log('✓ Successfully prerendered CareerSense Main Domain SEO fallback into dist/index.html');
  } catch (err) {
    console.error('Error during CareerSense prerender:', err);
    process.exit(1);
  }
}

prerender();
