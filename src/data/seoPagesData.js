/* global process */

export const siteUrl = String(
  (typeof process !== 'undefined' && (process.env?.SITE_URL || process.env?.VITE_SITE_URL)) ||
  'https://careersenseai.com'
).replace(/\/$/, '');

export const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

export const pages = [
  {
    path: '/',
    title: 'CareerSense | All-in-One AI Career Copilot & Job Readiness Platform',
    description: 'Accelerate your career with CareerSense AI. Access AI Resume Builder, ATS Checker, Cover Letter Generator, Career Readiness diagnostics, and fellowship programs.',
    keywords: 'AI career copilot, resume builder, ATS checker, cover letter builder, interview simulator, career acceleration, job readiness, CareerSense',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          name: 'CareerSense',
          url: siteUrl,
          description: 'All-in-One AI Career Acceleration & Job Readiness Platform',
          publisher: {
            '@type': 'Organization',
            name: 'CareerSense',
            url: siteUrl,
            logo: `${siteUrl}/CSlogo.png`,
          },
        },
        {
          '@type': 'WebApplication',
          '@id': `${siteUrl}/#webapp`,
          name: 'CareerSense AI Platform',
          url: siteUrl,
          applicationCategory: 'CareerApplication',
          operatingSystem: 'All',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          description: 'Accelerate your career with CareerSense AI. Access AI Resume Builder, ATS Checker, Cover Letter Generator, Career Readiness diagnostics, and fellowship programs.',
          featureList: [
            'AI Resume Builder with ATS Templates',
            'ATS Resume Score & Keyword Checker',
            'AI Cover Letter Builder',
            'Career GPS Readiness Diagnostics',
            'LinkedIn Profile Optimizer',
            'Data Analyst & Tech Fellowships',
            'Verifiable Skill Certification',
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${siteUrl}/#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is CareerSense?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'CareerSense is an all-in-one AI career copilot that helps students, job seekers, and working professionals build ATS resumes, check job-description match scores, craft cover letters, practice interviews, and upskill with verifiable certifications.',
              },
            },
            {
              '@type': 'Question',
              name: 'Which AI career tools are available on CareerSense?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'CareerSense provides the AI Resume Builder (resume.careersenseai.com), ATS Score Checker (ats.careersenseai.com), AI Cover Letter Builder (coverletter.careersenseai.com), Skill Certification (certifi.careersenseai.com), Career GPS, and LinkedIn Optimizer.',
              },
            },
            {
              '@type': 'Question',
              name: 'How does the ATS Score Checker help job seekers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The ATS Score Checker compares your resume directly with a target job description, identifying missing keywords, formatting flaws, and role-fit gaps before you submit applications.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can colleges and training institutes partner with CareerSense?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. CareerSense provides placement readiness dashboards, real-time student analytics, interview simulators, and skill-tracking tools for universities, colleges, and training institutes.',
              },
            },
          ],
        },
      ],
    },
  },
  {
    path: '/pricing',
    title: 'Pricing & Plans — Free, Student, Intern & Partner | CareerSense',
    description: 'Explore CareerSense plans from free AI tool access to student monthly allowances, 3-month tech fellowships, and campus partner memberships.',
    keywords: 'CareerSense pricing, AI resume subscription, career coaching cost, tech fellowship fees, student discount career tools',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'CareerSense Pricing & Plans',
          description: 'Explore CareerSense plans from free AI tool access to student monthly allowances, 3-month tech fellowships, and campus partner memberships.',
          url: `${siteUrl}/pricing`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Which CareerSense plan is right for me?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Choose Free to explore core tools. Choose Student for active job applications with 100,000 monthly tokens and unlimited downloads. Choose Intern for 3-month immersive fellowships with hands-on projects and mentorship. Choose Partner to lead campus career initiatives.',
              },
            },
            {
              '@type': 'Question',
              name: 'When do AI tokens refresh?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Free includes a 30,000 token one-time allowance. Student refills 100,000 tokens every month. Intern includes 500,000 tokens per month for 3 months. Partner includes 1,000,000 tokens each month.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I buy additional tokens without upgrading?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! CareerSense offers token top-ups that can be purchased anytime without changing your current subscription tier.',
              },
            },
          ],
        },
      ],
    },
  },
  {
    path: '/career-gps',
    title: 'Career GPS — AI Job Readiness Diagnostic & Score | CareerSense',
    description: 'Take the Career GPS diagnostic. Assess your job-readiness score, uncover ATS keyword gaps, and receive a tailored 3-step action roadmap to employment.',
    keywords: 'career GPS, job readiness score, employability diagnostic, ATS audit, career roadmap, CareerSense GPS',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'Career GPS Job Readiness Diagnostic',
          description: 'Assess your job-readiness score, uncover ATS keyword gaps, and receive a tailored 3-step action roadmap to employment.',
          url: `${siteUrl}/career-gps`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the Career GPS diagnostic?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Career GPS evaluates your profile across five core dimensions: resume structure, ATS match rate, domain competencies, interview readiness, and verifiable credentials to calculate an overall job-readiness score.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does the Career GPS assessment take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The diagnostic takes roughly 3 to 5 minutes to complete and produces immediate personalized recommendations and action items.',
              },
            },
          ],
        },
      ],
    },
  },
  {
    path: '/linkedin-optimizer',
    title: 'LinkedIn Profile Optimizer — Recruiter Search & Algorithm Calibration | CareerSense',
    description: 'Optimize your LinkedIn headline, about section, experience, and skills to rank higher in recruiter searches and attract interview opportunities.',
    keywords: 'LinkedIn optimizer, LinkedIn headline generator, recruiter SEO, LinkedIn profile audit, CareerSense LinkedIn',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'LinkedIn Profile Optimizer',
          description: 'Optimize your LinkedIn headline, about section, experience, and skills to rank higher in recruiter searches and attract interview opportunities.',
          url: `${siteUrl}/linkedin-optimizer`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How does LinkedIn profile optimization help job seekers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Recruiters search LinkedIn using strict role-specific keywords. The CareerSense LinkedIn Optimizer aligns your headline, summary, and experience with high-intent recruiter search filters.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does the optimizer write my headline and about section?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! It generates multiple headline variations, crafts storytelling summary paragraphs, and suggests metric-backed achievement bullet points.',
              },
            },
          ],
        },
      ],
    },
  },
  {
    path: '/fellowships/data-analyst',
    title: 'Data Analyst Fellowship Program — Real Projects & Mentorship | CareerSense',
    description: '12-week immersive Data Analyst Fellowship. Build production SQL, Python, Power BI, and Tableau portfolio projects with founder mentorship and verified credentials.',
    keywords: 'data analyst fellowship, business intelligence internship, SQL internship, Python data analysis, CareerSense fellowship',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'Data Analyst Fellowship Program',
          description: '12-week immersive Data Analyst Fellowship. Build production SQL, Python, Power BI, and Tableau portfolio projects with founder mentorship and verified credentials.',
          url: `${siteUrl}/fellowships/data-analyst`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Who is eligible for the Data Analyst Fellowship?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The fellowship is open to fresh graduates, college students, career switchers, and professionals aiming to break into data analysis and business intelligence roles.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do fellows receive an official certificate and offer letter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! All fellows receive an official CareerSense Intern ID card, a verified offer letter, and a verifiable completion certificate.',
              },
            },
          ],
        },
      ],
    },
  },
  {
    path: '/partner-program',
    title: 'CareerSense Partner Program — Campus Ambassadors & Growth Partners',
    description: 'Join the CareerSense Partner Program. Represent CareerSense at your college or community, lead career workshops, earn rewards, and receive founder mentorship.',
    keywords: 'campus ambassador, student partner program, career leadership, CareerSense partner, student internship',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'CareerSense Partner Program',
          description: 'Join the CareerSense Partner Program. Represent CareerSense at your college or community, lead career workshops, earn rewards, and receive founder mentorship.',
          url: `${siteUrl}/partner-program`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Who can apply to the CareerSense Partner Program?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'College students, placement coordinators, student club leaders, and community organizers passionate about career acceleration and helping peers land jobs.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the main benefits for Partners?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Direct weekly mentorship with the CareerSense founders, 1,000,000 monthly AI tokens, 20 real business assignments, an official Partner ID, Letter of Recommendation, and performance rewards.',
              },
            },
          ],
        },
      ],
    },
  },
];

// ============================================================
// EXACT PRODUCTION NAVBAR (Tailwind Native - No global css conflicts)
// ============================================================
export const getProductionNavbarHtml = () => `
  <header class="relative z-50 border-b shadow-[0_10px_30px_rgba(2,11,31,0.06)] transition-colors duration-300 border-slate-900/8 bg-[#eef6ff] text-slate-950">
    <div class="mx-auto max-w-[1600px] px-5 lg:px-6 xl:px-8">
      <div class="flex min-h-[74px] items-center justify-between gap-3 xl:gap-4">
        <a href="/" class="flex shrink-0 items-center gap-2.5 xl:gap-3">
          <img src="/cs_logo.png" alt="CareerSense logo" class="h-9 w-auto object-contain" />
          <div class="leading-none">
            <div class="text-[16px] font-black tracking-tight sm:text-[20px] text-slate-950">
              <span>Career</span><span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
            </div>
            <div class="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.34em] sm:block text-cyan-700/90">
              AI Career Copilot
            </div>
          </div>
        </a>
        <nav class="hidden min-w-0 shrink items-center justify-center gap-1 xl:flex">
          <a href="https://resume.careersenseai.com/" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950 inline-flex items-center gap-1">
            <span>Career Tools</span>
            <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
          <a href="/pricing?tab=fellowships" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950 inline-flex items-center gap-1">
            <span>Fellowships</span>
            <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
          <a href="/career-gps" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950">
            Career Score
          </a>
          <a href="/linkedin-optimizer" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950">
            LinkedIn
          </a>
          <a href="/partner-program" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950">
            Partner Program
          </a>
          <a href="/pricing" class="relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm text-slate-700 hover:bg-slate-900/6 hover:text-slate-950 inline-flex items-center gap-1">
            <span>More</span>
            <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
        </nav>
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/8 bg-white/80 text-slate-700" aria-hidden="true">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </div>
        </div>
      </div>
    </div>
  </header>`;

// ============================================================
// EXACT PRODUCTION FOOTER (Tailwind Native)
// ============================================================
export const getProductionFooterHtml = () => `
  <footer class="px-5 py-10 sm:px-6 bg-[#f2f7ff] text-slate-950 border-t border-slate-900/8">
    <div class="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.3fr_2fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <img src="/cs_logo.png" alt="CareerSense logo" class="h-10 w-auto object-contain" />
          <div class="leading-none">
            <div class="text-[20px] font-black tracking-tight text-slate-950">
              <span>Career</span><span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
            </div>
            <div class="mt-1 text-[9px] font-bold uppercase tracking-[0.34em] text-cyan-700/90">
              AI Career Copilot
            </div>
          </div>
        </div>
        <p class="mt-4 max-w-sm text-[13px] leading-6 text-slate-600">
          Your AI career copilot for readiness diagnostics, resumes, ATS checks,
          LinkedIn optimization, interview preparation, structured learning,
          certifications, and real professional-development opportunities.
        </p>
      </div>
      <div class="grid gap-8 sm:grid-cols-3">
        <div>
          <h4 class="text-[13px] font-extrabold text-slate-900">Career Tools</h4>
          <ul class="mt-3 space-y-2.5">
            <li><a href="https://resume.careersenseai.com/" class="text-xs text-slate-600 hover:text-slate-950">AI Resume Builder</a></li>
            <li><a href="https://ats.careersenseai.com/" class="text-xs text-slate-600 hover:text-slate-950">ATS Score Checker</a></li>
            <li><a href="https://coverletter.careersenseai.com/" class="text-xs text-slate-600 hover:text-slate-950">Cover Letter Builder</a></li>
            <li><a href="https://certifi.careersenseai.com/" class="text-xs text-slate-600 hover:text-slate-950">Skill Certification</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-[13px] font-extrabold text-slate-900">Programs</h4>
          <ul class="mt-3 space-y-2.5">
            <li><a href="/career-gps" class="text-xs text-slate-600 hover:text-slate-950">Career Score</a></li>
            <li><a href="/linkedin-optimizer" class="text-xs text-slate-600 hover:text-slate-950">LinkedIn</a></li>
            <li><a href="/fellowships/data-analyst" class="text-xs text-slate-600 hover:text-slate-950">Data Analyst Track</a></li>
            <li><a href="/partner-program" class="text-xs text-slate-600 hover:text-slate-950">Partner Program</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-[13px] font-extrabold text-slate-900">Platform</h4>
          <ul class="mt-3 space-y-2.5">
            <li><a href="/pricing" class="text-xs text-slate-600 hover:text-slate-950">Pricing &amp; Plans</a></li>
            <li><a href="/#faq" class="text-xs text-slate-600 hover:text-slate-950">Help &amp; FAQs</a></li>
            <li><a href="mailto:support@careersenseai.com" class="text-xs text-slate-600 hover:text-slate-950">Support</a></li>
          </ul>
        </div>
      </div>
      <div>
        <h4 class="text-[13px] font-extrabold text-slate-900">Enterprise &amp; Campus</h4>
        <p class="mt-3 text-xs leading-5 text-slate-600">
          Placement readiness dashboards, mock interview suites, and verifiable skill tracking for universities.
        </p>
        <a href="/partner-program" class="mt-3 inline-block text-xs font-bold text-cyan-600 hover:underline">Partner with us &rarr;</a>
      </div>
    </div>
    <div class="mx-auto mt-8 flex max-w-[1320px] flex-wrap items-center justify-between gap-4 border-t border-slate-900/8 pt-6 text-xs text-slate-500">
      <p>&copy; 2026 CareerSense. All rights reserved.</p>
      <p>Empowering job seekers worldwide with AI.</p>
    </div>
  </footer>`;

// ============================================================
// PAGE CONTENT GENERATOR
// Uses exact Tailwind classes from HeroSection.jsx & ToolsSection.jsx
// ============================================================
export const renderPage = (baseHtml, page) => {
  const canonical = `${siteUrl}${page.path === '/' ? '/' : page.path}`;
  const headInject = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CareerSense" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonical}" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <style>body{margin:0;background-color:#f8fafc;}</style>
    <script type="application/ld+json">${escapeJson(page.schema)}</script>`;

  let pageContent = '';

  if (page.path === '/') {
    // HOMEPAGE: EXACT TAILWIND CLONE OF HeroSection.jsx
    pageContent = `
      ${getProductionNavbarHtml()}
      <section id="home" class="relative overflow-visible border-b-8 border-transparent pb-24 pt-32 sm:pb-32 sm:pt-36 lg:pb-44 lg:pt-36 bg-[#eef6ff] text-slate-950">
        <img src="/Back-2-optimized.jpg" alt="" aria-hidden="true" fetchpriority="high" loading="eager" decoding="async" class="absolute inset-0 hidden h-full w-full object-cover object-center xl:block" />
        <div class="absolute inset-0 bg-[linear-gradient(145deg,rgba(242,248,255,0.92)_0%,rgba(227,240,255,0.84)_44%,rgba(214,234,255,0.74)_100%)] xl:bg-none"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(20,184,166,0.12),transparent_24%)] xl:bg-none"></div>
        <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(204,226,251,0.34)_100%)] xl:bg-none"></div>

        <div class="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <div class="relative z-10 grid items-center gap-5 xl:grid-cols-[1fr_1.1fr]">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] bg-white/80 text-blue-800 shadow-[0_14px_40px_rgba(148,163,184,0.22)]">
                <svg class="h-4 w-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                For Students, Freshers, and Professionals
              </div>

              <h1 class="mt-5 max-w-[12ch] text-[36px] font-bold leading-[1.08] tracking-tight sm:max-w-none sm:text-[44px] text-slate-950">
                Build a <span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Job-Ready Career Profile</span> With AI
              </h1>

              <p class="mt-5 max-w-full text-[15px] leading-7 sm:mt-6 xl:max-w-[80%] sm:text-[17px] sm:leading-relaxed text-slate-700">
                Create Professional Resumes, Generate Personalized Cover Letters,
                Check your ATS score, Practice Interviews, Validate Skills &amp;
                get Certifications &mdash; all in one Career Platform.
              </p>

              <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a href="/career-gps" class="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-8 text-[15px] font-semibold text-white shadow-[0_18px_36px_rgba(37,99,235,0.24)] transition hover:brightness-105 sm:w-auto">
                  Start Free Career Check
                </a>
                <a href="https://resume.careersenseai.com/" class="inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-8 text-[15px] font-semibold text-slate-900 border border-slate-200 transition hover:bg-slate-50 sm:w-auto">
                  Sample ATS Report
                </a>
              </div>

              <div class="mt-10 flex items-start gap-4 pt-6 sm:mt-12 sm:pt-8">
                <svg class="mt-1 h-6 w-6 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <p class="max-w-sm text-[14px] leading-relaxed text-slate-600">
                  Designed to help students, freshers and job seekers move from &ldquo;I want a better job&rdquo; to &ldquo;I am fully prepared to apply and interview.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Core AI Career Tools &amp; Ecosystem</h2>
          <p class="mt-2 text-sm text-slate-600 max-w-2xl">CareerSense unites every phase of job preparation into an integrated AI workflow:</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="https://resume.careersenseai.com/" class="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-md">
              <h3 class="text-base font-bold text-slate-900 group-hover:text-cyan-600">AI Resume Builder</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">Build ATS-friendly, professional resumes with 60+ job-tailored examples, role-based bullet suggestions, and 1-click PDF export.</p>
              <span class="mt-4 inline-block text-xs font-bold text-cyan-600">Open Builder &rarr;</span>
            </a>
            <a href="https://ats.careersenseai.com/" class="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-md">
              <h3 class="text-base font-bold text-slate-900 group-hover:text-cyan-600">ATS Resume Score Checker</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">Upload your resume and paste your target job description. Get instant match scores, keyword gap analysis, and ATS formatting audits.</p>
              <span class="mt-4 inline-block text-xs font-bold text-cyan-600">Check Score &rarr;</span>
            </a>
            <a href="https://coverletter.careersenseai.com/" class="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-md">
              <h3 class="text-base font-bold text-slate-900 group-hover:text-cyan-600">AI Cover Letter Builder</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">Craft tailored, boardroom-ready cover letters calibrated to any job description in seconds using advanced AI synthesis.</p>
              <span class="mt-4 inline-block text-xs font-bold text-cyan-600">Draft Letter &rarr;</span>
            </a>
            <a href="/career-gps" class="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-md">
              <h3 class="text-base font-bold text-slate-900 group-hover:text-cyan-600">Career GPS Diagnostic</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">Take a 5-minute employability assessment to uncover keyword gaps, quantify interview readiness, and receive a 3-step action roadmap.</p>
              <span class="mt-4 inline-block text-xs font-bold text-cyan-600">Start GPS &rarr;</span>
            </a>
            <a href="https://certifi.careersenseai.com/" class="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-md">
              <h3 class="text-base font-bold text-slate-900 group-hover:text-cyan-600">Verifiable Skill Certification</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-600">Validate your competencies through AI-proctored skill assessments and earn shareable, cryptographic certificate credentials.</p>
              <span class="mt-4 inline-block text-xs font-bold text-cyan-600">Get Certified &rarr;</span>
            </a>
          </div>
        </div>

        <div class="mt-8 rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Frequently Asked Questions</h2>
          <div class="mt-6 space-y-4">
            <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              <h3 class="text-sm font-bold text-slate-900">What is CareerSense?</h3>
              <p class="mt-1.5 text-xs leading-relaxed text-slate-600">CareerSense is an all-in-one AI career copilot that helps students, job seekers, and working professionals build ATS resumes, check job-description match scores, craft cover letters, practice interviews, and upskill with verifiable certifications.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              <h3 class="text-sm font-bold text-slate-900">Which AI career tools are available on CareerSense?</h3>
              <p class="mt-1.5 text-xs leading-relaxed text-slate-600">CareerSense provides the AI Resume Builder (resume.careersenseai.com), ATS Score Checker (ats.careersenseai.com), AI Cover Letter Builder (coverletter.careersenseai.com), Skill Certification (certifi.careersenseai.com), Career GPS, and LinkedIn Optimizer.</p>
            </div>
          </div>
        </div>
      </section>
      ${getProductionFooterHtml()}
    `;
  } else if (page.path === '/pricing') {
    // PRICING: Clean semantic fallback matching PricingPage without invasive styles
    pageContent = `
      ${getProductionNavbarHtml()}
      <main class="py-12 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Subscription Plans</h1>
          <p class="mt-2 text-sm text-slate-600">Choose a plan that matches your goals. Compare what each stage includes.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-wider text-slate-500">STAGE 1 &bull; EXPLORE</p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">FREE</h2>
              <p class="mt-1 text-xs text-slate-600">Start your career with essential AI tools.</p>
              <p class="mt-4 text-3xl font-black text-slate-950">&#8377;0 <span class="text-xs font-semibold text-slate-500">Forever Free</span></p>
              <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs font-bold text-amber-800">
                ⚡ 30,000 One-Time Tokens
              </div>
              <ul class="mt-5 space-y-2 text-xs text-slate-700">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> All AI Career Tools Active</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Public Career Profile</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Unlimited Free Downloads</li>
              </ul>
            </div>
            <a href="https://resume.careersenseai.com/" class="mt-6 flex h-11 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white transition hover:bg-slate-800">Get Started</a>
          </div>

          <div class="rounded-2xl border-2 border-cyan-500 bg-[#0c213e] text-white p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-black uppercase tracking-wider text-cyan-300">STAGE 2 &bull; BUILD YOUR CAREER</p>
                <span class="rounded-full bg-amber-400 px-2.5 py-0.5 text-[9px] font-black uppercase text-slate-950">MOST POPULAR</span>
              </div>
              <h2 class="mt-2 text-2xl font-black text-white">STUDENT</h2>
              <p class="mt-1 text-xs text-slate-300">Build skills and projects that stand out.</p>
              <p class="mt-4 text-3xl font-black text-white">&#8377;250 <span class="text-xs font-semibold text-slate-400">/ month</span></p>
              <div class="mt-4 rounded-xl border border-amber-300/30 bg-amber-400/15 p-3 text-xs font-bold text-amber-300">
                ⚡ 100,000 Tokens / Month
              </div>
              <ul class="mt-5 space-y-2 text-xs text-slate-200">
                <li class="flex items-center gap-2"><span class="text-cyan-400 font-bold">&#10003;</span> Everything in Free</li>
                <li class="flex items-center gap-2"><span class="text-cyan-400 font-bold">&#10003;</span> 100,000 Tokens / Month</li>
                <li class="flex items-center gap-2"><span class="text-cyan-400 font-bold">&#10003;</span> Unlimited Free Downloads</li>
              </ul>
            </div>
            <a href="https://resume.careersenseai.com/" class="mt-6 flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-xs font-black text-slate-950 transition hover:brightness-105">Upgrade to Student</a>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-wider text-slate-500">STAGE 3 &bull; BUILD REAL THINGS</p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">INTERN</h2>
              <p class="mt-1 text-xs text-slate-600">Gain real-project fellowship mentorship.</p>
              <p class="mt-4 text-3xl font-black text-slate-950">&#8377;2,000 <span class="text-xs font-semibold text-slate-500">/ 3-month internship</span></p>
              <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs font-bold text-amber-800">
                ⚡ 500,000 Tokens / Month
              </div>
              <ul class="mt-5 space-y-2 text-xs text-slate-700">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Unlimited Free Downloads</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Hands-on Real Projects &amp; Mentorship</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Official Offer Letter</li>
              </ul>
            </div>
            <a href="https://resume.careersenseai.com/" class="mt-6 flex h-11 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white transition hover:bg-slate-800">Join Fellowship</a>
          </div>

          <div class="rounded-2xl border border-amber-300 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p class="text-[10px] font-black uppercase tracking-wider text-amber-700">STAGE 4 &bull; HELP BUILD CAREERSENSE</p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">PARTNER</h2>
              <p class="mt-1 text-xs text-slate-600">Help build CareerSense and make an impact.</p>
              <p class="mt-4 text-3xl font-black text-slate-950">&#8377;2,499 <span class="text-xs font-semibold text-slate-500">/ month</span></p>
              <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs font-bold text-amber-800">
                ⚡ 1,000,000 Tokens / Month
              </div>
              <ul class="mt-5 space-y-2 text-xs text-slate-700">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Unlimited Free Downloads</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Partner Workspace &amp; 20 Assignments</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">&#10003;</span> Official Partner ID &amp; Offer Letter</li>
              </ul>
            </div>
            <a href="/partner-program" class="mt-6 flex h-11 items-center justify-center rounded-xl bg-amber-500 text-xs font-bold text-white transition hover:bg-amber-600">Apply as Partner</a>
          </div>
        </div>
      </main>
      ${getProductionFooterHtml()}
    `;
  } else if (page.path === '/career-gps') {
    // CAREER GPS (Light Theme - NO BREADCRUMBS)
    pageContent = `
      ${getProductionNavbarHtml()}
      <section class="py-16 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] bg-white text-blue-800 border border-slate-200 shadow-sm">
          <svg class="h-4 w-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z"/></svg>
          Career GPS Diagnostic
        </div>
        <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Map your exact route to <span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Career Readiness</span>
        </h1>
        <p class="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Career GPS diagnoses your job-readiness across 5 essential phases &mdash; from your resume and ATS score to interview readiness. Get a personalized 3-step action plan for your profile.
        </p>
        <div class="mt-6">
          <a href="https://resume.careersenseai.com/" class="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 text-xs font-bold text-white shadow-sm transition hover:brightness-105">Start 5-Minute Diagnostic</a>
        </div>

        <div class="mt-12 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-xl font-bold tracking-tight text-slate-950">The 4 Professional Career Archetypes</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-cyan-700">The Fresh Grad (0&ndash;2 Yrs)</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Proving practical skills early, building targeted project resumes, and gaining verified credentials.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-teal-700">The Career Switcher</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Translating past experience into the target domain's vocabulary with transferable skill resumes.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-indigo-700">The Climber</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Leveling up strategically with quantified business achievements and executive interview preparation.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-amber-700">The Returner</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Reclaiming professional identity after a career break with current domain mastery and recent certifications.</p>
            </div>
          </div>
        </div>
      </section>
      ${getProductionFooterHtml()}
    `;
  } else if (page.path === '/linkedin-optimizer') {
    // LINKEDIN OPTIMIZER (Light Theme - NO BREADCRUMBS)
    pageContent = `
      ${getProductionNavbarHtml()}
      <section class="py-16 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] bg-white text-blue-800 border border-slate-200 shadow-sm">
          <svg class="h-4 w-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
          Recruiter Algorithm Calibration
        </div>
        <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          AI LinkedIn Profile Optimizer &amp; <span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Recruiter Search Match</span>
        </h1>
        <p class="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Calibrate your LinkedIn headline, summary, and experience to recruiter search algorithms. Rank higher in talent searches and attract incoming interview requests.
        </p>
        <div class="mt-6 flex items-center gap-3">
          <a href="https://resume.careersenseai.com/" class="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 text-xs font-bold text-white shadow-sm transition hover:brightness-105">Optimize LinkedIn Profile</a>
          <a href="/pricing" class="inline-flex h-11 items-center justify-center rounded-xl bg-white border border-slate-200 px-6 text-xs font-bold text-slate-800 transition hover:bg-slate-50">View Plans</a>
        </div>

        <div class="mt-12 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-xl font-bold tracking-tight text-slate-950">Core Optimization Features</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Headline Generator</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Generates keyword-rich, authoritative headlines that catch recruiters' eyes in search results.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Storytelling About Section</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Crafts a compelling career narrative that showcases your passion, achievements, and unique value proposition.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Metric-Backed Bullets</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Transforms daily duties into quantified, high-impact statements that prove business value.</p>
            </div>
          </div>
        </div>
      </section>
      ${getProductionFooterHtml()}
    `;
  } else if (page.path === '/fellowships/data-analyst') {
    // FELLOWSHIP (Light Theme - NO BREADCRUMBS)
    pageContent = `
      ${getProductionNavbarHtml()}
      <section class="py-16 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] bg-white text-blue-800 border border-slate-200 shadow-sm">
          <svg class="h-4 w-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          12-Week Immersive Fellowship
        </div>
        <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          CareerSense <span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Data Analyst Fellowship</span>
        </h1>
        <p class="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          A comprehensive, project-driven fellowship designed to take you from fundamentals to job-ready data analyst with production-grade portfolio projects and mentorship.
        </p>
        <div class="mt-6 flex items-center gap-3">
          <a href="/pricing" class="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 text-xs font-bold text-white shadow-sm transition hover:brightness-105">Apply for Fellowship</a>
        </div>

        <div class="mt-12 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-xl font-bold tracking-tight text-slate-950">Curriculum &amp; Learning Modules</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Module 1: SQL &amp; Relational Databases</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Master relational queries, multi-table joins, subqueries, CTEs, and window functions using PostgreSQL.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Module 2: Python Data Wrangling</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Clean, transform, and analyze datasets with Pandas, NumPy, and perform exploratory data analysis (EDA).</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Module 3: BI &amp; Interactive Dashboards</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Build executive dashboards in Power BI and Tableau. Define KPIs, cohort metrics, and DAX calculations.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Module 4: Commercial Capstone</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Synthesize sales and marketing data into an end-to-end analytical report and executive slide presentation.</p>
            </div>
          </div>
        </div>
      </section>
      ${getProductionFooterHtml()}
    `;
  } else {
    // PARTNER PROGRAM (Light Theme - NO BREADCRUMBS)
    pageContent = `
      ${getProductionNavbarHtml()}
      <section class="py-16 px-5 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] bg-white text-blue-800 border border-slate-200 shadow-sm">
          <svg class="h-4 w-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Campus &amp; Community Leadership
        </div>
        <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          CareerSense <span class="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Partner Program</span>
        </h1>
        <p class="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Join the CareerSense Partner Program. Represent CareerSense at your college or community, lead career workshops, earn rewards, and receive founder mentorship.
        </p>
        <div class="mt-6 flex items-center gap-3">
          <a href="/pricing" class="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 text-xs font-bold text-white shadow-sm transition hover:brightness-105">Join Partner Program</a>
        </div>

        <div class="mt-12 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 class="text-xl font-bold tracking-tight text-slate-950">Partner Responsibilities &amp; Impact</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Lead Campus Workshops</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Organize resume review and ATS score audit workshops to empower peers with AI career tools.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Founder Mentorship</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Participate in weekly calls with CareerSense founders, reviewing growth strategies and product roadmaps.</p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 class="text-sm font-bold text-slate-900">Official Recognition</h3>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">Receive an official Partner ID, Letter of Recommendation, verified certificate, and performance stipends.</p>
            </div>
          </div>
        </div>
      </section>
      ${getProductionFooterHtml()}
    `;
  }

  let processed = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta name="description"[\s\S]*?>/i, '')
    .replace(/<meta name="keywords"[\s\S]*?>/i, '')
    .replace(/<meta name="robots"[\s\S]*?>/i, '')
    .replace(/<link rel="canonical"[\s\S]*?>/i, '')
    .replace(/<meta property="og:[\s\S]*?>/gi, '')
    .replace(/<meta name="twitter:[\s\S]*?>/gi, '')
    .replace(/<meta property="twitter:[\s\S]*?>/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
    .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  processed = processed.replace('</head>', `${headInject}\n  </head>`);

  // Inject full styled pre-rendered HTML directly inside <div id="root">
  processed = processed.replace(
    /<div id="root">[\s\S]*?<\/div>(?=\s*<script|\s*<\/body>)/i,
    `<div id="root">${pageContent}</div>`
  );

  return processed;
};
