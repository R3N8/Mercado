# Mercado – Online Shop

Mercado comes from the Latin word mercari, which means “to trade.”
This project is a fully functional online shop built as part of the JavaScript Frameworks course assignment.
The application demonstrates practical use of React and Next.js with TypeScript, API integration, state management, and responsive UI design.

The goal of Mercado is to create a realistic e-commerce experience while following modern frontend development practices and meeting all specified assignment requirements.

## Links

Deploy: [Mercado](https://mercado-kappa-flame.vercel.app/index)

API: [Noroff Online-Shop API](https://docs.noroff.dev/docs/v2/basic/online-shop)

## Features

- Responsive product grid layout
- Product Details
- Search & Sort
- Shopping Cart
- Checkout flow
- Contact form
- Toast notification

## Getting Started

Clone the repository, then install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Tech Stack

**Framework**: Next.js (React)

**Language**: TypeScript

**Styling**: Tailwind CSS

## Architecture & Design Decisions

- Checkout uses explicit review and confirm steps so the cart is only cleared after a successful purchase action. This avoids losing cart state if the user navigates back or if the confirmation flow fails.
- Product pages now handle loading and error states separately, which prevents the experience from incorrectly showing "Product not found" while the API request is still pending.
- Cart actions are typed with the shared `CartItem` interface for safer state updates and stronger editor validation.
- API configuration is validated at fetch time instead of at module load, which keeps the app from hard-crashing globally during import when environment variables are missing.

## Author

R3N8 - 2026
