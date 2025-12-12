# Digital Stress Test

A React-based cognitive stress assessment application for research purposes.

## Overview

Digital Stress Test is a web-based application that implements a standardized stress assessment protocol combining cognitive tasks (math) and speech tasks. Built with React 16, Material-UI, and optional Supabase backend for data collection.

**Reference:** [Skoluda et al. (2021)](https://dx.doi.org/10.2196/32280)

## Features

-  **Mobile-first design** - Optimized for smartphone use
-  **Cognitive tasks** - Math problem solving under time pressure
-  **Speech tasks** - Voice recording and analysis
-  **Performance feedback** - Real-time results visualization
-  **Multilingual** - German and English support (i18next)
-  **Privacy-focused** - Optional data collection, configurable logging
-  **Camera/Mic access** - For video analysis (optional)

## Quick Start

### Prerequisites

- Node.js 14+ (recommended: Node 16)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd only_frontend

# Install dependencies
npm install

# Run development server
npm start
```

The app will open at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# The build folder is ready to deploy
```

## Configuration

### Demo Mode (No Data Collection)

Create `.env.production`:

```bash
REACT_APP_LOGGING='false'
REACT_APP_MOBILE_ONLY='true'
REACT_APP_VIDEO_RECORDING='false'

# Dummy credentials (not used when logging is false)
REACT_APP_SUPABASE_URL=https://dummy.supabase.co
REACT_APP_SUPABASE_ANON_KEY=dummy-key
```

### Production Mode (With Data Collection)

See `SETUP.md` for full setup with Supabase database.

## Project Structure

```
src/
├── Main.js                 # Central state management
├── App.js                  # Router configuration
├── pages/                  # Study pages
│   ├── StartPage.js
│   ├── Introduction.js
│   ├── MathTaskTutorial.js
│   ├── MathTask.js
│   ├── MathTaskResult.js
│   ├── SpeechTaskTutorial.js
│   ├── SpeechTask.js
│   └── EndPage.js
├── components/             # Reusable components
├── services/               # API services
├── locales/                # Translations (de/en)
└── __tests__/              # Unit tests
```

## Study Flow

The application guides participants through these stages:

1. **Start Page** - Welcome and consent
2. **Introduction** - Study information and camera setup
3. **Math Task Tutorial** - Instructions and demographics
4. **Math Task** - 5 minutes of arithmetic problems
5. **Math Task Results** - Performance feedback
6. **Speech Task Tutorial** - Instructions for speech task
7. **Speech Task** - Structured speaking tasks
8. **End Page** - Completion message

## Development

### Available Scripts

```bash
npm start          # Development server
npm test           # Run tests
npm run build      # Production build
npm run eject      # Eject from create-react-app (not recommended)
```

### Environment Variables

- `REACT_APP_LOGGING` - Enable/disable data collection ('true'/'false')
- `REACT_APP_MOBILE_ONLY` - Restrict to mobile devices ('true'/'false')
- `REACT_APP_VIDEO_RECORDING` - Enable video recording ('true'/'false')
- `REACT_APP_SUPABASE_URL` - Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Supabase anonymous key

## Deployment

### Quick Deploy (Recommended)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Visit [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `build` folder
   - Get your live URL instantly!

### Other Options

- **Netlify** (with Git integration) - Automatic deployments
- **Vercel** - Zero-config deployments
- **GitHub Pages** - Free hosting for public repos
- **Any static hosting** - Just upload the `build` folder

See `SETUP.md` for detailed deployment instructions.

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- Introduction.test.js
```

## Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note:** Camera and microphone access requires HTTPS (automatic on Netlify/Vercel).

## Internationalization

The app supports multiple languages via i18next:

- **German (de)** - Default
- **English (en)**

Translation files: `src/locales/de/translation.json` and `src/locales/en/translation.json`

## Technical Stack

- **Frontend:** React 16.14, Material-UI 4.11
- **Routing:** React Router (HashRouter)
- **Charts:** Chart.js
- **i18n:** i18next
- **Backend (optional):** Supabase (PostgreSQL)
- **Build:** create-react-app

## Contributing

This is a research project. Please contact the maintainers before making contributions.

## License

Contact maintainers for usage permissions:
[Multimodal Behavior Processing Group, Bielefeld University](https://www.uni-bielefeld.de/fakultaeten/technische-fakultaet/arbeitsgruppen/multimodal-behavior-processing/)

## Support

For issues or questions:
1. Check `SETUP.md` for configuration help
2. Review the test files for usage examples
3. Contact the project maintainers

## Citation

If you use this software in your research, please cite:

Skoluda N, Strahler J, Schlotz W, Niederberger L, Marques S, Fischer S, Kappert MB, Nater UM.
*Intra-individual psychological and physiological responses to acute laboratory stressors of different intensity.*
Psychoneuroendocrinology. 2015 Jan;51:227-36.
doi: [10.2196/32280](https://dx.doi.org/10.2196/32280)

---

**Built with <3 for research**
