# Create Price Alert - Mobile Web Screen

A pixel-perfect React implementation of the Create Price Alert mobile screen from Figma.

## Features

✅ **Exact Figma Design**: 1:1 pixel-perfect implementation  
✅ **Editable Price Input**: The alert price ($112,500.00) is fully editable  
✅ **Interactive Elements**: All buttons and inputs have hover/active states  
✅ **Tab Switcher**: Toggle between "Set in Fiat" and "Set in Crypto"  
✅ **Quick Percentage Buttons**: Apply -5%, +5%, +10% changes instantly  
✅ **Mobile Optimized**: Designed specifically for mobile web (max-width: 438px)  
✅ **TypeScript Support**: Full type safety with TypeScript

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser at `http://localhost:3000`

## Important Notes

- **Figma Assets**: The design uses assets served from `localhost:3845`. Make sure the Figma MCP server is running for images to load properly.
- **Mobile View**: Best viewed on mobile devices or in browser's mobile device emulator (438px width).
- **Editable Field**: The second large price text ($112,500.00) is an editable input field as specified.

## Project Structure

```
src/
├── components/
│   └── CreatePriceAlert.tsx   # Main component
├── assets/
│   └── images.ts              # Asset URLs from Figma
├── App.tsx                    # App wrapper
├── main.tsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development
- **Plus Jakarta Sans** font from Google Fonts

## Interactive Features

- **Price Input**: Click on the alert price to edit
- **Percentage Buttons**: Quick adjustments with -5%, +5%, +10%
- **Tab Switcher**: Toggle between Fiat and Crypto modes
- **Settings Buttons**: All settings rows are clickable (ready for navigation)
- **Submit Button**: "Set price alert" with active state animation
