# Development Guide - Nihon Dojo Website

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm start
```

The site will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.
- Opens browser automatically at http://localhost:3000
- Page reloads when you make edits
- Lint errors appear in the console

### `npm run build`
Builds the app for production to the `build` folder.
- Optimizes React for best performance
- Bundles are minified
- Filenames include hashes for caching

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Warning: This is a one-way operation!**
Ejects from Create React App to customize build configuration.

## Debugging in VS Code

### Option 1: Launch Chrome (Recommended)
1. Press `F5` or click "Run and Debug" in VS Code
2. Select "Launch Chrome" from the dropdown
3. VS Code will automatically:
   - Start the dev server (`npm start`)
   - Launch Chrome with debugging enabled
   - Set breakpoints in your `.tsx` and `.ts` files

### Option 2: Launch Edge
Same as Chrome but uses Microsoft Edge browser.

### Option 3: Attach to Running Chrome
If you already have the dev server running:
1. Start Chrome with remote debugging:
   ```bash
   chrome.exe --remote-debugging-port=9222
   ```
2. Navigate to http://localhost:3000
3. In VS Code, select "Attach to Chrome" and press F5

## Project Structure

```
nihon_dojo_site/
├── public/
│   ├── assets/
│   │   ├── images/          # App screenshots, previews
│   │   ├── logo/            # Logo files (logo_plain.png)
│   │   └── docs/            # Legal docs (privacy, terms)
│   ├── index.html           # HTML template with SEO meta tags
│   ├── manifest.json        # PWA manifest
│   └── CNAME               # GitHub Pages domain config
├── src/
│   ├── components/
│   │   ├── Hero/           # Landing hero section
│   │   ├── Features/       # Features showcase
│   │   ├── Pricing/        # Pricing plans
│   │   ├── Roadmap/        # Product roadmap
│   │   ├── Support/        # FAQ and support
│   │   ├── Header/         # Navigation header
│   │   ├── Footer/         # Footer with links
│   │   ├── SEO/            # SEO meta tags component
│   │   └── Modal/          # Modal for legal docs
│   ├── animations/         # Framer Motion variants
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Theme and global styles
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── .vscode/
│   ├── launch.json         # Debug configurations
│   └── tasks.json          # Build tasks
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript config
```

## Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations
- **React Helmet** - SEO meta tags management

## Environment Variables

Create a `.env` file in the root (optional):
```env
REACT_APP_DISCORD_URL=https://discord.gg/your-server
REACT_APP_IOS_STORE_URL=https://apps.apple.com/app/nihondojo-ai/id6749792374
REACT_APP_ANDROID_STORE_URL=https://play.google.com/store/apps/details?id=com.nihondojo.app
```

## Color Theme

The site uses a brand crimson color scheme:
- **Primary**: `#8F1D21` (Brand Crimson)
- **Accent**: `#C91F37` (Brand Light Crimson)
- **Background**: `#121212` (Luxury Charcoal)
- **Surface**: `#1E1E1E` (Obsidian Surface)

Defined in: `src/styles/theme.ts`

## Debugging Tips

### Breakpoints
- Set breakpoints directly in `.tsx` files in VS Code
- Breakpoints work in browser DevTools and VS Code simultaneously

### Hot Reload Issues
If hot reload stops working:
```bash
# Stop the server (Ctrl+C)
# Clear cache and restart
npm start
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check all TypeScript errors
npm run build
```

## Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:

```bash
# Build for production
npm run build

# Deploy (if using gh-pages package)
npm run deploy
```

### Manual Deployment
1. Run `npm run build`
2. Upload the `build/` folder contents to your hosting provider
3. Ensure `CNAME` file is in the root with `nihondojo.ai`

## Common Issues

### Port 3000 Already in Use
```bash
# Windows: Kill process on port 3000
npx kill-port 3000

# Linux/Mac:
lsof -ti:3000 | xargs kill
```

### Chrome Not Launching
Make sure Chrome is installed and accessible from PATH:
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Mac: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

### Breakpoints Not Hit
1. Ensure source maps are enabled (already configured)
2. Clear browser cache
3. Restart both dev server and VS Code debugger

## Performance Optimization

The site uses:
- **Code splitting** - Dynamic imports for components
- **Lazy loading** - Images and components load on demand
- **Memoization** - React.memo() and useMemo() for expensive operations
- **Optimized animations** - Framer Motion with will-change and transform
- **PWA features** - Service worker for offline capability (when enabled)

## Support

For issues or questions:
- Email: support@novabox.digital
- Discord: https://discord.gg/vQjKzjGtKg
- GitHub Issues: [Repository Issues Page]

---

Built by learners who got tired of apps that don't work.
