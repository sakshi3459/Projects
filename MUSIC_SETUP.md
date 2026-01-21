# Background Music Setup

The background music feature is configured to play multiple local audio files in sequence. External audio URLs are blocked by most CDNs due to hotlinking restrictions.

## How to Add Your Own Music (7 tracks)

### Step 1: Create Music Folder

Create a `music` folder inside `frontend/public/`:
```bash
mkdir -p frontend/public/music
```

### Step 2: Add Music Files

Place 7 MP3 files in the folder with these exact names:
```
frontend/
└── public/
    └── music/
        ├── track1.mp3  (Happy Birthday song - plays when candles are blown)
        ├── track2.mp3  (Background music - plays when viewing messages)
        ├── track3.mp3  (Background music)
        ├── track4.mp3  (Background music)
        ├── track5.mp3  (Background music)
        ├── track6.mp3  (Background music)
        └── track7.mp3  (Background music)
```

**Important:**
- `track1.mp3` should be a **Happy Birthday song** - it plays when you blow out all the candles
- `track2.mp3` through `track7.mp3` should be **Stardew Valley background music** or other calm background tracks

### Step 3: For Stardew Valley Music (Personal Use Only)

**IMPORTANT:** Stardew Valley music is copyrighted by ConcernedApe. This setup is for **personal, non-commercial use only**.

If you own the Stardew Valley game or soundtrack:

1. Visit the game soundtrack website you mentioned or purchase the official soundtrack
2. Download 7 of your favorite tracks (suggested tracks):
   - Track 1: Happy Birthday Song (any version you like)
   - Track 2: Spring (The Valley Comes Alive)
   - Track 3: Summer (Nature's Crescendo)
   - Track 4: Fall (The Smell of Mushroom)
   - Track 5: Winter (Ancient)
   - Track 6: Stardew Valley Overture
   - Track 7: A Golden Star is Born

3. Rename them to `track1.mp3`, `track2.mp3`, etc.
4. Place them in `frontend/public/music/`

### Step 4: Refresh and Enjoy!

Refresh the webapp - the music player will cycle through all 6 tracks automatically!

## Current Setup

**Music Flow:**
1. Click "Join the Festival!" → **No music yet** (so you can click candles without distraction)
2. Click first candle → **Track 1 (Happy Birthday song) plays**
3. Blow out all 3 candles → Button appears: "The whole town showed up!"
4. Click the button → **Changes to Track 2** (background music starts)
5. Each time you click "Talk to Another Villager" → **Changes to next track** (3, 4, 5, 6, 7, then loops back to 2)

**Settings:**
- Volume is set to 20% by default
- When one track ends, it automatically plays the next
- After track 7, it loops back to track 2 (skipping track 1)
- You can manually pause/play with the music control button

## Alternative: Use Royalty-Free Music

If you prefer copyright-free alternatives:
- YouTube Audio Library (download locally)
- Free Music Archive
- Incompetech
- Bensound (free with attribution)
- Look for "peaceful farm music" or "calm acoustic background"

## Suggested Music Mood

For a Stardew Valley themed birthday:
- Calm, peaceful background music
- Light acoustic or piano melodies
- Upbeat but not too energetic
- Similar to Stardew Valley's in-game music style
