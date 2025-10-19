# User Finder

A modern, fully-tested user search application built with React, TypeScript, and TanStack Query.

🔗 **Live Demo:** [https://user-finder.pabloaviles.dev/](https://user-finder.pabloaviles.dev/)

## Features

- 🔍 **Real-time search** with debouncing for optimal UX
- 📋 **Predictive search dropdown** with smooth animations
- 👤 **User details view** with complete information
- 🎨 **Dark/Light/System theme** with persistence
- ⚡ **Optimized caching** using TanStack Query
- 🧪 **Comprehensive testing** (unit + E2E)
- 📱 **Fully responsive** design
- ♿ **Accessible** components

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 + Shadcn UI
- **State Management:** Zustand + Context API
- **Data Fetching:** TanStack Query
- **Testing:** Vitest + React Testing Library + Playwright
- **Code Quality:** Biome (linter/formatter) + Husky
- **CI:** GitHub Actions + Docker

## Architecture Highlights

- **Feature-based folder structure** for scalability
- **Repository pattern** for API communication
- **Separation of concerns** (UI, logic, services)
- **Custom hooks** for reusable logic
- **Type-safe** throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ (or 20+ recommended)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pablo-aviles-prieto/user-finder.git
cd user-finder

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_USER_API_ENDPOINT=
```

### Development

```bash
# Start development server
pnpm dev

# Run with test mode (no retries on failed queries)
pnpm dev --mode test
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Code Quality
- `pnpm lint` - Check code quality
- `pnpm lint:fix` - Fix linting issues automatically

### Testing

#### Unit Tests
- `pnpm test:unit` - Run unit tests
- `pnpm test:unit:watch` - Run tests in watch mode
- `pnpm test:unit:ui` - Open Vitest UI
- `pnpm test:unit:coverage` - Generate coverage report

#### E2E Tests
- `pnpm test:e2e` - Run Playwright tests
- `pnpm test:e2e:ui` - Open Playwright UI
- `pnpm test:e2e:headed` - Run tests in headed mode
- `pnpm test:e2e:report` - View test report

## Project Structure

```
src/
├── components/        # Shared UI components
├── context/          # React Context providers
├── features/         # Feature-based modules
│   ├── search/       # Search functionality
│   ├── theme/        # Theme management
│   └── user-details/ # User details display
├── hooks/            # Custom React hooks
├── services/         # API services (Repository pattern)
├── test/             # Test utilities
├── types/            # TypeScript types
└── e2e/              # End-to-end tests
```

## Testing

### Unit Tests
Tests are colocated with features in `__tests__` folders using Vitest and React Testing Library.

```bash
pnpm test:unit
```

### E2E Tests
End-to-end tests use Playwright to test real user flows.

```bash
pnpm test:e2e
```

## CI/CD

The project includes GitHub Actions workflows for:
- ✅ Code quality checks (linting)
- ✅ Unit and E2E test execution
- ✅ Automated Docker image builds
- ✅ Semantic versioning

> **Note:** The application is deployed using ArgoCD + Kubernetes on a private server, which monitors this repository for new Docker images.

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t user-finder .

# Run container
docker run -p 8080:80 user-finder
```

Access at `http://localhost:8080`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

---

**Built with ❤️ by Pablo Avilés**