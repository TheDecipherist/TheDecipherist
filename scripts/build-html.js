#!/usr/bin/env node
/**
 * build-html.js
 * Rebuilds the three dynamic sections of docs/index.html:
 *   - GitHub repos  (fetched live from GitHub API, sorted by stars)
 *   - Articles      (from articles.config.json in the website project)
 *   - Projects      (from scripts/projects.config.json)
 *
 * Usage: node scripts/build-html.js
 * Env:   GITHUB_TOKEN  optional — increases GitHub API limit to 5000 req/hr
 */

'use strict';

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const ROOT            = path.resolve(__dirname, '..');
const INDEX_HTML      = path.join(ROOT, 'docs', 'index.html');
const PROJECTS_CONFIG = path.join(__dirname, 'projects.config.json');
const ARTICLES_CONFIG = path.join(ROOT, '..', 'theDecipherist_website', 'adminTools', 'articles.config.json');
const GITHUB_API      = 'https://api.github.com/users/TheDecipherist/repos?per_page=100&sort=stars';
const SKIP_REPOS      = new Set(['TheDecipherist']);

// ─── Utilities ───────────────────────────────────────────────────────────────

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        'User-Agent': 'TheDecipherist-build-html/1.0',
        Accept: 'application/vnd.github.v3+json',
        ...headers,
      },
    };
    https.get(url, opts, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(httpsGet(res.headers.location, headers));
      }
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch (e) { reject(new Error(`JSON parse error (${res.statusCode}): ${raw.slice(0, 200)}`)); }
      });
    }).on('error', reject);
  });
}

function inject(html, marker, content) {
  const start = `<!-- BUILD:${marker}:START -->`;
  const end   = `<!-- BUILD:${marker}:END -->`;
  const si    = html.indexOf(start);
  const ei    = html.indexOf(end);
  if (si === -1 || ei === -1) {
    throw new Error(
      `BUILD marker not found: <!-- BUILD:${marker}:START/END -->\n` +
      `Re-add the markers to docs/index.html or restore from git.`
    );
  }
  return html.slice(0, si + start.length) + '\n' + content + '\n      ' + html.slice(ei);
}

function formatDate(iso) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(iso + 'T00:00:00Z');
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function slugId(id) {
  return id.replace(/_/g, '-').toLowerCase();
}

function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max);
}

// ─── Articles ─────────────────────────────────────────────────────────────────

const CATEGORY_TAG = {
  AI:            { text: 'AI',       cls: 'article-card__category-tag' },
  DevOps:        { text: 'DevOps',   cls: 'article-card__category-tag article-card__category-tag--devops' },
  Security:      { text: 'Security', cls: 'article-card__category-tag article-card__category-tag--security' },
  Cryptanalysis: { text: 'Crypto',   cls: 'article-card__category-tag article-card__category-tag--security' },
};

const HOMEPAGE_GROUPS = [
  { label: 'AI',                  categories: ['AI'] },
  { label: 'Infrastructure',      categories: ['DevOps', 'Security'] },
  { label: 'Crime &amp; Mystery', categories: ['Cryptanalysis'] },
];

function articleCardHTML(a) {
  const tag     = CATEGORY_TAG[a.category] || { text: a.category, cls: 'article-card__category-tag' };
  const id      = slugId(a.id);
  const excerpt = truncate(a.description.replace(/ —/g, ','), 160);
  const title = truncate(a.title.replace(/ —/g, ','), 160);

  return `        <li>
          <a href="${a.url}" class="article-card" aria-labelledby="ac-${id}-title">
            <div class="article-card__image">
              <img src="${a.bannerImage}" alt="" loading="lazy" decoding="async">
            </div>
            <div class="article-card__body">
              <div class="article-card__top">
                <span class="${tag.cls}">${tag.text}</span>
                <time datetime="${a.datePublished}" class="article-card__date">${formatDate(a.datePublished)}</time>
              </div>
              <h4 id="ac-${id}-title" class="article-card__title">${title}</h4>
              <p class="article-card__excerpt">${excerpt}</p>
              <footer class="article-card__footer"><span class="article-card__read-more">Read article →</span></footer>
            </div>
          </a>
        </li>`;
}

function buildArticlesHTML(articles) {
  const published = articles
    .filter(a => a.published && !a.unlisted)
    .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

  const groups = HOMEPAGE_GROUPS.map(group => {
    const items = published.filter(a => group.categories.includes(a.category));
    if (!items.length) return '';
    return [
      `      <div class="articles-category">`,
      `        <p class="articles-category__label">${group.label}</p>`,
      `        <ul class="articles-grid" role="list">`,
      ``,
      items.map(articleCardHTML).join('\n\n'),
      ``,
      `        </ul>`,
      `      </div>`,
    ].join('\n');
  }).filter(Boolean);

  return groups.join('\n\n');
}

// ─── Repos ────────────────────────────────────────────────────────────────────

const LANG_COLORS = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Shell:  '#89e051',
  Python:     '#3572a5', CSS:        '#563d7c', HTML:   '#e34c26',
  Go:         '#00add8', Rust:       '#dea584',
};

function starIcon() {
  return `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>`;
}

function repoCardHTML(repo) {
  const desc     = repo.description || '';
  const lang     = repo.language    || '';
  const stars    = repo.stargazers_count;
  const dotColor = LANG_COLORS[lang] || '#8b949e';
  const langHTML = lang
    ? `<span class="repo-card__lang"><span class="repo-card__lang-dot" style="background:${dotColor}" aria-hidden="true"></span>${lang}</span>`
    : '<span></span>';
  const starsHTML = stars > 0
    ? `<span class="repo-card__stars">${starIcon()}${stars >= 1000 ? (stars / 1000).toFixed(1) + 'k' : stars}</span>`
    : '';

  return [
    `    <a class="repo-card" href="https://github.com/${repo.full_name}" rel="external noopener"`,
    `       aria-label="${repo.name}${stars > 0 ? `, ${stars} stars` : ''}">`,
    `      <span class="repo-card__name">${repo.name}</span>`,
    ...(desc ? [`      <p class="repo-card__desc">${desc}</p>`] : []),
    `      <div class="repo-card__footer">${langHTML}${starsHTML}</div>`,
    `    </a>`,
  ].join('\n');
}

function apiHeaders() {
  const h = {};
  if (process.env.GITHUB_TOKEN) h['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function buildReposHTML(headers) {
  const { status, body } = await httpsGet(GITHUB_API, headers);
  if (status !== 200 || !Array.isArray(body)) {
    throw new Error(`GitHub API returned ${status}: ${JSON.stringify(body).slice(0, 200)}`);
  }

  const repos = body
    .filter(r => !r.fork && !SKIP_REPOS.has(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  // Backfill missing descriptions from READMEs in parallel
  await Promise.all(
    repos
      .filter(r => !r.description)
      .map(async r => {
        r.description = await fetchReadmeDesc(r.full_name, headers) || '';
      })
  );

  return repos.map(repoCardHTML).join('\n\n');
}

// ─── README description extraction ───────────────────────────────────────────

function extractDescFromReadme(markdown) {
  const lines = markdown.split('\n');
  const paragraphs = [];
  let current = [];

  for (const line of lines) {
    const t = line.trim();
    const skip =
      !t ||
      t.startsWith('#') ||
      t.startsWith('![') ||
      t.startsWith('[![') ||
      t.startsWith('<!--') ||
      t.startsWith('<') ||
      t.startsWith('---') ||
      t.startsWith('```') ||
      t.startsWith('|');
    if (skip) {
      if (current.length) { paragraphs.push(current.join(' ')); current = []; }
    } else {
      current.push(t);
    }
  }
  if (current.length) paragraphs.push(current.join(' '));

  for (const p of paragraphs) {
    const clean = p
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
      .replace(/`([^`]+)`/g, '$1')              // `code` → code
      .replace(/\*\*([^*]+)\*\*/g, '$1')        // **bold** → bold
      .replace(/\*([^*]+)\*/g, '$1')            // *italic* → italic
      .trim();
    if (clean.length > 30) return clean.length > 220 ? clean.slice(0, 217) + '...' : clean;
  }
  return null;
}

async function fetchReadmeDesc(repoFullName, headers) {
  try {
    const { status, body } = await httpsGet(
      `https://api.github.com/repos/${repoFullName}/readme`,
      headers
    );
    if (status !== 200 || !body.content) return null;
    const markdown = Buffer.from(body.content, 'base64').toString('utf8');
    return extractDescFromReadme(markdown);
  } catch {
    return null;
  }
}

// ─── Projects ─────────────────────────────────────────────────────────────────

async function fetchGithubDescs(projects, headers) {
  const results = await Promise.all(
    projects.map(async p => {
      if (!p.github) return [p.id, null];
      try {
        const { status, body } = await httpsGet(`https://api.github.com/repos/${p.github}`, headers);
        if (status !== 200) return [p.id, null];
        const desc = body.description || await fetchReadmeDesc(p.github, headers);
        return [p.id, desc || null];
      } catch {
        return [p.id, null];
      }
    })
  );
  return Object.fromEntries(results);
}

function projectItemHTML(project, index, githubDescs) {
  const num        = String(index + 1).padStart(2, '0');
  const githubAttr = project.github ? ` data-github="${project.github}"` : '';
  const desc       = (githubDescs && githubDescs[project.id]) || project.description;

  return [
    `        <li class="project-item" aria-labelledby="proj-${project.id}-name"${githubAttr}>`,
    `          <div class="project-item__info">`,
    `            <span class="project-item__number" aria-hidden="true">${num}</span>`,
    `            <h3 id="proj-${project.id}-name" class="project-item__name">${project.name}</h3>`,
    `            <p class="project-item__description">${desc}</p>`,
    `            <div class="project-item__links">`,
    `              <a href="${project.link.url}" class="project-item__link" rel="external noopener">${project.link.text}</a>`,
    `            </div>`,
    `          </div>`,
    `          <div class="project-item__visual" aria-hidden="true">`,
    `            <img class="project-item__screenshot" src="${project.image}" alt="" loading="lazy" decoding="async">`,
    `          </div>`,
    `        </li>`,
  ].join('\n');
}

function buildProjectsHTML(projects, githubDescs) {
  return [
    `      <ol class="projects-list" role="list" style="margin-top: var(--space-16, 4rem);">`,
    ``,
    projects.map((p, i) => projectItemHTML(p, i, githubDescs)).join('\n\n'),
    ``,
    `      </ol>`,
  ].join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Validate inputs exist before doing any work
  for (const [label, p] of [
    ['Articles config', ARTICLES_CONFIG],
    ['Projects config', PROJECTS_CONFIG],
    ['docs/index.html', INDEX_HTML],
  ]) {
    if (!fs.existsSync(p)) {
      console.error(`❌ ${label} not found:\n   ${p}`);
      process.exit(1);
    }
  }

  const { articles } = JSON.parse(fs.readFileSync(ARTICLES_CONFIG, 'utf8'));
  const { projects } = JSON.parse(fs.readFileSync(PROJECTS_CONFIG, 'utf8'));

  const headers = apiHeaders();

  // Fetch repos and project GitHub descriptions in parallel (both fail gracefully)
  process.stdout.write('📡 Fetching GitHub data... ');
  let reposHTML;
  let githubDescs = {};
  try {
    [reposHTML, githubDescs] = await Promise.all([
      buildReposHTML(headers),
      fetchGithubDescs(projects, headers),
    ]);
    const repoCount = (reposHTML.match(/class="repo-card"/g) || []).length;
    const descCount = Object.values(githubDescs).filter(Boolean).length;
    console.log(`${repoCount} repos, ${descCount}/${projects.length} project descriptions`);
  } catch (err) {
    console.log('failed');
    console.warn(`   ⚠️  ${err.message}`);
    reposHTML = reposHTML || `    <p style="color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-small)">Could not load repos — check back soon.</p>`;
  }

  process.stdout.write('📝 Building articles HTML... ');
  const articlesHTML = buildArticlesHTML(articles);
  const articleCount = articles.filter(a => a.published && !a.unlisted).length;
  console.log(`${articleCount} articles`);

  process.stdout.write('🔨 Building projects HTML... ');
  const projectsHTML = buildProjectsHTML(projects, githubDescs);
  console.log(`${projects.length} projects`);

  // Inject into index.html
  let html = fs.readFileSync(INDEX_HTML, 'utf8');
  html = inject(html, 'REPOS',     reposHTML);
  html = inject(html, 'ARTICLES',  articlesHTML);
  html = inject(html, 'PROJECTS',  projectsHTML);
  fs.writeFileSync(INDEX_HTML, html, 'utf8');

  console.log('\n✅ docs/index.html updated');
  console.log(`   Articles : ${articleCount} (AI / Infrastructure / Crime & Mystery)`);
  console.log(`   Projects : ${projects.length}`);
  console.log(`   Repos    : fetched from GitHub API`);
}

main().catch(err => {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
});
