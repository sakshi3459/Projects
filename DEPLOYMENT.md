# Deployment Guide - Jay's Birthday Webapp

## Quick Deploy to Vercel (Easiest - Free!)

Vercel is perfect for this project and completely free for personal use.

### Prerequisites
1. Create a [GitHub](https://github.com) account (if you don't have one)
2. Create a [Vercel](https://vercel.com) account (sign in with GitHub)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd "/Users/sakshi.kumar/Documents/Claude Projects"
   git init
   git add .
   git commit -m "Initial commit - Jay's Birthday Webapp"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it: `jays-birthday` (or any name you like)
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/jays-birthday.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**:
   - Find "jays-birthday" in the list
   - Click "Import"

4. **Configure the build**:
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

5. **Wait 2-3 minutes** for deployment to complete

6. **You'll get a URL** like: `https://jays-birthday-xyz.vercel.app`

### Step 3: Add Music Files

**Important:** You need to upload your music files to the deployment!

1. After deployment, add your music files to the project:
   ```bash
   # Make sure your music files are in the right place
   ls frontend/public/music/
   # Should show: track1.mp3, track2.mp3, ..., track7.mp3
   ```

2. Commit and push:
   ```bash
   git add frontend/public/music/
   git commit -m "Add music files"
   git push
   ```

3. Vercel will automatically redeploy

### Step 4: Share the Link! 🎉

Share your Vercel URL with Jay and friends:
```
https://your-app-name.vercel.app
```

---

## Alternative: Deploy to Netlify (Also Free!)

### Quick Netlify Deploy

1. **Go to [Netlify](https://app.netlify.com/)**

2. **Drag and drop** your `frontend` folder into the deploy zone

3. **Or connect to GitHub**:
   - New site from Git
   - Choose your repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

4. **Deploy!**

---

## For Backend API (If Needed)

Since your messages are currently hardcoded in Python, you have two options:

### Option 1: Keep Backend Separate
Deploy backend to **Railway** or **Render**:

**Railway:**
1. Go to [Railway](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Railway will auto-detect Python
5. Get your backend URL

**Then update frontend API URL:**
```typescript
// frontend/src/services/api.ts
const API_URL = 'https://your-backend.railway.app'
```

### Option 2: Move Messages to Frontend (Simpler!)
Since all your birthday messages are static, you could move them to the frontend and skip the backend entirely for deployment.

---

## Notes

- **Free tier limits**: Vercel gives you plenty of bandwidth for a birthday party
- **Custom domain**: You can add a custom domain in Vercel settings (optional)
- **Updates**: Just push to GitHub and Vercel auto-deploys
- **Music files**: Make sure they're under 50MB each for Vercel

## Troubleshooting

### "Cannot GET /api/birthday/message"
- Your backend isn't deployed. Use Option 2 above to move messages to frontend.

### Music not playing
- Check that music files are committed to Git
- Verify files are in `frontend/public/music/`
- Check browser console for errors

### Build fails
- Make sure `package.json` exists in frontend folder
- Check that all dependencies are listed
- Try building locally first: `cd frontend && npm run build`
