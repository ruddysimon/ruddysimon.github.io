# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Features a beautiful video background, smooth animations, and a clean design showcasing data science projects, experience, and books.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **bun** package manager

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd portfolio_website/data-vibe-folio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   or
   ```bash
   bun install
   ```

### Running the Development Server

Start the development server with:

```bash
npm run dev
```

The server will start on **http://localhost:8080**

You can also use:
- `yarn dev`
- `bun dev`

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- ESLint for code quality

### Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
data-vibe-folio/
├── public/                 # Static assets (videos, images, PDFs)
│   ├── background-video.mp4
│   ├── books.mp4
│   ├── ocean-waves.mp3
│   └── Ruddy-Simonpour-Resume.pdf
├── src/
│   ├── components/         # React components
│   │   ├── AboutSection.tsx
│   │   ├── BooksSection.tsx
│   │   ├── BooksVideoBackground.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── VideoBackground.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Books.tsx       # Books page
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🎨 Features

- **Modern UI/UX**: Clean, professional design with glassmorphism effects
- **Video Backgrounds**: Dynamic video backgrounds for different pages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in effects and hover animations
- **Routing**: Multi-page navigation with React Router
- **TypeScript**: Full type safety
- **Component Library**: Built with shadcn/ui components

## 📄 Pages

- **Home (`/`)**: Main portfolio page with hero, about, experience, and projects sections
- **Books (`/books`)**: Data science book recommendations with descriptions and key topics

## 🛠️ Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Port Configuration

The development server runs on port **8080** by default. You can change this in `vite.config.ts`:

```typescript
server: {
  host: "::",
  port: 8080,  // Change this to your preferred port
},
```

### Environment Variables

If you need environment variables, create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📦 Dependencies

### Key Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **shadcn/ui** - UI component library

See `package.json` for the complete list of dependencies.

## 🚢 Deployment

This project is configured for GitHub Pages deployment. See `DEPLOYMENT.md` for detailed deployment instructions.

### Quick Deploy Steps

1. Build the project: `npm run build`
2. Push to GitHub (if using GitHub Actions, it will auto-deploy)
3. Your site will be live at your GitHub Pages URL

## 🐛 Troubleshooting

### Port Already in Use

If port 8080 is already in use:

1. Change the port in `vite.config.ts`
2. Or kill the process using port 8080:
   ```bash
   # macOS/Linux
   lsof -ti:8080 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```

### Dependencies Issues

If you encounter dependency issues:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

If the build fails:

1. Check for TypeScript errors: `npm run lint`
2. Ensure all dependencies are installed: `npm install`
3. Clear the build cache: `rm -rf dist`

## 📝 Notes

- The project uses **Vite** for fast development and optimized builds
- **Tailwind CSS** is used for styling with custom color schemes
- Video backgrounds are optimized for web playback
- The site is fully responsive and works on all modern browsers

## 📧 Contact

For questions or issues, please contact: ruddy.simonpour@gmail.com

---

Built with ❤️ using React, TypeScript, and Vite
