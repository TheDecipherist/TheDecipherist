// github-stars.js — fetch & display GitHub star counts on project items
// Caches each repo in localStorage for 1 hour to stay under API rate limits

const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function cached(repo) {
  try {
    const raw = localStorage.getItem(`gh_stars:${repo}`);
    if (!raw) return null;
    const { stars, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return stars;
  } catch { return null; }
}

function cache(repo, stars) {
  try { localStorage.setItem(`gh_stars:${repo}`, JSON.stringify({ stars, ts: Date.now() })); }
  catch { /* storage full — skip */ }
}

async function fetchStars(repo) {
  const hit = cached(repo);
  if (hit !== null) return hit;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) return null;
    const { stargazers_count } = await res.json();
    cache(repo, stargazers_count);
    return stargazers_count;
  } catch { return null; }
}

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function injectBadge(linksEl, stars, repo) {
  const badge = document.createElement('a');
  badge.className = 'project-item__stars';
  badge.href = `https://github.com/${repo}`;
  badge.rel = 'external noopener';
  badge.setAttribute('aria-label', `${stars} GitHub stars`);
  badge.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
  </svg>${formatStars(stars)}`;
  linksEl.append(badge);
}

async function init() {
  const items = document.querySelectorAll('.project-item[data-github]');
  await Promise.all([...items].map(async (item) => {
    const repo  = item.dataset.github;
    const stars = await fetchStars(repo);
    if (stars === null || stars === 0) return;
    const linksEl = item.querySelector('.project-item__links');
    if (linksEl) injectBadge(linksEl, stars, repo);
  }));
}

document.addEventListener('DOMContentLoaded', init);
