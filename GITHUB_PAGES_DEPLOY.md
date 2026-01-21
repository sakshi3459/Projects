# Deploy to GitHub Pages

## Quick Setup

### Step 1: Update Vite Config

Add the base URL to your Vite config:

```bash
# If your GitHub username is "yourusername" and repo is "jays-birthday"
# The URL will be: https://yourusername.github.io/jays-birthday/
```

### Step 2: Install gh-pages package

```bash
cd "/Users/sakshi.kumar/Documents/Claude Projects/frontend"
npm install --save-dev gh-pages
```

### Step 3: Add deploy scripts to package.json

Add these lines to the "scripts" section in `frontend/package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### Step 4: Push to GitHub (if not already done)

```bash
cd "/Users/sakshi.kumar/Documents/Claude Projects"
git init
git add .
git commit -m "Initial commit - Jay's Birthday Webapp"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jays-birthday.git
git push -u origin main
```

### Step 5: Deploy!

```bash
cd "/Users/sakshi.kumar/Documents/Claude Projects/frontend"
npm run deploy
```

This will:
- Build your app (`npm run build`)
- Create a `gh-pages` branch
- Push the `dist` folder to that branch
- Make it live!

### Step 6: Enable GitHub Pages

1. Go to your repo: `https://github.com/YOUR_USERNAME/jays-birthday`
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **gh-pages**
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/jays-birthday/`

## Important Notes

- **Music files**: Make sure your music files are in `frontend/public/music/` before deploying
- **Updates**: Just run `npm run deploy` again to update the site
- **Custom domain**: You can add a custom domain in GitHub Pages settings (optional)

## Troubleshooting

### Site not loading properly
- Check that `vite.config.ts` has the correct `base` URL
- Make sure GitHub Pages is enabled in repo settings

### Music not playing
- Verify music files are committed to git: `git ls-files frontend/public/music/`
- If missing, add them: `git add frontend/public/music/ && git commit -m "Add music files" && npm run deploy`
