# Lazy Genius — PT. Karya Cipta Mandiri

Demo of the automatic weekly project update system.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel via GitHub

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create lazy-genius --public --source=. --push
```

(Or create the repo manually on github.com and `git remote add origin ...`)

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Import the `lazy-genius` repo
3. Click **Deploy** — no env vars needed

That's it. Vercel auto-detects Next.js and deploys in ~60 seconds.

### Custom domain

Project Settings → Domains → add `lazygenius.tech` (or any subdomain).

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Lucide icons
- TypeScript
