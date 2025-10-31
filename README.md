# Valence Software Blog

Modern Next.js 16 blog with TypeScript, Tailwind CSS v4, and MDX support.

## Features

- **Next.js 16** with App Router and React Server Components
- **TypeScript** with strict mode
- **Tailwind CSS v4** with typography plugin
- **Turbopack** for fast builds and HMR
- **Contentlayer** for type-safe MDX content
- **Dark/Light Mode** with next-themes
- **Search** with Fuse.js (client-side fuzzy search)
- **Tags System** with clickable tags and filtering
- **Giscus Comments** (GitHub Discussions-based)
- **Syntax Highlighting** with rehype-pretty-code and Shiki
- **Responsive Design** with mobile-first approach

## Getting Started

### Development

```bash
npm run dev
```

Opens on [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Configuration

### Giscus Comments

Update `/src/components/Comments.tsx` with your repository details:

1. Go to [giscus.app](https://giscus.app/) and configure your repository
2. Enable GitHub Discussions on your repository
3. Install the [Giscus app](https://github.com/apps/giscus)
4. Update the component with your `repo`, `repoId`, `category`, and `categoryId`

Current placeholder values:
- `repo`: "cjones26/valence-software-blog-comments"
- `repoId`: "YOUR_REPO_ID" ← Update this
- `categoryId`: "YOUR_CATEGORY_ID" ← Update this

### Site Metadata

Update `/src/app/layout.tsx` to customize:
- Site title and description
- Open Graph metadata
- Twitter card settings
- Domain (metadataBase URL)

### Contact Information

Update `/src/components/Layout.tsx` footer section with your:
- Email address
- GitHub profile
- LinkedIn profile

## Content Management

### Adding Blog Posts

1. Create a new folder in `content/posts/YYYY/your-post-slug/`
2. Add an `index.mdx` file with frontmatter:

```mdx
---
title: Your Post Title
date: 2025-10-31
published: true
tags:
  - 'Tag 1'
  - 'Tag 2'
description: Optional short description
---

Your content here...
```

3. Add images/assets in the same folder
4. Reference images with relative paths: `![Alt text](./image.png)`

### Available Tags

Tags are automatically standardized. Common tags:
- Programming: JavaScript, TypeScript, C#, C++, Python
- Web: React, Next.js, Angular, Web Development
- Systems: Linux, Windows, macOS, System Administration
- Microsoft: Exchange, PowerShell, Active Directory, Office
- Development Tools: npm, Git, Docker, Gradle

## Project Structure

```
valence-software-blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [year]/[month]/[day]/[slug]/  # Blog post pages
│   │   ├── tags/              # Tag listing and filtering
│   │   ├── search/            # Search page
│   │   ├── about/             # About page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── PostCard.tsx       # Blog post preview card
│   │   ├── SearchBar.tsx      # Search component
│   │   ├── Comments.tsx       # Giscus comments
│   │   ├── ThemeProvider.tsx  # Theme context
│   │   └── LightDarkToggle.tsx  # Theme switcher
│   └── app/globals.css        # Global styles
├── content/
│   └── posts/                 # Blog posts (by year)
├── public/                    # Static assets
├── contentlayer.config.ts     # Contentlayer configuration
├── next.config.ts             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## Styling

### Dark Mode

The site uses `next-themes` with class-based dark mode. The theme toggle automatically:
- Persists user preference
- Respects system preference on first visit
- Updates Giscus comments theme
- Provides smooth transitions

### Typography

Blog posts use Tailwind's prose classes with custom dark mode styling. Code blocks use Shiki with GitHub-themed syntax highlighting.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables (if needed)
4. Deploy

### Other Platforms

The build output is standard Next.js, compatible with:
- Netlify
- AWS Amplify
- Docker
- Node.js servers

## Migration Notes

This site was migrated from Gatsby with:
- ✅ All 38 blog posts migrated
- ✅ Tags cleaned up and standardized
- ✅ Dark/light mode preserved
- ✅ Improved tag system (clickable, filterable)
- ✅ New search functionality
- ✅ Better comments system (Giscus vs Utterances)
- ✅ Modern tech stack (Next.js 16, Turbopack, Tailwind v4)

## Next Steps

- Configure Giscus with your repository-specific values (see Configuration section above)
- Update contact information in the footer
- Customize site metadata and branding

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: MIT License
