// github-repos.js — fetch & render all public TheDecipherist repos

const CACHE_KEY = 'gh_repos:TheDecipherist';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const API_URL   = 'https://api.github.com/users/TheDecipherist/repos?per_page=100&sort=stars';
const SKIP      = new Set(['TheDecipherist']); // profile README repo

const LANG_COLORS = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f1e05a',
  Shell:       '#89e051',
  Python:      '#3572a5',
  CSS:         '#563d7c',
  HTML:        '#e34c26',
  Go:          '#00add8',
  Rust:        '#dea584',
};

function starIcon() {
  return `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
  </svg>`;
}

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function repoCardHTML(repo) {
  const desc     = repo.description || '';
  const lang     = repo.language || '';
  const stars    = repo.stargazers_count;
  const dotColor = LANG_COLORS[lang] || '#8b949e';

  const langHTML = lang
    ? `<span class="repo-card__lang">
         <span class="repo-card__lang-dot" style="background:${dotColor}" aria-hidden="true"></span>
         ${lang}
       </span>`
    : '<span></span>';

  const starsHTML = stars > 0
    ? `<span class="repo-card__stars">${starIcon()}${formatStars(stars)}</span>`
    : '';

  return `
    <a class="repo-card" href="https://github.com/${repo.full_name}" rel="external noopener"
       aria-label="${repo.name}${stars > 0 ? `, ${stars} stars` : ''}">
      <span class="repo-card__name">${repo.name}</span>
      ${desc ? `<p class="repo-card__desc">${desc}</p>` : ''}
      <div class="repo-card__footer">
        ${langHTML}
        ${starsHTML}
      </div>
    </a>`;
}

function skeletonHTML(n) {
  return Array.from({ length: n }, () => `
    <div class="repo-card repo-card--skeleton" aria-hidden="true">
      <span class="repo-card__name">&nbsp;</span>
      <p class="repo-card__desc">&nbsp;</p>
      <div class="repo-card__footer">&nbsp;</div>
    </div>`).join('');
}

async function fetchRepos() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const { repos, ts } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) return repos;
    }
  } catch { /* ignore */ }

  const res   = await fetch(API_URL, { headers: { Accept: 'application/vnd.github.v3+json' } });
  const data  = await res.json();
  const repos = data
    .filter(r => !r.fork && !SKIP.has(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ repos, ts: Date.now() })); }
  catch { /* storage full */ }

  return repos;
}

async function init() {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  // Show skeletons while fetching
  grid.innerHTML = skeletonHTML(9);

  try {
    const repos = await fetchRepos();
    grid.innerHTML = repos.map(repoCardHTML).join('');
  } catch {
    grid.innerHTML = '<p style="color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-small)">Could not load repos — check back soon.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
