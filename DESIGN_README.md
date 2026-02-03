# MIP - Metabolic Intelligence Platform 🚀

## ✨ New Experimental Design System

This application features a **completely custom, futuristic design system** inspired by Apple's immersive experiences and the distinctive aesthetic of "Severance."

---

## 🎨 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

**First time?** Clear localStorage to see the intro animation:
```javascript
localStorage.removeItem('mip-intro-seen')
```

---

## 🎭 Design Highlights

### Color Palette
- **Void Black** `#08080C` - Deep backgrounds
- **Electric Blue** `#0A84FF` - Primary actions
- **Neon Cyan** `#00FFFF` - Active states
- **Laser Green** `#32FF96` - Success indicators
- **Hot Magenta** `#FF0080` - Warnings
- **Deep Purple** `#8247E5` - Accents

### Typography
- **Space Grotesk** - Headings & display text
- **IBM Plex Mono** - Data & technical content

### Effects
- ✅ Glassmorphism throughout
- ✅ Gradient text on headings
- ✅ Glow shadows on interaction
- ✅ Smooth animations via Framer Motion
- ✅ Pulsing live indicators
- ✅ Floating elements

---

## 📂 Key Files

### Design System
- `app/globals.css` - Core design tokens & animations
- `tailwind.config.ts` - Tailwind extensions
- `app/layout.tsx` - Font configuration

### Components
- `components/ui/*` - Base UI components (Card, Button, Input, etc.)
- `components/intro-animation.tsx` - First-visit animation
- `components/app-sidebar.tsx` - App navigation
- `components/site-header.tsx` - Marketing header
- `components/loading-screen.tsx` - Loading states
- `app/not-found.tsx` - 404 page

### Pages
- `app/(marketing)/page.tsx` - Homepage
- `app/(app)/dashboard/page.tsx` - Dashboard

---

## 🎯 Usage Examples

### Cards with Glass Effect
```tsx
<Card className="p-6 glass border-2 border-electricBlue/30 hover:shadow-glow">
  <h3 className="text-gradient">Title</h3>
  <p className="text-ghost/70">Content</p>
</Card>
```

### Gradient Buttons
```tsx
<Button variant="primary">Standard</Button>
<Button variant="neon">Neon Style</Button>
<Button variant="outline">Outlined</Button>
```

### Status Indicators
```tsx
<StatusBadge status="optimal" />
<ConfidenceBadge level="STRONG" />
```

### Animated Text
```tsx
<h1 className="text-4xl font-bold tracking-tighter">
  <span className="text-gradient">Gradient Text</span>
</h1>

<span className="text-neon">Neon Glow Text</span>
```

---

## 📚 Documentation

- **`DESIGN_OVERHAUL_COMPLETE.md`** - Complete design system documentation
- **`DESIGN_GUIDE.md`** - Implementation guide & best practices
- **`TRANSFORMATION_SUMMARY.md`** - List of all changes made

---

## 🎬 Features

### Animations
- Entrance animations on all pages
- Hover micro-interactions
- Pulsing active states
- Rotating gradients
- Floating elements
- Morphing backgrounds

### Interactions
- Scale on hover (1.02)
- Press feedback (0.98)
- Glow on focus
- Shimmer on interaction
- Smooth transitions (0.3s)

### Responsive
- Mobile-optimized layouts
- Touch-friendly targets (48px min)
- Adaptive navigation
- Reduced animations on mobile

---

## 🔧 Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Space Grotesk** - Display font
- **IBM Plex Mono** - Monospace font

---

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Color contrast (WCAG AA)
- ✅ Reduced motion support
- ✅ Screen reader friendly

---

## 🎨 Color System Quick Reference

### Tailwind Classes
```tsx
// Text Colors
text-neonCyan        // #00FFFF
text-electricBlue    // #0A84FF
text-deepPurple      // #8247E5
text-hotMagenta      // #FF0080
text-laserGreen      // #32FF96
text-arcticWhite     // #F0F8FF
text-ghost           // #C8D2DC

// Backgrounds
bg-voidBlack         // #08080C
bg-obsidian          // #0F0F14
bg-charcoal          // #191923

// Gradients
bg-gradient-primary  // Blue → Purple
bg-gradient-accent   // Magenta → Pink
bg-gradient-success  // Green → Cyan

// Effects
glass                // Glassmorphism
text-gradient        // Gradient text
text-neon           // Neon glow
shadow-glow         // Blue glow
shadow-glow-success // Green glow
shadow-glow-accent  // Magenta glow
```

---

## 🚀 Performance

- Hardware acceleration enabled
- Optimized animations
- Lazy loading where appropriate
- Reduced motion support
- GPU-optimized transforms
- Efficient re-renders with Framer Motion

---

## 🎯 Design Philosophy

**Goal**: Create a once-in-a-lifetime experience that feels:
- Futuristic & cutting-edge
- Premium & high-end
- Alive & responsive
- Memorable & distinctive
- Professional & polished

**Inspiration**:
- Apple's immersive product pages
- Severance TV show typography
- High-end audio equipment interfaces
- NASA mission control aesthetics
- Cyberpunk data terminals

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

**Note**: Requires modern browser with support for:
- CSS backdrop-filter
- CSS custom properties
- CSS gradients
- Framer Motion

---

## 🎉 What Makes This Unique

1. **100% Custom** - No templates or themes used
2. **Every Element Animated** - Nothing is static
3. **Glassmorphism Throughout** - Consistent depth
4. **Bold Color Choices** - Memorable neon palette
5. **Experimental Typography** - Distinctive fonts
6. **Gradient Everything** - Text, backgrounds, borders
7. **Technical Aesthetic** - Monospace for precision
8. **Immersive Experience** - Apple-quality polish
9. **Pulsing Life** - Breathing UI elements
10. **Dramatic Scale** - Bold sizing hierarchy

---

## 💡 Tips

### Best Practices
- Use `glass` class for depth
- Combine gradients with glows
- Add hover states to interactive elements
- Use mono font for data/metrics
- Keep animations purposeful
- Layer effects for richness

### Common Patterns
```tsx
// Premium card
<Card className="glass border-2 border-electricBlue/30 hover:shadow-glow">

// Live indicator
<span className="w-2 h-2 rounded-full bg-neonCyan animate-pulse-glow" />

// Gradient heading
<h2 className="text-3xl font-bold tracking-tighter text-gradient" />

// Glass container
<div className="glass rounded-xl p-6 border border-border/30" />
```

---

## 🐛 Troubleshooting

**Animations not working?**
- Verify Framer Motion is installed
- Check "use client" directive at top of component

**Colors look wrong?**
- Clear browser cache
- Check CSS variables in globals.css
- Verify Tailwind config

**Performance issues?**
- Reduce concurrent animations
- Check Chrome DevTools Performance tab
- Enable hardware acceleration in browser

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the implementation guide
3. Inspect the component source code
4. Test in different browsers

---

**Status**: ✅ Production Ready
**Last Updated**: 2026-02-03
**Design Version**: 2.0 - Experimental

---

Built with ❤️ and lots of gradients
