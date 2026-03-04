# QQ Unified Dashboard 🫧

Everything in one place: Camera, Mic, QQ Pet, Voice responses.

## Quick Start

**Make sure QQ backend is running first:**
```bash
cd C:\Users\unkno\.openclaw\workspace-qq\scripts
node state-server.js
```

**Then start unified dashboard:**
```bash
cd C:\Users\unkno\.openclaw\workspace\qq-unified
node server.js
```

**Open:** http://localhost:9000/

---

## What You Get

### **One Dashboard with:**

**Left Side:** QQ Pet Viewer
- Live holographic creature
- Reacts to your interactions
- Camera overlay (when enabled)

**Right Side:** Status + Controls
- Real-time hunger/attention/XP bars
- Mood display with emoji
- Feed/Play/Pet buttons
- Activity log

**Top:** Privacy Controls
- 📷 Camera toggle (presence detection)
- 🎤 Mic toggle (voice commands)
- 🔊 Sound toggle (mute QQ's voice)

---

## Voice System

**10 cute phrases with Jessica (Playful voice):**

1. **"Hi hi!"** - When you appear (camera detects you)
2. **"Yummy!"** - When fed
3. **"Yay! Play!"** - When playing
4. **"Aww, nice!"** - When petted
5. **"Hehe!"** - When happy
6. **"Aww..."** - When sad
7. **"Sleepy..."** - When tired
8. **"Wow wow!"** - When excited
9. **"Miss you..."** - When lonely
10. **"Hungry..."** - When needs food

---

## How It Works

### **Camera ON:**
- Detects your presence via motion
- Shows "You're here!" indicator
- QQ says "Hi hi!" when you return after 30+ seconds
- Boosts QQ's attention when you appear

### **Mic ON:**
- Continuous speech recognition
- Voice commands trigger actions:
  - Say "feed" or "hungry" → Feeds QQ
  - Say "play" → Plays with QQ
  - Say "pet" or "love" → Pets QQ
  - Say "hello" → QQ greets you

### **Interactions:**
- **Feed button** → QQ says "Yummy!"
- **Play button** → QQ says "Yay! Play!"
- **Pet button** → QQ says "Aww, nice!"

### **Automatic sounds:**
- Low hunger (<30) → Randomly says "Hungry..."
- Low attention (<30) → Randomly says "Miss you..."

---

## Features

✅ **Unified Interface** - Everything in one page
✅ **Privacy Controls** - Toggle each independently
✅ **Cute Voice** - ElevenLabs Jessica voice (10 phrases)
✅ **Presence Detection** - Knows when you're there
✅ **Voice Commands** - Speak to interact
✅ **Real-time Status** - Live hunger/attention/XP tracking
✅ **Activity Log** - See what's happening
✅ **Auto-polling** - State updates every 2 seconds

---

## Requirements

- QQ backend running on port 8080
- Chrome/Edge browser (for camera/mic APIs)
- Microphone + webcam (optional, can be disabled)

---

## Ports

- **8080** - QQ backend API + original viewer
- **9000** - Unified dashboard (this interface)

---

## Audio Files

Located in `audio/` folder:
- greeting.mp3
- fed.mp3
- play.mp3
- pet.mp3
- happy.mp3
- sad.mp3
- sleepy.mp3
- excited.mp3
- lonely.mp3
- hungry.mp3

All generated with ElevenLabs "Jessica - Playful, Bright, Warm" voice.

---

## Testing

1. **Enable Camera** → Wave → Should see "You're here!" and hear greeting
2. **Enable Mic** → Say "feed me" → Should trigger feed action
3. **Click Feed** → Should hear "Yummy!"
4. **Click Play** → Should hear "Yay! Play!"
5. **Click Pet** → Should hear "Aww, nice!"
6. **Wait** → QQ will randomly say "Hungry..." or "Miss you..." when needs are low

---

## Note About Voice

Currently using "Jessica - Playful, Bright, Warm" voice (closest to "Playful Forest Fairy").

If you want different voice:
1. Check ElevenLabs voice library
2. Add voice to your account
3. Replace voice ID in audio generation script
4. Regenerate audio files

---

**Enjoy your unified QQ companion!** 🫧✨
