---
id: 02-build-html
title: Build HTML Script — Dynamic Homepage Generation
edition: TheDecipherist
depends_on: [01-create-github-pages]
source_files:
  - scripts/build-html.js
  - scripts/projects.config.json
  - docs/index.html
routes: []
models: []
test_files: []
data_flow: greenfield
last_synced: 2026-04-23
status: complete
phase: all
mdd_version: 1
known_issues: []
---

# 02 — Build HTML Script — Dynamic Homepage Generation

## Purpose

A Node.js build script that regenerates the dynamic sections of `docs/index.html` from
config files and the GitHub API. Running `node scripts/build-html.js` rebuilds the
articles grid, GitHub repos grid, and projects list so the homepage stays in sync with
the website's content without manual HTML edits.

## Architecture

Three injection zones are marked in `docs/index.html` with HTML comment markers.
The build script reads them and replaces content between each pair:

```
articles.config.json (~/projects/theDecipherist_website/adminTools/)
  └─► articles HTML (grouped by category, sorted by date desc)

GitHub API (api.github.com/users/TheDecipherist/repos)
  └─► static repo card HTML (sorted by stars desc, forks excluded)

scripts/projects.config.json
  └─► project list HTML (numbered, in config order)

All three ──► docs/index.html (marker injection, section content replaced)
```

The `docs/js/github-repos.js` runtime script remains in place as a progressive
enhancement — it will re-fetch and update the repos grid live in the browser,
overwriting the static snapshot baked in at build time.

## Data Model

### articles.config.json (external, read-only)
```
article {
  id: string              // URL slug, underscores allowed
  published: boolean
  unlisted: boolean       // if true, excluded from homepage listing
  title: string
  description: string     // used as card excerpt (truncated to 160 chars)
  bannerImage: string     // e.g. /articles/mdd-workflow/mdd-workflow.webp
  bannerAlt: string
  url: string             // full URL e.g. https://thedecipherist.com/articles/mdd-workflow/
  datePublished: string   // ISO date YYYY-MM-DD
  category: string        // "AI" | "DevOps" | "Security" | "Cryptanalysis"
}
```

### scripts/projects.config.json (local)
```
project {
  id: string              // kebab-case identifier
  name: string
  description: string
  link: { text: string, url: string }
  image: string           // path like /images/projects/foo.webp
  github?: string         // "TheDecipherist/repo-name" (optional)
}
```

## API Endpoints

**GitHub REST API (read-only, called at build time)**
- `GET https://api.github.com/users/TheDecipherist/repos?per_page=100&sort=stars`
- Auth: `Authorization: Bearer ${GITHUB_TOKEN}` (env var, optional but recommended)
- Response: array of repo objects, filtered (no forks, no profile README repo)

## Business Rules

**Article filtering:**
- `published === true` AND `unlisted` is not truthy
- Grouped into 3 homepage sections by category:
  - "AI" → `category: "AI"`
  - "Infrastructure" → `category: "DevOps"` or `"Security"`
  - "Crime & Mystery" → `category: "Cryptanalysis"`
- Within each group: sorted by `datePublished` descending (newest first)

**Article card rendering:**
- `aria-labelledby` ID: `ac-${id.replace(/_/g, '-')}-title`
- Category tag text: AI → "AI" | DevOps → "DevOps" | Security → "Security" | Cryptanalysis → "Crypto"
- Category tag modifier class: AI → none | DevOps → `--devops` | Security/Crypto → `--security`
- Excerpt: description truncated to 160 chars (hard cutoff, no word-break trimming)
- Date format: `Apr 2026` from ISO date

**Repos filtering:**
- Exclude forks (`fork === true`)
- Exclude the profile README repo (`name === 'TheDecipherist'`)
- Sort by `stargazers_count` descending

**Injection markers (added to docs/index.html):**
```html
<!-- BUILD:REPOS:START -->...<!-- BUILD:REPOS:END -->
<!-- BUILD:ARTICLES:START -->...<!-- BUILD:ARTICLES:END -->
<!-- BUILD:PROJECTS:START -->...<!-- BUILD:PROJECTS:END -->
```

**Projects:** rendered in config array order (no sort); numbered 01–NN auto-incremented.

**Error handling:**
- Config file not found → exit with clear message, do NOT overwrite index.html
- GitHub API failure → print warning, render empty repos grid with fallback message, continue with rest
- index.html markers missing → exit with instructions to re-add markers

## Data Flow

```
Input  → scripts/projects.config.json (local file)
Input  → ~/projects/theDecipherist_website/adminTools/articles.config.json (sibling project)
Input  → GitHub API response (network)
Input  → docs/index.html (current, read for template)

Transform:
  articles   filtered + grouped + sorted → article card HTML blocks
  repos      filtered + sorted           → repo card HTML blocks
  projects   in config order             → project list item HTML blocks

Output → docs/index.html (marker zones replaced, rest preserved unchanged)
```

## Dependencies

Depends on `01-create-github-pages` — requires the `docs/index.html` template with
existing layout, CSS classes, and section structure to be in place. The script modifies
specific zones within that file.

## Known Issues

(none — new feature)
