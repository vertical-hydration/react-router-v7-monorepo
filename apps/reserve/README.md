# Welcome to Reserve!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Documentation

For detailed setup instructions, configuration options, and advanced usage, refer to the [project documentation](./docs/README.md).

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
# Copy the example environment variables file to create a local configuration
cp .dev.vars.example .dev.vars

# Copy the example Cloudflare Wrangler configuration file to create a local configuration
cp wrangler.jsonc.example wrangler.jsonc

# Start the development server
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Previewing the Production Build

Preview the production build locally:

```bash
# ...existing code...
```