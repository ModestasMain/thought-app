# Thought App - React Native

A React Native app built with Expo SDK 53 for sharing and discovering motivational thoughts.

## Features

- Create and share thoughts with tags
- Like and share thoughts
- Search and filter by tags
- Infinite scroll for loading more thoughts
- Modern mobile-first UI design

## Tech Stack

- React Native 0.76.3
- Expo SDK 53
- TypeScript
- Expo Router for navigation
- React Native Reanimated for animations

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with Expo Go app on your device

## Development

- `npm start` - Start Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version

## Project Structure

```
├── app/                 # Expo Router screens
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Main app screen
├── src/
│   ├── components/     # React Native components
│   │   ├── ThoughtCard.tsx
│   │   └── CreateThought.tsx
│   └── types/          # TypeScript type definitions
├── assets/             # Images, fonts, icons
└── package.json        # Dependencies and scripts
```

## Assets Required

Before running, you'll need to add these assets:
- `assets/icon.png` (1024x1024)
- `assets/splash.png` (1242x2436)
- `assets/adaptive-icon.png` (1024x1024)
- `assets/favicon.png` (48x48)
- `assets/fonts/Inter-Bold.ttf`
- `assets/fonts/Inter-Regular.ttf`

## Building for Production

```bash
expo build:android  # Build APK
expo build:ios      # Build iOS app
```
