# Personal Portfolio

A modern developer portfolio built with React, Three.js, and Framer Motion — featuring a 3D interactive astronaut model, scroll-driven animations, and a space-themed design.

## Preview

Link: 

## Tech Stack

- **React** — Component-based UI
- **Three.js / React Three Fiber** — 3D model rendering (GLB astronaut with blink animation)
- **Framer Motion** — Page transitions, scroll animations, and micro-interactions
- **Tailwind CSS** — Utility-first styling
- **EmailJS** — Contact form email delivery (no backend needed)

## Features

- **3D Hero Section** — Interactive astronaut model with parallax space background and particle effects
- **Animated Text** — Staggered entry animations and keyword flip effect (Intelligent → Modern → Scalable)
- **Bento Grid About Section** — Interactive draggable cards, 3D globe, and orbiting tech stack icons
- **Project Showcase** — Mouse-follow preview images with detailed modal popups
- **Shooting Star Particles** — Canvas-based starfield with animated shooting stars in the contact section
- **Scroll-Driven Timeline** — Purple progress line that fills as you scroll through projects
- **Responsive Design** — Fully optimized for desktop and mobile
- **Contact Form** — Direct email delivery via EmailJS integration

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/2sumC/3D-Porfolio-Responsive.git

# Navigate to the project
cd 3D-Portfolio-Responsive

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Environment Setup

To enable the contact form, create an account at [EmailJS](https://www.emailjs.com/) and update the service ID, template ID, and public key in `src/sections/Contact.jsx`.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Astronaut.jsx      # 3D astronaut model (Three.js)
│   ├── Card.jsx           # Draggable skill cards
│   ├── FlipWords.jsx      # Keyword rotation animation
│   ├── Frameworks.jsx     # Orbiting tech stack icons
│   ├── globe.jsx          # 3D globe component
│   ├── OrbitingCircles.jsx # Circular orbit animation
│   ├── Particles.jsx      # Starfield + shooting stars
│   └── ...
├── sections/          # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── ...
├── constants/         # Static data (projects, socials, etc.)
│   └── index.js
├── App.jsx            # Main app layout
├── index.css          # Global styles + Tailwind config
└── main.jsx           # Entry point
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Any push to the `main` branch triggers an automatic redeployment.

## Customization

To make this portfolio your own:

1. **Personal info** — Edit `src/constants/index.js` (name, projects, socials, education)
2. **Hero text** — Update `src/components/HeroText.jsx` (tagline, flip words)
3. **3D model** — Replace the GLB file in the assets folder
4. **Color theme** — Modify CSS variables in `src/index.css`
5. **Contact form** — Update EmailJS credentials in `src/sections/Contact.jsx`

## License

This project is open source and available under the [MIT License](LICENSE).