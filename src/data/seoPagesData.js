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
    body: `
      <span class="badge">Unified AI Career Ecosystem</span>
      <h1>CareerSense — All-in-One AI Career Acceleration Platform</h1>
      <p>CareerSense is your AI career copilot for job readiness diagnostics, ATS-optimized resumes, cover letter generation, interview preparation, verifiable skill certifications, and professional fellowship programs.</p>

      <h2>Core CareerSense AI Tools &amp; Ecosystem</h2>
      <div class="card">
        <h3><a href="https://resume.careersenseai.com/">AI Resume Builder</a></h3>
        <p>Build ATS-friendly, professional resumes with 60+ job-tailored examples, role-based bullet suggestions, executive formatting, and 1-click PDF export.</p>
      </div>

      <div class="card">
        <h3><a href="https://ats.careersenseai.com/">ATS Resume Score Checker</a></h3>
        <p>Upload your resume and paste your target job description. Get instant match scores, keyword gap analysis, and ATS formatting audits.</p>
      </div>

      <div class="card">
        <h3><a href="https://coverletter.careersenseai.com/">AI Cover Letter Builder</a></h3>
        <p>Craft tailored, boardroom-ready cover letters calibrated to any job description in seconds using advanced AI synthesis.</p>
      </div>

      <div class="card">
        <h3><a href="https://certifi.careersenseai.com/">Verifiable Skill Certification</a></h3>
        <p>Validate your competencies through AI-proctored skill assessments and earn shareable, cryptographic certificate credentials.</p>
      </div>

      <h2>Specialized Career Readiness Programs</h2>
      <ul>
        <li><a href="/career-gps"><strong>Career GPS:</strong></a> Comprehensive multi-dimensional assessment diagnosing resume strength, ATS score, JD match, and interview readiness.</li>
        <li><a href="/pricing"><strong>Pricing &amp; Plans:</strong></a> Flexible subscription tiers and AI token top-up packages for students, job seekers, and fellows.</li>
        <li><a href="/linkedin-optimizer"><strong>LinkedIn Optimizer:</strong></a> Calibrate your LinkedIn headline, summary, and experience to recruiter search algorithms.</li>
        <li><a href="/fellowships/data-analyst"><strong>Data Analyst &amp; Tech Fellowships:</strong></a> Practical, mentor-backed fellowship tracks preparing candidates for high-demand tech roles.</li>
        <li><a href="/partner-program"><strong>Partner Program &amp; Campus Solutions:</strong></a> Placement readiness dashboards, student progress tracking, and scaled mock interview suites for universities and training institutes.</li>
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
      </div>`,
  },
  {
    path: '/career-gps',
    title: 'Career GPS — AI Career Readiness & Direction Diagnostic | CareerSense',
    description: 'Diagnose your career stage, pinpoint your biggest job search blocker, and get a personalized career roadmap with CareerSense Career GPS.',
    keywords: 'career GPS, career readiness assessment, career diagnostic, job search roadmap, archetype discovery, CareerSense',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'Career GPS — AI Career Readiness Diagnostic',
          description: 'Diagnose your career stage, pinpoint your biggest job search blocker, and get a personalized career roadmap with CareerSense Career GPS.',
          url: `${siteUrl}/career-gps`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Career GPS', item: `${siteUrl}/career-gps` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Career GPS?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Career GPS is an intelligent career diagnostic tool that identifies your current career stage, detects critical friction points in your job search, and outputs a custom action plan.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does the Career GPS assessment take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Career GPS diagnostic takes less than 5 minutes to complete and provides instant visual scoring and actionable recommendations.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is Career GPS free to take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, Career GPS is completely free to take for all registered CareerSense users.',
              },
            },
          ],
        },
      ],
    },
    body: `
      <nav><a href="/">Home</a> / Career GPS</nav>
      <span class="badge">Career Readiness Diagnostics</span>
      <h1>Career GPS — Intelligent Career Readiness &amp; Direction Diagnostic</h1>
      <p>Career GPS diagnoses your current professional standing, identifies the root blocker holding back your job applications, and generates an actionable, step-by-step career acceleration roadmap.</p>

      <h2>The 4 Professional Career Archetypes</h2>
      <div class="card">
        <h3>The Fresh Grad (0–2 Years Experience)</h3>
        <p><strong>Goal:</strong> Building from the ground up. Employers love potential, but fresh grads often face strict ATS keyword filters. Your priority is proving practical skills early, building targeted project resumes, and gaining verified credentials.</p>
      </div>

      <div class="card">
        <h3>The Career Switcher</h3>
        <p><strong>Goal:</strong> Writing a new professional story. Your core challenge is translating past experience into the target domain's vocabulary. A tailored resume with transferable skills and verified credentials is your fastest path forward.</p>
      </div>

      <div class="card">
        <h3>The Climber</h3>
        <p><strong>Goal:</strong> Leveling up strategically. You already have solid domain experience — now positioning is everything. Quantified business achievements, leadership narratives, and advanced mock interview preparation will separate you from competing applicants.</p>
      </div>

      <div class="card">
        <h3>The Returner</h3>
        <p><strong>Goal:</strong> Reclaiming your professional identity after a career break. Employers recognize career pauses; your goal is demonstrating current domain mastery through recent certifications, an updated resume, and confident interview storytelling.</p>
      </div>

      <h2>What Career GPS Measures</h2>
      <ul>
        <li><strong>ATS Keyword Match:</strong> Evaluates how well your resume aligns with automated hiring filters and ATS algorithms.</li>
        <li><strong>Technical Skill Proof:</strong> Pinpoints whether you have verifiable certifications and hands-on portfolio projects for target roles.</li>
        <li><strong>Interview Readiness:</strong> Assesses your confidence and structure in behavioral and technical interview questions.</li>
        <li><strong>Role Clarity &amp; Targeting:</strong> Ensures your applications focus on the exact job titles matching your profile.</li>
      </ul>

      <h2>Recommended Next Steps</h2>
      <ul>
        <li><a href="https://resume.careersenseai.com/">Create an ATS-compliant resume with CareerSense Resume Builder</a></li>
        <li><a href="https://ats.careersenseai.com/">Check your resume against target Job Descriptions on ATS Checker</a></li>
        <li><a href="https://coverletter.careersenseai.com/">Draft a tailored executive cover letter</a></li>
        <li><a href="https://certifi.careersenseai.com/">Earn verifiable skill certificates on Certifi</a></li>
        <li><a href="/pricing">View CareerSense plans and token packages</a></li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>What is Career GPS?</h3>
        <p>Career GPS is an intelligent career diagnostic tool that identifies your current career stage, detects critical friction points in your job search, and outputs a custom action plan.</p>
      </div>
      <div class="faq-item">
        <h3>How long does the Career GPS assessment take?</h3>
        <p>The Career GPS diagnostic takes less than 5 minutes to complete and provides instant visual scoring and actionable recommendations.</p>
      </div>
      <div class="faq-item">
        <h3>Is Career GPS free to take?</h3>
        <p>Yes, Career GPS is completely free to take for all registered CareerSense users.</p>
      </div>`,
  },
  {
    path: '/pricing',
    title: 'Pricing Plans & AI Token Packages | CareerSense',
    description: 'Transparent pricing for students, job seekers, and fellows. Explore CareerSense Free, Student, Intern Fellowship, and Partner plans with AI token allowances.',
    keywords: 'CareerSense pricing, AI career tokens, resume builder subscription, fellowship pricing, student career plans',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'CareerSense Pricing & Membership Plans',
          description: 'Transparent pricing for students, job seekers, and fellows. Explore CareerSense Free, Student, Intern Fellowship, and Partner plans with AI token allowances.',
          url: `${siteUrl}/pricing`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${siteUrl}/pricing` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Which CareerSense plan is right for me?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Choose Free to explore core tools, Student for monthly resume tailoring and job applications, Intern for the 3-month mentor-led fellowship, or Partner for enterprise token allowances and campus collaboration.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are AI tokens and where can I use them?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI tokens power AI-assisted features across CareerSense, including resume generation, ATS scans, cover letter synthesis, and mock interviews.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I buy additional tokens without upgrading my subscription?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! CareerSense offers a 50,000 AI Token Top-Up add-on for ₹199 that can be purchased anytime without changing your current plan.',
              },
            },
          ],
        },
      ],
    },
    body: `
      <nav><a href="/">Home</a> / Pricing</nav>
      <span class="badge">Flexible Plans &amp; AI Tokens</span>
      <h1>CareerSense Pricing &amp; Membership Plans</h1>
      <p>Choose the right plan to power your career transition, resume optimization, and interview preparation. Every plan includes access to our AI career copilot tools.</p>

      <h2>Subscription &amp; Fellowship Tiers</h2>
      <div class="card">
        <h3>Free Plan — ₹0</h3>
        <p><strong>Best for:</strong> Getting started and exploring the CareerSense platform.</p>
        <ul>
          <li>30,000 one-time AI tokens upon signup</li>
          <li>Access to AI Resume Builder, ATS Score Checker &amp; Cover Letter Builder</li>
          <li>Interview Simulator practice sessions</li>
          <li>PDF &amp; report downloads at ₹1 per pass</li>
        </ul>
      </div>

      <div class="card">
        <h3>Student Plan — ₹499 / month</h3>
        <p><strong>Best for:</strong> Active job seekers and college students submitting regular applications.</p>
        <ul>
          <li>100,000 AI tokens refreshed monthly</li>
          <li>Priority AI processing execution</li>
          <li>Unlimited PDF resume downloads and diagnostic reports</li>
          <li>Full access to all CareerSense tools and role templates</li>
        </ul>
      </div>

      <div class="card">
        <h3>Intern Fellowship Plan — ₹4,999 (3-Month Program)</h3>
        <p><strong>Best for:</strong> Aspiring data analysts and engineers seeking hands-on project experience and mentorship.</p>
        <ul>
          <li>500,000 AI tokens per month for 3 consecutive months</li>
          <li>Full access to selected fellowship track (e.g. Data Analyst)</li>
          <li>Real-world industry capstone projects with mentor reviews</li>
          <li>Official CareerSense Intern ID card &amp; verified offer letter</li>
          <li>Priority AI processing execution</li>
        </ul>
      </div>

      <div class="card">
        <h3>Partner Program — Monthly / 6-Month Options</h3>
        <p><strong>Best for:</strong> Campus ambassadors, university leaders, and training partners.</p>
        <ul>
          <li>1,000,000 AI tokens per month</li>
          <li>Dedicated Partner Workspace with 20 real business assignments</li>
          <li>Weekly live founder mentorship calls and strategy sessions</li>
          <li>Official Certificate of Partnership and verified LinkedIn badge</li>
        </ul>
      </div>

      <h2>One-Time AI Token Top-Up</h2>
      <div class="card">
        <h3>50,000 Token Add-On — ₹199</h3>
        <p>Running low on tokens mid-application? Purchase a one-time 50,000 token top-up without altering your existing subscription tier.</p>
      </div>

      <h2>Frequently Asked Questions About Pricing</h2>
      <div class="faq-item">
        <h3>Which CareerSense plan is right for me?</h3>
        <p>Choose Free to explore core tools, Student for monthly resume tailoring and job applications, Intern for the 3-month mentor-led fellowship, or Partner for enterprise token allowances and campus collaboration.</p>
      </div>
      <div class="faq-item">
        <h3>What are AI tokens and where can I use them?</h3>
        <p>AI tokens power AI-assisted features across CareerSense, including resume generation, ATS scans, cover letter synthesis, and mock interviews.</p>
      </div>
      <div class="faq-item">
        <h3>Can I buy additional tokens without upgrading my subscription?</h3>
        <p>Yes! CareerSense offers a 50,000 AI Token Top-Up add-on for ₹199 that can be purchased anytime without changing your current plan.</p>
      </div>
      <div class="faq-item">
        <h3>How are payments processed?</h3>
        <p>All payments are securely processed through Razorpay with instant account activation, supporting UPI, credit cards, debit cards, and net banking.</p>
      </div>`,
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
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'LinkedIn Optimizer', item: `${siteUrl}/linkedin-optimizer` },
          ],
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
                text: 'Yes! It generates multiple headline variations, craft storytelling summary paragraphs, and suggests metric-backed achievement bullet points.',
              },
            },
          ],
        },
      ],
    },
    body: `
      <nav><a href="/">Home</a> / LinkedIn Optimizer</nav>
      <span class="badge">Recruiter Algorithm Calibration</span>
      <h1>LinkedIn Profile Optimizer &amp; Recruiter Algorithm Match</h1>
      <p>Calibrate your LinkedIn headline, summary, and experience to recruiter search algorithms. Rank higher in talent searches and attract incoming interview requests.</p>

      <h2>Core Optimization Features</h2>
      <div class="card">
        <h3>Headline Calibration</h3>
        <p>Over 70% of recruiter search clicks happen based on the headline alone. CareerSense generates punchy, keyword-dense headlines highlighting your exact role, core skills, and quantifiable value proposition.</p>
      </div>

      <div class="card">
        <h3>Story-Driven About Section</h3>
        <p>Turn a generic summary into a compelling narrative that showcases your career journey, core technical competencies, notable achievements, and clear contact information for recruiters.</p>
      </div>

      <div class="card">
        <h3>Metric-Backed Experience Bullets</h3>
        <p>Transform passive job descriptions into action-oriented achievement bullets with metrics, percentages, and domain keywords that stand out in recruiter reviews.</p>
      </div>

      <div class="card">
        <h3>Recruiter Discoverability Score</h3>
        <p>Instant scoring ring grading your profile across completeness, keyword coverage, and role relevance against top candidates in your target domain.</p>
      </div>

      <h2>How It Works in 3 Steps</h2>
      <ol>
        <li><strong>Enter Target Role &amp; Industry:</strong> Specify the exact career path you are targeting (e.g. Data Analyst, Software Engineer, Product Manager).</li>
        <li><strong>Paste Profile Sections:</strong> Paste your current LinkedIn headline, summary, or experience text for instant analysis.</li>
        <li><strong>Copy AI-Optimized Revisions:</strong> Review actionable suggestions, copy calibrated revisions with 1 click, and paste them directly into your LinkedIn profile.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>How does LinkedIn profile optimization help job seekers?</h3>
        <p>Recruiters search LinkedIn using strict role-specific keywords. The CareerSense LinkedIn Optimizer aligns your headline, summary, and experience with high-intent recruiter search filters.</p>
      </div>
      <div class="faq-item">
        <h3>Does the optimizer write my headline and about section?</h3>
        <p>Yes! It generates multiple headline variations, craft storytelling summary paragraphs, and suggests metric-backed achievement bullet points.</p>
      </div>`,
  },
  {
    path: '/fellowships/data-analyst',
    title: 'Data Analyst Fellowship Program — Real Projects & Mentorship | CareerSense',
    description: 'Launch your data analyst career with the CareerSense 12-week fellowship. Build real-world portfolio projects, master SQL, Python, Excel, Power BI, and receive 1-on-1 mentorship.',
    keywords: 'data analyst fellowship, data analysis internship, learn SQL, Power BI project, data analytics portfolio, CareerSense fellowship',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Course',
          name: 'CareerSense Data Analyst Fellowship Program',
          description: 'Launch your data analyst career with the CareerSense 12-week fellowship. Build real-world portfolio projects, master SQL, Python, Excel, Power BI, and receive 1-on-1 mentorship.',
          provider: {
            '@type': 'Organization',
            name: 'CareerSense',
            url: siteUrl,
          },
          url: `${siteUrl}/fellowships/data-analyst`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Pricing & Fellowships', item: `${siteUrl}/pricing` },
            { '@type': 'ListItem', position: 3, name: 'Data Analyst Fellowship', item: `${siteUrl}/fellowships/data-analyst` },
          ],
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
              name: 'What tools and technologies are covered?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The curriculum covers SQL, PostgreSQL, Python (Pandas, NumPy, Matplotlib, Seaborn), Advanced Excel, and Power BI/Tableau interactive dashboards.',
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
    body: `
      <nav><a href="/">Home</a> / <a href="/pricing">Fellowships</a> / Data Analyst</nav>
      <span class="badge">12-Week Immersive Fellowship</span>
      <h1>CareerSense Data Analyst Fellowship Program</h1>
      <p>A comprehensive, project-driven fellowship designed to take you from fundamentals to job-ready data analyst with production-grade portfolio projects and mentorship.</p>

      <h2>Fellowship Curriculum &amp; Learning Modules</h2>
      <div class="card">
        <h3>Module 1: Data Collection &amp; SQL Querying</h3>
        <p>Master relational database architecture, complex multi-table joins, subqueries, CTEs, window functions, and database design using PostgreSQL.</p>
      </div>

      <div class="card">
        <h3>Module 2: Python Data Wrangling &amp; Exploratory Analysis</h3>
        <p>Clean, transform, and analyze messy datasets using Python, Pandas, and NumPy. Perform exploratory data analysis (EDA) to uncover actionable business patterns.</p>
      </div>

      <div class="card">
        <h3>Module 3: Advanced Business Intelligence &amp; Dashboards</h3>
        <p>Build executive-ready interactive dashboards in Microsoft Power BI and Tableau. Define key performance indicators (KPIs), DAX calculations, and cohort metrics.</p>
      </div>

      <div class="card">
        <h3>Module 4: End-to-End Commercial Capstone Project</h3>
        <p>Synthesize raw sales, churn, and marketing data into an end-to-end analytical report and executive slide presentation for hiring managers.</p>
      </div>

      <h2>What Is Included in the Fellowship</h2>
      <ul>
        <li>500,000 monthly AI tokens for deep technical and resume practice.</li>
        <li>Official CareerSense Intern ID and verifiable digital offer letter.</li>
        <li>Weekly live mentorship sessions, project feedback, and code reviews.</li>
        <li>Personalized resume review and mock behavioral &amp; technical interviews.</li>
        <li>Verifiable completion certificate shareable directly to LinkedIn.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>Who is eligible for the Data Analyst Fellowship?</h3>
        <p>The fellowship is open to fresh graduates, college students, career switchers, and professionals aiming to break into data analysis and business intelligence roles.</p>
      </div>
      <div class="faq-item">
        <h3>What tools and technologies are covered?</h3>
        <p>The curriculum covers SQL, PostgreSQL, Python (Pandas, NumPy, Matplotlib, Seaborn), Advanced Excel, and Power BI/Tableau interactive dashboards.</p>
      </div>
      <div class="faq-item">
        <h3>Do fellows receive an official certificate and offer letter?</h3>
        <p>Yes! All fellows receive an official CareerSense Intern ID card, a verified offer letter, and a verifiable completion certificate.</p>
      </div>`,
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
          name: 'CareerSense Partner & Campus Ambassador Program',
          description: 'Join the CareerSense Partner Program. Represent CareerSense at your college or community, lead career workshops, earn rewards, and receive founder mentorship.',
          url: `${siteUrl}/partner-program`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Partner Program', item: `${siteUrl}/partner-program` },
          ],
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
    body: `
      <nav><a href="/">Home</a> / Partner Program</nav>
      <span class="badge">Campus Leadership &amp; Impact</span>
      <h1>CareerSense Partner &amp; Campus Ambassador Program</h1>
      <p>Empower students and job seekers in your campus community while building leadership experience, expanding your professional network, and earning founder mentorship.</p>

      <h2>What You Get as a CareerSense Partner</h2>
      <div class="card">
        <h3>Weekly Founder Mentorship</h3>
        <p>Participate in direct weekly strategy calls with CareerSense founders, discussing product growth, startup operations, and personal career strategy.</p>
      </div>

      <div class="card">
        <h3>Exclusive Partner Workspace</h3>
        <p>Access 20 structured, practical growth assignments designed to build real-world marketing, analytics, and leadership capabilities.</p>
      </div>

      <div class="card">
        <h3>1,000,000 Monthly AI Tokens</h3>
        <p>Enjoy our highest monthly token allowance to use across all CareerSense career acceleration tools for yourself and your peers.</p>
      </div>

      <div class="card">
        <h3>Official Credentials &amp; Recognition</h3>
        <p>Earn an official CareerSense Partner ID, Letter of Recommendation, verified certificate of partnership, and performance-based rewards.</p>
      </div>

      <h2>Partner Responsibilities &amp; Community Impact</h2>
      <ul>
        <li>Organize resume review and ATS score audit workshops on campus.</li>
        <li>Introduce students to AI-powered career tools, interview prep, and verifiable skill certification.</li>
        <li>Collect user feedback from job seekers to inform future platform updates.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>Who can apply to the CareerSense Partner Program?</h3>
        <p>College students, placement coordinators, student club leaders, and community organizers passionate about career acceleration and helping peers land jobs.</p>
      </div>
      <div class="faq-item">
        <h3>What are the main benefits for Partners?</h3>
        <p>Direct weekly mentorship with the CareerSense founders, 1,000,000 monthly AI tokens, 20 real business assignments, an official Partner ID, Letter of Recommendation, and performance rewards.</p>
      </div>`,
  },
];

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
    <style>@keyframes cs-spin{to{transform:rotate(360deg)}}body{margin:0;background-color:#f8fafc;}</style>
    <script type="application/ld+json">${escapeJson(page.schema)}</script>`;

  const prerenderNoscript = `
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
      .cs-seo-fallback h1 { font-size: 30px; font-weight: 700; color: #071426; margin-bottom: 16px; }
      .cs-seo-fallback h2 { font-size: 22px; font-weight: 600; color: #0284c7; margin-top: 28px; margin-bottom: 12px; }
      .cs-seo-fallback h3 { font-size: 17px; font-weight: 600; color: #071426; margin-top: 18px; margin-bottom: 6px; }
      .cs-seo-fallback p { color: #475569; margin-bottom: 16px; font-size: 16px; }
      .cs-seo-fallback a { color: #0284c7; font-weight: 600; text-decoration: underline; }
      .cs-seo-fallback ul, .cs-seo-fallback ol { padding-left: 22px; margin-bottom: 20px; }
      .cs-seo-fallback li { margin-bottom: 8px; color: #334155; }
      .cs-seo-fallback .badge { display: inline-block; background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
      .cs-seo-fallback .card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 14px; background: #F8FAFC; }
      .cs-seo-fallback .faq-item { border-bottom: 1px solid #E2E8F0; padding-bottom: 14px; margin-bottom: 14px; }
      .cs-seo-fallback nav { margin-bottom: 20px; font-size: 14px; color: #64748B; }
      .cs-seo-fallback nav a { color: #0284c7; text-decoration: none; }
    </style>
    <div class="cs-seo-fallback">
      ${page.body}
    </div>
  </noscript>`;

  let processed = baseHtml
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

  if (processed.includes('<noscript>')) {
    processed = processed.replace(/<noscript>[\s\S]*?<\/noscript>/i, prerenderNoscript);
  } else if (processed.includes('</div>')) {
    processed = processed.replace(/(<div id="root">[\s\S]*?<\/div>)/i, `$1\n${prerenderNoscript}`);
  }

  return processed;
};
