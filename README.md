# Thought App

A mobile-first motivational quotes app where users can share and discover inspiring thoughts.

## Features

- 📱 Mobile-optimized design with touch-friendly interactions
- ✨ Create and share motivational thoughts
- 🔍 Search and filter thoughts by tags
- ❤️ Like and share thoughts
- 🏷️ Tag-based organization
- 📱 PWA-ready with mobile app capabilities

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for mobile-first styling
- Lucide React for icons
- Date-fns for date formatting
- Mobile-optimized components and interactions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mobile Features

- Touch-optimized buttons (44px minimum height)
- Safe area support for notched devices
- Swipe gestures and long-press interactions
- Mobile-first responsive design
- PWA manifest for app-like experience

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ThoughtCard.tsx # Individual thought display
│   └── CreateThought.tsx # Create new thought modal
├── types/              # TypeScript type definitions
├── App.tsx            # Main application component
├── index.tsx          # React entry point
└── index.css          # Global styles with Tailwind
```

## Mobile Considerations

- Optimized for portrait orientation
- Touch-friendly spacing and sizing
- Fast animations (200-300ms)
- Minimal scrolling and efficient layouts
- Native sharing capabilities
