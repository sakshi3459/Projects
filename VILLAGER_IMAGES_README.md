# Adding Custom Villager Images

The webapp currently uses pixel art avatars generated via DiceBear API. If you want to use actual Stardew Valley character portraits, follow these steps:

## Option 1: Use Local Images

1. Create a `public/villagers` folder in the frontend directory:
```bash
mkdir -p frontend/public/villagers
```

2. Add character portrait images (PNG format recommended) to this folder:
   - `Shane.png`
   - `Abigail.png`
   - `Sebastian.png`
   - etc.

3. Update `frontend/src/utils/villagerImages.ts`:
```typescript
export const villagerImages: Record<string, string> = {
  'Shane': '/villagers/Shane.png',
  'Abigail': '/villagers/Abigail.png',
  'Sebastian': '/villagers/Sebastian.png',
  // ... add all villagers
}
```

## Option 2: Use External URLs

If you have the images hosted elsewhere:

```typescript
export const villagerImages: Record<string, string> = {
  'Shane': 'https://your-cdn.com/villagers/shane.png',
  'Abigail': 'https://your-cdn.com/villagers/abigail.png',
  // ... etc
}
```

## Where to Get Character Portraits

**Note:** Stardew Valley character images are copyrighted by ConcernedApe. Only use them if you have permission or for personal use.

Options:
1. Extract from the game files (for personal use only)
2. Use fan-made pixel art versions
3. Commission custom art
4. Keep the current generated pixel art avatars

## Current Setup

The app uses actual Stardew Valley character portraits from the official Stardew Valley Wiki (https://stardewvalleywiki.com/). This provides:
- ✅ Authentic character appearances
- ✅ High-quality game assets
- ✅ Each character has their official portrait
- ✅ Fallback to emoji if image fails to load
- ⚠️ Note: These images are copyrighted by ConcernedApe - this implementation is for personal use only

## Character-Specific Colors

Each villager has a custom color scheme applied to their header:
- Shane: Brown (#8B4513)
- Abigail: Purple (#9370DB)
- Sebastian: Dark Blue (#2C3E50)
- Emily: Hot Pink (#FF69B4)
- And more...

These colors are automatically applied based on the villager speaking!
