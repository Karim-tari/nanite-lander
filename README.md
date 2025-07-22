# Nanite Landing Page with HeroUI

A clean, minimalist landing page for Nanite built with HeroUI components and Tailwind CSS. Inspired by modern, centered design aesthetics.

## Features

- **Clean Minimalist Design**: Inspired by modern, centered layouts
- **HeroUI Integration**: Modern UI components with excellent accessibility
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Smooth Animations**: Word-by-word text animations and interactive effects
- **Responsive Design**: Optimized for all device sizes
- **Email Signup**: Clean inline form with validation and success states
- **Light Theme**: Clean, modern light design
- **Interactive Elements**: Subtle hover effects and animations

## Design Philosophy

- **Centered Layout**: All content is centered for maximum focus
- **Minimal Color Palette**: Clean whites and grays with subtle accents
- **Generous Spacing**: Plenty of whitespace for a breathable design
- **Subtle Interactions**: Gentle hover effects and micro-animations
- **Typography First**: Clean, readable Inter font hierarchy

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- HeroUI Components
- Modern CSS Grid and Flexbox

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Development

Start the development server:
```bash
npm run dev
```

This will start a live-server on `http://localhost:3000` with hot reload.

### Build

To build the CSS for production:
```bash
npm run build
```

## Project Structure

```
├── index.html          # Clean HTML with HeroUI components
├── styles.css          # Minimal styles with Tailwind directives
├── script.js           # Lightweight interactions
├── tailwind.config.js  # Tailwind/HeroUI configuration
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Key Features

### Content Sections

- **Status Badge**: Clean early access indicator with icon
- **Hero Section**: Centered headline with animated text reveal
- **Value Proposition**: Concise explanation of Nanite benefits
- **Feature Grid**: Three key selling points in clean cards
- **Inline Form**: Streamlined signup with pill-style input
- **Clean Footer**: Minimal social links and navigation

### Design Elements

- **Centered Layout**: Everything aligned to center for focus
- **Clean Typography**: Inter font with proper hierarchy
- **Subtle Animations**: Smooth, non-intrusive motion
- **Interactive Cards**: Gentle hover effects on features
- **Pill-style Form**: Modern rounded input and button design
- **Minimal Footer**: Fixed bottom navigation

### Animations

- Word-by-word text reveal animation
- Staggered content fade-ins
- Smooth form interactions
- Subtle ripple button effects
- Gentle hover transitions
- Clean success states

### Responsive Design

- Mobile-first approach
- Stacked layout on mobile
- Adaptive form design
- Optimized touch targets

## Content

### Messaging
- **Headline**: "Access the Best AI Tools—Completely Free"
- **Value Prop**: Simple explanation of fuel earning system
- **Features**: Video generation, LLM access, zero cost

### Key Benefits
- 🎥 Generate videos with cutting-edge models
- ✍️ Write, code, and create with the best LLMs
- 💸 Zero subscriptions. One place. All free.

## Customization

### Colors
The design uses a minimal color palette:
```css
Primary: #1a1a1a (dark text)
Secondary: #666 (muted text)
Background: #ffffff (clean white)
Accent: rgba(0, 0, 0, 0.05) (subtle grays)
```

### Layout
- Centered content with max-width of 600px
- Fixed header and footer
- Generous spacing between sections
- Clean grid system for features

### Typography
```css
Font: Inter
Sizes: 
  - Headline: clamp(2.5rem, 5vw, 4rem)
  - Subtitle: 18px
  - Body: 14px
  - Small: 13px
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports reduced motion preferences
- Progressive enhancement approach

## License

MIT License - feel free to use this code for your own projects. 