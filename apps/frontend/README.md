# 🏥 Patient Management System - Frontend

A modern web application for medical patient management, built with **Next.js 15**, **React 19**, and **TypeScript**. This application enables healthcare providers to manage patient records, update clinical statuses, and maintain a complete history of status changes.

## 🚀 Key Features

### 📋 Patient Management

- **Patient List**: Visualization in table or card mode
- **Patient Creation**: Complete form with validation
- **Status Updates**: Dynamic clinical status changes
- **Status History**: Complete tracking of status changes
- **Advanced Filters**: Filter by medical provider and clinical status

### 🎨 User Interface

- **Responsive Design**: Optimized for desktop and mobile
- **Table/Card Mode**: Two different views for patient list
- **Toast Notifications**: Visual feedback for user actions
- **Loading States**: Loading indicators during operations
- **Error Handling**: Elegant error management

### 🔧 Technical Features

- **TypeScript**: Complete static typing
- **Forms**: Validation with Formik and Yup
- **HTTP Client**: Axios with interceptors and error handling
- **Global State**: Context API for state management
- **Custom Hooks**: Reusable logic

## 🛠️ Technology Stack

### Core Framework

- **Next.js 15.3.4**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript 5**: Static typing for better development experience
- **Tailwind CSS 4**: Utility-first CSS framework

### State Management & Forms

- **Formik 2.4.6**: Form handling and validation
- **Yup 1.6.1**: Schema validation
- **Context API**: Global application state management

### HTTP & API Communication

- **Axios 1.10.0**: HTTP client with interceptors
- **AbortController**: Request cancellation support

### UI/UX Components

- **Lucide React 0.525.0**: Modern iconography
- **Tailwind CSS**: Utility classes for styling
- **Custom Components**: Reusable UI components

### Development Tools

- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Stylelint**: CSS/SCSS linting
- **Turbo**: Build system and caching

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Main application layout
│   ├── page.tsx           # Home page component
│   ├── patients/          # Patient routes
│   │   ├── new/           # Create new patient
│   │   └── [id]/          # Patient detail page
│   └── providers/         # Context providers
├── components/            # React components
│   ├── patients/          # Patient-specific components
│   │   ├── PatientList.tsx
│   │   ├── CreatePatientForm.tsx
│   │   ├── TableMode.tsx
│   │   ├── CardMode.tsx
│   │   ├── EmptyPatients.tsx
│   │   └── PatientHistory.tsx
│   ├── ui/                # Reusable UI components
│   ├── providers/         # Provider components
│   ├── NavBar.tsx         # Navigation bar
│   └── index.ts           # Component exports
├── context/               # Context API definitions
│   └── StatusProviderContext.tsx
├── hooks/                 # Custom React hooks
│   ├── useApi.ts          # API call hook
│   ├── useStatusManagement.ts
│   ├── UsePortal.tsx
│   └── index.ts
├── lib/                   # Library utilities
├── models/                # TypeScript type definitions
│   ├── patients.ts        # Patient types
│   ├── provider.ts        # Provider types
│   ├── status.ts          # Status types
│   ├── apiResponse.ts     # API response types
│   ├── useApiCall.ts      # API hook types
│   └── index.ts
├── services/              # API services
│   ├── patientsService.ts # Patient API services
│   ├── providersService.ts
│   ├── statusesService.ts
│   ├── axios.ts           # Axios configuration
│   └── index.ts
├── styles/                # Global styles
├── utils/                 # Utility functions
└── types/                 # Additional type definitions
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** or **Bun 1+**
- **Docker** (optional, for complete development environment)

### Local Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd technical-challenge
```

2. **Install dependencies**

```bash
# With Bun (recommended)
bun install

# With npm
npm install
```

3. **Configure environment variables**

```bash
cp env.template .env
# Edit .env with your configurations
```

4. **Run in development mode**

```bash
# Frontend only
cd apps/frontend
bun run dev

# Or from project root
bun run dev --filter=frontend
```

### Docker Development

1. **Run the complete stack**

```bash
docker-compose up -d
```

2. **Access the application**

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Adminer (DB): http://localhost:8080

## 📡 API Integration

### Configuration

The application connects to the backend through the environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Main Endpoints

- `GET /api/patients` - List all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient details
- `PATCH /api/patients/:id/status` - Update patient status
- `GET /api/patients/:id/status-history` - Get status history
- `GET /api/providers` - List all providers
- `GET /api/statuses` - List all statuses

### Error Handling

- **Axios Interceptors**: Centralized error handling
- **AbortController**: Request cancellation
- **Toast Notifications**: Visual error feedback

## 🎯 Core Components

### PatientList

Main component that handles the patient list with:

- Toggle between table/card view
- Real-time status updates
- Provider and status filters
- Action notifications

### CreatePatientForm

Creation form with:

- Complete Yup validation
- Formik integration
- API error handling
- Automatic redirection

### TableMode/CardMode

Two different views for the patient list:

- **TableMode**: Tabular view with all columns
- **CardMode**: Card view for better mobile UX

## 🔧 Custom Hooks

### useApi

Generic hook for API calls with:

- Loading state management
- Error handling
- Optional auto-fetch
- Request cancellation

### useStatusManagement

Hook for patient status management:

- Status updates
- Change history
- Validations

## 🎨 Design System

### Tailwind CSS

- Custom configuration
- Utility components
- Responsive design
- Consistent theming

### UI Components

- **Toast**: Temporary notifications
- **Loading Spinner**: Loading indicators
- **Buttons**: Consistent button styles
- **Forms**: Form field components

## 🧪 Testing & Quality Assurance

### Code Quality

```bash
# ESLint
bun run lint
bun run lint:fix

# Stylelint
bun run lint:style

# Prettier
bun run format
```

### Build Process

```bash
# Development
bun run dev

# Production
bun run build
bun run start
```

## 🐳 Docker

### Development

```bash
# Build image
docker build -f apps/frontend/Dockerfile -t frontend:dev .

# Run container
docker run -p 3001:3001 frontend:dev
```

### Production

```bash
# Build for production
docker build -f apps/frontend/Dockerfile --target production -t frontend:prod .

# Run
docker run -p 3001:3001 frontend:prod
```

## 📊 Performance & Monitoring

### Metrics

- **Core Web Vitals**: Automatic optimization with Next.js
- **Bundle Analysis**: Bundle size analysis
- **Lighthouse**: Performance auditing

### Optimizations

- **Code Splitting**: Automatic code division
- **Image Optimization**: Image optimization
- **Font Optimization**: Optimized font loading
- **Caching**: Intelligent caching strategies

## 🔒 Security

### Best Practices

- **TypeScript**: Compile-time type validation
- **ESLint**: Security issue detection
- **Environment Variables**: Secure configuration
- **Input Validation**: Form validation

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Production

```bash
# Build and run
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🆘 Support

For technical support or questions:

- Create an issue on GitHub
- Contact the development team
- Review the backend documentation

---

**Developed with ❤️ using Next.js, React, and TypeScript**
