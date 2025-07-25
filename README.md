# ✨ TaskFlow - Modern Task Manager

A beautiful, modern task management application built with React, TypeScript, and Three.js. Features a stunning animated starfield background and glassmorphism design.

## 🚀 Live Demo

**[Live Demo Link - Coming Soon]**

## ✨ Features

- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **🌙 Dark/Light Theme** - Toggle between themes with system preference detection
- **⭐ 3D Background** - Animated starfield with shooting stars using Three.js
- **📝 Task Management** - Add, edit, delete, and complete tasks
- **🏷️ Priority System** - Low, medium, and high priority levels
- **📅 Due Dates** - Set and track task deadlines
- **💾 Persistent Storage** - Tasks saved automatically to localStorage
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Fast Performance** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Storage**: localStorage

## 🎯 Key Functionality

- **Task Limit**: Maximum 5 tasks for focused productivity
- **Real-time Updates**: Instant UI updates with smooth transitions
- **Theme Persistence**: Remembers your theme preference
- **Data Persistence**: All tasks saved automatically
- **Priority Sorting**: Tasks sorted by completion status and priority
- **Progress Tracking**: Visual progress bar showing completion status

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AddTask.tsx     # Task creation form
│   ├── Task.tsx        # Individual task component
│   ├── TaskList.tsx    # Task list container
│   ├── Header.tsx      # App header with theme toggle
│   ├── Footer.tsx      # App footer
│   └── ThreeBackground.tsx # 3D starfield background
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   ├── useTasks.ts     # Task management logic
│   └── useTheme.ts     # Theme hook
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
└── App.tsx             # Main app component
```

## 🎨 Design Features

- **Glassmorphism Effects**: Semi-transparent elements with backdrop blur
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Theme-Responsive**: Colors and elements adapt to light/dark themes
- **3D Starfield**: Dynamic background with twinkling stars and shooting meteors
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Enhanced**: Full features on desktop screens

## 🔧 Configuration

The app uses Tailwind CSS v4 with custom configuration for:

- Dark mode support
- Custom animations
- Glassmorphism effects
- Responsive breakpoints

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
