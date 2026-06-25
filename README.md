# Ubika Admin

A modern healthcare dashboard built with **React + Vite**, for managing appointments, medications, lab results, conditions, allergies, and patient records.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router v6** — client-side routing
- **TanStack React Query** — data fetching and caching
- **shadcn/ui** + **Radix UI** — component library
- **Tailwind CSS v4** — styling
- **Recharts** — data visualization
- **React Hook Form** + **Zod** — form handling and validation
- **Axios** — HTTP client

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://your-api-url/api/v1
VITE_API_TOKEN=your_api_token
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── App.tsx                  # Root router setup
├── main.tsx                 # React DOM entry point
├── index.css                # Global styles + Tailwind
├── app/
│   ├── (auth)/              # Auth pages (register, steps)
│   └── (portal)/            # Portal pages (dashboard, patient, etc.)
├── api-services/            # Axios instance + API service functions
├── components/
│   ├── common/              # Shared components (DataTable, Pagination, etc.)
│   ├── custom-ui/           # Custom UI primitives
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
└── lib/                     # Utilities (cn, tokens, status helpers)
```

## Deployment

Build the app for production:

```bash
npm run build
```

The output is in the `dist/` folder — deploy it to any static hosting provider (Netlify, Vercel, AWS S3, etc.).
