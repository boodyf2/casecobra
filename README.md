# CaseCobra 📱

A modern e-commerce platform for custom phone cases, built with cutting-edge web technologies. Create, customize, and sell phone cases with an elegant user interface and robust backend functionality.

![CaseCobra Banner](public/thumbnail.png)

## ✨ Features

-   🛠️ Complete shop built from scratch in Next.js 14
-   💻 Beautiful landing page with modern design
-   🎨 Custom professional artworks
-   💳 Secure admin dashboard for order management
-   🖥️ Intuitive drag-and-drop file uploads
-   🛍️ Seamless customer purchasing experience
-   🌟 Clean, modern UI powered by shadcn-ui
-   🛒 Custom phone case configurator
-   🔑 Authentication via Auth.js
-   ✅ Apple-inspired configuration design
-   ⌨️ Full TypeScript implementation

## 🚀 Tech Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn-ui
-   **Authentication:** Auth.js (formerly NextAuth.js)
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Payment Processing:** Stripe
-   **File Storage:** UploadThing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v18+ recommended)
-   PostgreSQL
-   npm or yarn
-   Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/casecobra.git
cd casecobra
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```
# Authentication
AUTH_SECRET="Your auth secret"
AUTH_GOOGLE_ID="Your Google client ID"
AUTH_GOOGLE_SECRET="Your Google client secret"

# Database
DATABASE_URL="Data base uri"

# File Upload
UPLOADTHING_TOKEN="Uploadthing token"
UPLOADTHING_SECRET="Uploadthing secret"

# Payment
STRIPE_SECRET_KEY="Stripe Key"

# Misc
NEXT_PUBLIC_SERVER_URL="YOUR.WEBSITE.DOMAIN"
```

5. Initialize the database:

```bash
npx prisma db push
```

6. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## 💻 Usage

Navigate to `http://localhost:3000` to view the application. You can:

-   Browse the landing page
-   Create custom phone cases
-   Manage orders through the admin dashboard
-   Process payments
-   Track order status

## 👨‍💻 Admin Dashboard

Access the admin dashboard at `/admin` to:

-   View and manage orders
-   Update product shipping status
-   Monitor sales analytics

## 🙏 Acknowledgments

-   Original inspiration from [joschan21/casecobra](https://github.com/joschan21/casecobra)

## 📧 Contact

[Abdalrahman Mahmoud] - [abdalrahman.vim@gmail.com]
