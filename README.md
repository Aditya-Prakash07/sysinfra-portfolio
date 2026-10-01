# System Infra Solutions — Enterprise Web Platform

Official web application, product catalog, and telemetry management portal for **System Infra Solutions Private Limited (SISPL)**. SISPL is an ISO-certified engineering manufacturer of telecom power automation, AMF controllers, SYS-AXS NOC telemetry platforms, 5G smart enclosures, and tactical wireless networks.

---

## Tech Stack & Architecture

- **Backend Framework**: Laravel 11.x (PHP 8.2+)
- **Frontend Stack**: React 18 + Inertia.js 2.x
- **Styling**: Tailwind CSS v3 with custom dark/light theme tokens and ambient lighting
- **Admin Panel**: Filament v3 Admin Suite (`/admin`)
- **Database**: SQLite (local development & edge deployment) / MySQL compatible
- **Asset Pipeline**: Vite 8.x with Tailwind & React compiler
- **Deployment**: Vercel Serverless (`vercel-php`) & traditional LAMP/LEMP environments

---

## Getting Started

### Prerequisites

- PHP 8.2+ with `pdo_sqlite`, `mbstring`, `openssl`, `curl`
- Composer 2.x
- Node.js 18+ and npm

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya-Prakash07/sysinfra-portfolio.git
   cd sysinfra-portfolio
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

4. **Environment setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup & migrations:**
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

6. **Build frontend assets:**
   ```bash
   npm run build
   ```

7. **Run development servers:**
   ```bash
   php artisan serve --port=8000
   # In another terminal:
   npm run dev
   ```

---

## Key Modules

- **Dynamic Catalogues & Spec Sheets**: Downloadable technical spec sheets and corporate brochures with administrative management.
- **Hardware Deck**: Interactive animated hardware showcases featuring AMF panels, controllers, and enclosures.
- **Admin Dashboard (`/admin`)**: Built with Filament v3 for real-time management of:
  - Technical Catalogues & PDF uploads
  - Media & Event Albums
  - Milestones & Impact Metrics
  - Core Values & Mission Statements
  - In-House R&D Prototypes
  - Global Site Settings (Helplines, Boardlines, Plant Info, Social Links)
- **SYS-AXS NOC Telemetry Integration**: Live platform showcase and monitoring system specs.
- **Search Engine Optimization**: OpenGraph tags, schema markup, and dynamic sitemaps.

---

## License

Proprietary software. Copyright © System Infra Solutions Private Limited. All rights reserved.
