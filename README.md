# CareerTrackr 🚀
*Organize your job search. Track every step. Land faster.*

A modern, full-stack job application tracking system built with Next.js 15, TypeScript, and PostgreSQL. Track your job search progress with beautiful analytics, organized job applications, and intuitive management tools.

🔗 **Live Demo**: [CareerTrackr on Vercel](https://jobquest-demo.vercel.app)

## ✨ Features

- **📊 Analytics Dashboard** - Visualize your job search progress with interactive charts and statistics
- **📝 Job Management** - Add, edit, and organize job applications with custom tags
- **🔐 Authentication** - Secure login with NextAuth.js (Credentials)
- **📱 Responsive Design** - Beautiful UI that works on all devices
- **🎨 Modern UI** - Built with Tailwind CSS and Radix UI components
- **⚡ Real-time Updates** - Smooth animations and transitions with Framer Motion
- **🏷️ Tag System** - Organize jobs with custom tags for better categorization
- **🔍 Advanced Filtering** - Filter jobs by status, type, location, and search terms

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Recharts** - Chart library for data visualization
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication framework
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Docker** - Containerization
- **Prisma Migrate** - Database migrations
- **TypeScript** - Static type checking

## 📁 Project Structure

```
jobquest/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/               # API routes
│   │   │   ├── 📁 auth/          # Authentication endpoints
│   │   │   ├── 📁 jobs/          # Job management endpoints
│   │   │   └── 📁 user/          # User management endpoints
│   │   ├── 📁 auth/              # Authentication pages
│   │   ├── 📁 dashboard/         # Dashboard pages
│   │   │   ├── 📁 applications/  # Job applications page
│   │   │   └── 📁 settings/      # User settings page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 common/            # Common utilities
│   │   ├── 📁 dashboard/         # Dashboard-specific components
│   │   ├── 📁 job/               # Job-related components
│   │   └── 📁 ui/                # UI component library
│   ├── 📁 layout/                # Layout components
│   ├── 📁 lib/                   # Utility libraries
│   ├── 📁 provider/              # React context providers
│   └── 📁 types/                 # TypeScript type definitions
├── 📁 prisma/                    # Database schema and migrations
├── 📁 public/                    # Static assets
├── 📁 data/                      # Local database data (Docker)
├── docker-compose.yml            # Docker configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```
## Screenshots

<img width="1710" height="1107" alt="Screenshot 2025-09-25 at 5 55 56 PM" src="https://github.com/user-attachments/assets/414baf72-2c26-4fee-9329-9504f939ef80" />

<img width="1710" height="1107" alt="Screenshot 2025-09-25 at 5 55 38 PM" src="https://github.com/user-attachments/assets/1e6e5371-9b43-4a8d-97ec-41d3667fed6f" />

## 🚀 Quick Start

## Developer Notes

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) recommended version is v22 +
- **npm**, **yarn**, or **bun** (package manager) personally i used bun
- **Docker** (for local database)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobquest
   ```

2. **Install dependencies**
   
   Choose your preferred package manager:
   
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using bun (recommended for faster installs)
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:password@localhost:5432/jobquest?schema=public"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # PostgreSQL (for Docker)
   POSTGRES_USER="postgres"
   POSTGRES_PASSWORD="password"
   POSTGRES_DB="jobquest"
   ```

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database with sample data
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using yarn
   yarn dev
   
   # Using bun
   bun dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

### User
- User authentication and profile information
- One-to-many relationship with jobs and tags

### Job
- Job application details including company, role, status, etc.
- Many-to-many relationship with tags
- Belongs to a user

### Tag
- Custom labels for organizing jobs
- Many-to-many relationship with jobs
- Belongs to a user

### JobTag
- Junction table for job-tag relationships

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:seed      # Seed database with sample data
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate dev  # Run database migrations
npx prisma generate  # Generate Prisma client
```

## 🐳 Docker Setup

The project includes Docker configuration for local development:

```bash
# Start PostgreSQL database
docker-compose up -d

# Stop the database
docker-compose down

# View database logs
docker-compose logs postgres
```



## 📱 Features Overview

### Dashboard
- **Statistics Cards** - View total applications, interviews, offers, and rejections
- **Pie Chart** - Visual breakdown of application statuses
- **Line Chart** - Track application trends over time
- **Recent Jobs Table** - Quick overview of latest applications

### Job Management
- **Add Jobs** - Create new job applications with detailed information
- **Edit Jobs** - Update existing job applications
- **Filter & Search** - Find jobs by status, type, location, or keywords
- **Tag System** - Organize jobs with custom tags
- **Status Tracking** - Track application progress through different stages

### User Settings
- **Profile Management** - Update user information
- **Account Settings** - Manage account preferences

## 🎨 UI Components

The project uses a custom component library built on top of Radix UI:

- **Forms** - Accessible form components with validation
- **Modals** - Job creation and editing modals
- **Tables** - Data tables with sorting and filtering
- **Charts** - Interactive data visualization components
- **Navigation** - Responsive sidebar navigation
- **Buttons** - Consistent button styling and behavior

## 🔧 Configuration

### Next.js Configuration
- **Turbopack** - Enabled for faster development builds
- **TypeScript** - Strict mode enabled
- **ESLint** - Configured with Next.js rules

### Tailwind CSS
- **Custom CSS Variables** - For consistent theming
- **Dark Mode** - Built-in dark mode support
- **Responsive Design** - Mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- **Netlify** 
- **DigitalOcean**
- **AWS**
- **Vercel** (Recommended) 
