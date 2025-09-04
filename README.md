# 📱 CryptoWatchrr

A pixel-perfect mobile web application for creating cryptocurrency price alerts, built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Price Alerts**: Set custom price targets with dynamic percentage calculations
- **Multiple Cryptocurrencies**: Support for Bitcoin, Ethereum, and other major cryptocurrencies
- **Smart Input System**: Auto-scaling text input that prevents cutoff for large numbers

### 🔔 Notification System
- **Multiple Notification Types**: Push, Email, and SMS notifications
- **Flexible Frequency**: Choose between one-time or recurring alerts
- **Custom Alert Tones**: 7 unique sound options with live preview

### 🎨 User Experience
- **Pixel-Perfect Design**: 1:1 implementation from Figma designs using Figma MCP
- **Draggable Modals**: Smooth slide-in animations with drag-to-close functionality
- **Responsive Design**: Optimized for mobile with Dynamic Island support
- **Interactive Elements**: Hover states, smooth transitions, and visual feedback

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite
- **Audio System**: HTML5 Audio API with custom sound management
- **State Management**: React hooks (useState, useRef, useEffect)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CryptoWatchrr.git
cd CryptoWatchrr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── CreatePriceAlert.tsx    # Main price alert interface
│   ├── AlertNameModal.tsx      # Draggable alert naming modal
│   ├── NotificationsModal.tsx  # Notification preferences modal
│   ├── FrequencyModal.tsx      # Alert frequency selection modal
│   └── ToneModal.tsx          # Custom tone selection modal
├── assets/
│   └── images.ts              # Centralized asset management
├── App.tsx                    # Root application component
└── main.tsx                   # Application entry point

Sound Alerts/                 # Audio files for alert tones
├── Default.mp3
├── BubblePop.mp3
├── BellDing.mp3
├── ChaChing.mp3
├── AlienPulse.mp3
├── Sonar.mp3
└── Danger.mp3
```

## 🎵 Alert Tones

The app includes 7 professionally crafted alert tones:
- **Default**: Classic notification sound
- **Bubble Pop**: Playful bubble sound effect
- **Bell Ding**: Traditional bell chime
- **Cha-Ching!**: Cash register sound for profit alerts
- **Alien Pulse**: Futuristic sci-fi tone
- **Sonar**: Submarine-style ping
- **Danger**: Urgent alert sound

## 📱 Mobile Optimization

- **Dynamic Island Support**: Extra padding for modern iPhones
- **Touch-Friendly**: Large tap targets and smooth drag interactions
- **Performance Optimized**: Efficient rendering and state management
- **Responsive Typography**: Auto-scaling text for various screen sizes

## 🎨 Design System

Built with a comprehensive design system featuring:
- **Custom Color Palette**: Carefully selected colors for optimal readability
- **Typography Scale**: Plus Jakarta Sans font with precise sizing
- **Component Library**: Reusable UI components with consistent styling
- **Animation System**: Smooth transitions and micro-interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Key Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript Support**: Full type safety and IntelliSense
- **Modern Build System**: Optimized bundling with Vite
- **Component Architecture**: Modular, reusable component design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design specifications provided via Figma MCP integration
- Sound effects sourced from professional audio libraries
- Built with modern web technologies and best practices

---

**CryptoWatchrr** - Never miss a crypto opportunity again! 🚀