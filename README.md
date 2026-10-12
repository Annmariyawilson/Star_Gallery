# Star Gallery - E-Commerce Storefront

A modern, responsive e-commerce storefront web application built with **Angular 22** (Standalone Components & Signals), **Nx Monorepo**, and **Tailwind CSS**.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v20 or higher (v22 recommended)
- **npm**: v10 or higher

### 2. Installation
Install dependencies:

```bash
npm install
```

### 3. Run the Development Server
Launch the application:

```bash
npx nx serve storefront
```

Open your browser and navigate to:
**[http://localhost:4200/](http://localhost:4200/)**

---

## 🛠️ Build & Verification

To verify clean compilation and create the production bundle:

```bash
npx nx build storefront
```

The output bundle will be generated in `dist/apps/storefront/browser`.

---

## 📂 Architecture Overview

```text
e-commerce/
├── apps/
│   └── storefront/                     # Main Shell Application
│       ├── public/
│       │   ├── assets/                 # SVGs, product & banner images
│       │   ├── data/                   # Mock JSON data (brands, categories, products)
│       │   ├── favicon.ico             # Star Gallery official logo favicon
│       │   └── favicon.svg             # Vector favicon
│       └── src/
│           ├── app/
│           └── styles.css              # Tailwind CSS & PrimeIcons configuration
├── libs/
│   └── shared/
│       ├── ui/                         # Standalone UI Components
│       │   ├── header/                 # Navbar with EN/AR toggle & search
│       │   ├── category-slider/        # Interactive category carousel with active state
│       │   ├── banner-slider/          # Brand showcase slider with dynamic reactivity
│       │   ├── product-card/           # Figma-matched product card
│       │   └── footer/                 # Comprehensive footer with feature & payment bars
│       └── data-access/                # State Management & Services
│           ├── models/                 # TypeScript interfaces (Product, Category, Brand)
│           └── services/               # DataService / CatalogService (Signals & RxJS)
```

---

## ✨ Key Features
- **Figma Pixel Precision**: Exactly matches colors, aspect ratios, typography (Poppins & Tajawal), padding, and component specifications.
- **Dynamic Reactivity**: Brand banner slides and tab clicks reactively update and filter products below.
- **Bilingual & RTL**: One-click English/Arabic toggle that flips the layout to RTL and updates typography.
- **Official Brand Assets**: Integrated high-resolution product photography, brand banners, and official Star Gallery vector logo/favicon.
