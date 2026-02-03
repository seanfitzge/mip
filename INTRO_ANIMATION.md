# Intro Animation

## Overview

A sleek, modern first-time animation that displays when users visit the website for the first time. The animation features:

- **DNA/Metabolic symbol** - Animated SVG with helix strands representing metabolic intelligence
- **Smooth transitions** - Custom easing functions for a premium feel
- **Fast performance** - Completes in 2.5 seconds, no heavy assets
- **One-time display** - Uses localStorage to track if user has seen the animation

## Features

### Animation Sequence

1. **Logo Entry (0-0.6s)**: DNA symbol scales in with spring-like easing
2. **Pulse Effect (0.3-1.5s)**: Glowing ring emanates from center
3. **Drawing Lines (0.4-1.0s)**: DNA helix strands draw in sequence
4. **Connection Dots (0.7-1.0s)**: Connection points pop in
5. **Text Reveal (1.2-1.4s)**: Title and subtitle fade in
6. **Exit (2.5s)**: Entire animation fades out smoothly

### Page Content Animation

After the intro completes, page sections animate in with staggered timing:

- Each section fades up with 100ms delay between sections
- Smooth, natural feeling motion
- Respects user's motion preferences

## Technical Details

### Components

- `components/intro-animation.tsx` - Main intro animation component
- `app/(marketing)/page.tsx` - Updated with content animations
- `app/layout.tsx` - Includes intro animation at root level

### Dependencies

- `framer-motion` - Animation library (lightweight, ~30kb gzipped)

### Browser Compatibility

- Modern browsers with localStorage support
- Falls back gracefully if localStorage is unavailable
- Respects `prefers-reduced-motion` media query

## Testing

To see the animation again (for development/testing):

1. Open browser dev tools (F12)
2. Go to Console tab
3. Run: `localStorage.removeItem('mip-intro-seen')`
4. Refresh the page

Alternatively, open an incognito/private window.

## Customization

### Timing

Edit the timeout in `components/intro-animation.tsx`:

```typescript
const timer = setTimeout(() => {
  setShowIntro(false)
  localStorage.setItem("mip-intro-seen", "true")
}, 2500) // Change this value (in milliseconds)
```

### Colors

The animation uses CSS variables from your design system:

- `--color-primary` - Main brand color for the DNA symbol
- `--background` - Background color (dark mode aware)

### Animation Speed

Adjust individual animation durations in the motion components:

- `duration` - How long the animation takes
- `delay` - When the animation starts
- `ease` - The easing function (acceleration curve)

## Performance

- Total animation time: 2.5 seconds
- No images or heavy assets
- Hardware-accelerated (GPU) animations
- Minimal JavaScript execution
- No layout shifts or reflows

## Accessibility

- Animation completes quickly (under 3 seconds)
- No flashing or strobing effects
- Respects user motion preferences
- Screen readers skip the animation
- Doesn't block page interaction once loaded
