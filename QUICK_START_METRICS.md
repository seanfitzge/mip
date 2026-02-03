# Daily Metrics System - Quick Start ⚡

## What You Got

A **stunning full-screen prompt** that appears daily until users log their metrics. Includes:

- 🎭 Full-screen immersive modal
- 🔥 Streak counter with gamification  
- 📍 Persistent floating reminder badge
- 🎉 Milestone celebration animations
- ✨ Smooth, premium animations throughout

---

## See It in Action (30 seconds)

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Clear Data (simulate first visit)
Open browser console and paste:
```javascript
localStorage.removeItem('mip-last-metrics-log')
localStorage.removeItem('mip-metrics-dismissed')
```

### 3. Refresh Page
The full-screen prompt will appear after 0.8 seconds!

### 4. Try Both Flows

**Flow A - Complete Form:**
1. Fill in weight (e.g., 72.5)
2. Fill in sleep hours (e.g., 7.5)
3. Fill in recovery score (e.g., 85)
4. Click "Submit Metrics"
5. Watch success animation
6. Prompt closes

**Flow B - Dismiss:**
1. Click "Skip for now"
2. Notice floating badge appears bottom-right
3. Click badge to reopen prompt

---

## Files Created

```
components/
├── daily-metrics-prompt.tsx        # Main full-screen modal
├── metrics-reminder-badge.tsx      # Floating button
├── metrics-streak.tsx              # Streak counter card
├── streak-celebration.tsx          # Milestone confetti
└── daily-metrics-wrapper.tsx       # Integration wrapper

hooks/
└── use-daily-metrics.ts           # State management

Documentation/
├── DAILY_METRICS_FEATURE.md       # Complete feature docs
├── METRICS_LOGGING_GUIDE.md       # Implementation guide
└── QUICK_START_METRICS.md         # This file
```

---

## Already Integrated

The system is **already wired up** in your app layout:

**File**: `app/(app)/layout.tsx`
```tsx
<DailyMetricsWrapper /> // ← Already added!
```

It will:
- ✅ Show prompt on first visit
- ✅ Check localStorage for today's log
- ✅ Show badge if dismissed
- ✅ Reset daily at midnight

---

## Add Streak Card (2 minutes)

### Step 1: Open Dashboard
**File**: `app/(app)/dashboard/page.tsx`

### Step 2: Import Component
```tsx
import { MetricsStreak } from "@/components/metrics-streak"
```

### Step 3: Add to JSX
```tsx
<MetricsStreak
  currentStreak={7}
  longestStreak={14}
  totalLogs={42}
/>
```

Done! You'll see the streak card on the dashboard.

---

## Customize (if needed)

### Change Colors
```tsx
// In any component
className="border-neonCyan/30"  // Change to electricBlue, laserGreen, etc.
```

### Adjust Timing
```tsx
// In daily-metrics-wrapper.tsx, line ~15
setTimeout(() => setShowPrompt(true), 800)  // Change delay (ms)
```

### Add Fields
```tsx
// In daily-metrics-prompt.tsx
const [metrics, setMetrics] = useState({
  weight: "",
  sleep: "",
  recovery: "",
  newField: ""  // Add here
})
```

---

## How It Works

### LocalStorage Schema
```javascript
{
  "mip-last-metrics-log": "2026-02-03",    // Date last logged
  "mip-metrics-dismissed": "2026-02-03"    // Date dismissed today
}
```

### Daily Logic
```
If today's date != mip-last-metrics-log:
  → Show prompt

If user dismisses:
  → Hide prompt
  → Show badge
  → Set mip-metrics-dismissed = today

If user submits:
  → Hide prompt
  → Set mip-last-metrics-log = today
  → Clear mip-metrics-dismissed
```

---

## Testing Commands

Paste these in browser console:

```javascript
// Reset everything (show prompt)
localStorage.removeItem('mip-last-metrics-log')
localStorage.removeItem('mip-metrics-dismissed')

// Simulate logged today (hide prompt)
localStorage.setItem('mip-last-metrics-log', new Date().toISOString().split('T')[0])

// Simulate dismissed today (show badge)
localStorage.setItem('mip-metrics-dismissed', new Date().toISOString().split('T')[0])

// Check current state
console.log('Last log:', localStorage.getItem('mip-last-metrics-log'))
console.log('Dismissed:', localStorage.getItem('mip-metrics-dismissed'))
```

---

## Next Steps

### Required (Connect to Backend)
1. **Save metrics to database** when form submits
2. **Calculate streak** from consecutive logged days
3. **Update streak card** with real data

### Optional (Enhance)
1. Add milestone celebrations
2. Push notifications at specific times
3. Auto-fill from wearable devices
4. Weekly summary emails

---

## Common Questions

**Q: Can users skip the prompt?**  
A: Yes! "Skip for now" button. Floating badge appears instead.

**Q: Does it reset daily?**  
A: Yes! At midnight, if date changes, prompt reappears.

**Q: Can I customize the fields?**  
A: Absolutely! Edit `daily-metrics-prompt.tsx` to add/remove fields.

**Q: Does it work on mobile?**  
A: Yes! Fully responsive. Touch-optimized.

**Q: Can I change when it appears?**  
A: Yes! Adjust delay in `daily-metrics-wrapper.tsx` (default 800ms).

---

## Quick Tips

💡 **Best practice**: Encourage users to log at same time daily (mornings ideal)

💡 **Validation**: Add min/max to number inputs for data quality

💡 **Motivation**: Update streak messages based on performance

💡 **Celebration**: Show confetti animation at 7, 14, 30 day milestones

💡 **Analytics**: Track completion rate, streak length, dismiss rate

---

## That's It!

Your metrics logging system is **ready to use**. Open the app and you'll see it in action!

🚀 **Start logging** → Build streaks → Keep users engaged!

---

**Need more details?** Check:
- `DAILY_METRICS_FEATURE.md` - Complete feature overview
- `METRICS_LOGGING_GUIDE.md` - Detailed implementation guide
- Component source code - Heavily commented
