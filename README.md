# PlantProblem

A blog about houseplants. No ads in the way, no fluff, just answers.

Live at [plantproblem.com](https://www.plantproblem.com)

---

## What it is

People search "why is my plant dying" and get 2000-word articles that bury the answer. This site fixes that. Short, direct guides that tell you what's wrong and how to fix it.

---

## Stack

- **Next.js 16** — App Router, fully static
- **TypeScript** — strict mode
- **MDX** — posts are just markdown files
- **Tailwind CSS** — styling
- **Vercel** — deploy

No database. No auth. No backend. Just files.

---

## Project structure

```
├── app/                  # Pages and layouts
├── components/           # Reusable UI
├── content/posts/        # MDX articles
├── lib/posts.ts          # Reads and parses MDX files
└── public/               # Static assets
```

---

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

Set this env variable before running:

```
NEXT_PUBLIC_BASE_URL=https://www.plantproblem.com
```

---

## Writing a post

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Why Is My Pothos Turning Yellow?"
description: "The 7 most common causes and how to fix each one."
date: "2026-04-20"
tags: ["Pothos", "Troubleshooting"]
coverImage: "/images/pothos-yellow.jpg"
---

Your content here.
```

That's it. The post shows up automatically.

---

© 2026 PlantProblem. All rights reserved.