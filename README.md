# Valence Software

Marketing site and technical blog for Valence Software, a one-person custom
software consultancy based in Virginia Beach, VA.

- `/` — marketing homepage: what the business does, how it works, how to get
  in touch
- `/about` — background on the owner, Charles Jones
- `/blog` — the technical blog (Next.js/JS/Linux/systems posts going back to
  2009), kept as a section rather than the front door
- Individual posts stay at their original `/[year]/[month]/[day]/[slug]`
  URLs regardless of how the blog index is organized, since some carry
  long-standing inbound links

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Contentlayer2** for type-safe MDX content (`content/posts/YYYY/<slug>/index.mdx`)
- **next-themes**-style class-based dark/light mode (see below)
- **Fuse.js** client-side search (blog routes only)
- **Giscus** comments (GitHub Discussions-based)
- **rehype-pretty-code** + **Shiki** for syntax highlighting
- **plaiceholder** for blur placeholders on post images

Every route is statically prerendered (`next build` shows `○`/`●` for all
routes, no `ƒ`) — there's no database and no per-request server rendering,
so this deploys cleanly to any static-friendly host.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # contentlayer2 build && next build
npm start
```

Commit messages and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `chore:`, etc.) — enforced locally by a commitlint husky
hook and on GitHub by a PR title check. Squash merge only; the PR title
becomes the commit on `main`.

## Configuration

### Giscus comments

Update `src/components/ui/Comments.tsx` with your repository details:

1. Go to [giscus.app](https://giscus.app/) and configure your repository
2. Enable GitHub Discussions on the repository
3. Install the [Giscus app](https://github.com/apps/giscus)
4. Set `repo`, `repoId`, `category`, and `categoryId` on the component

### Site metadata

Root metadata (title, description, Open Graph, structured data) lives in
`src/app/layout.tsx` and `src/app/page.tsx`. `metadataBase` points at
`https://valencesoftware.io`.

### Contact information

The email, phone number, and service area shown in the homepage contact
section and the `Footer` component are the source of truth — update both if
they change.

## Deployment

Deploys to [Netlify](https://app.netlify.com/projects/valence-software)
(`valencesoftware.io`). Every route is statically prerendered, so this is a
plain static-site deploy with no functions/SSR involved — `npm run build`
produces the full output, no adapter needed. Any static-friendly host works
the same way (Netlify, Cloudflare Pages, etc.); Vercel would also work but
isn't required for anything here.

## Adding blog posts

1. Create `content/posts/YYYY/your-post-slug/index.mdx`
2. Add frontmatter:

```mdx
---
title: Your Post Title
date: 2026-01-01
published: true
tags:
  - 'Tag 1'
  - 'Tag 2'
description: Optional short description
---

Your content here...
```

3. Add any images/assets in the same folder and reference them with relative
   paths: `![Alt text](./image.png)`

Posts are served from `/[year]/[month]/[day]/[slug]` (derived from the
`date` frontmatter and folder slug) — this URL shape is load-bearing and
should not change. The `/blog` index and `/blog/page/[n]` pagination read
from the same content; `/page/:n` permanently redirects to `/blog/page/:n`
for old links.

## Project structure

```
src/
├── app/
│   ├── page.tsx                       # marketing homepage (/)
│   ├── about/page.tsx                 # about page
│   ├── blog/
│   │   ├── page.tsx                   # blog index
│   │   └── page/[pageNum]/page.tsx    # blog pagination
│   ├── [year]/[month]/[day]/[slug]/   # individual posts (unmoved)
│   ├── tags/, tags/[tag]/             # tag pages (unmoved)
│   └── layout.tsx                     # root layout
├── components/
│   ├── layout/                        # Header, Footer, PageLayout, BlogLayout
│   ├── marketing/                     # homepage sections (Hero, Services, Contact, etc.)
│   ├── blog/                          # post cards, list, tags, back-to-blog
│   ├── mdx/                           # MDX rendering components
│   ├── search/                        # blog-only search UI
│   ├── analytics/                     # Google Analytics/Tag Manager
│   └── ui/                            # theme toggle, comments, theme provider
content/posts/YYYY/<slug>/index.mdx    # blog content
public/fonts/                          # Fixel Text (self-hosted)
```

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: MIT License
