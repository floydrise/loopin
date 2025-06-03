# 🎟️ LoopIn

LoopIn is an **experiences platform** where users can explore and sign up for events—either **free or paid (via Stripe)**. Designed with a modern full-stack monorepo architecture, LoopIn allows users to:

- ✨ Browse and discover upcoming events
- 🆓 Sign up for free events
- 💳 Purchase tickets for paid events (Stripe)
- 📧 Receive confirmation emails after sign-up/purchase
- 🗓️ Add events to Google Calendar (if signed in with Google)
- 🗑️ Manage (delete) tickets from their profile

Additionally, **staff members** can:
- 🛠️ Create, update, or delete events

> 🧪 Built with cutting-edge tools - Bun, Hono, and TanStack to deliver a fast, modern experience.

---

## 🛠️ Tech Stack

### Backend
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Bun](https://bun.sh/)**
- **[Hono](https://hono.dev/)** (Edge-native web framework)
- **PostgreSQL** (via [Neon](https://neon.tech/))
- **[Drizzle ORM](https://orm.drizzle.team/)**
- **[Zod](https://zod.dev/)** for validation
- **[Resend](https://resend.com/)** + React Email for sending emails
- **[Stripe](https://stripe.com/)** for payments
- **[Better-Auth](https://www.better-auth.com/)** for authentication

### Frontend
- **React + Vite + TypeScript**
- **[TanStack Router/Query/Form](https://tanstack.com/)**
- **[Tailwind CSS](https://tailwindcss.com/) + [Shadcn](https://ui.shadcn.com/)**
- **[Stripe.js](https://www.npmjs.com/package/@stripe/stripe-js)**
- **[Motion](https://motion.dev/docs/react-animation)** for animations
- **[Luxon](https://moment.github.io/luxon/#/?id=luxon) / [date-fns](https://date-fns.org/)** for date handling
- **[usehooks-ts](https://usehooks-ts.com/introduction)** for utilities
- **Zod** (shared across client and server)

---

## 🚀 Getting Started

### 🧱 Prerequisites
- Install [Bun](https://bun.sh/)
- Populate the `.env` file using `.env.example`

### 🔧 Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/loopin.git
cd loopin

# 2. Install backend dependencies
bun install

# 3. Go to frontend folder
cd view

# 4. Install frontend dependencies
bun run install
 ```

### 🏃Running Locally

You'll need two terminal windows open:

```bash

# Terminal 1 (backend)
cd loopin
bun run dev
# This will run on localhost:3000 by default

# Terminal 2: (Frontend)
cd loopin/view
bun run dev
# This will run on localhost:5173 by default
```

---

## 🔐 Features

- 🔁 Social login via Google/GitHub
- ✅ Ticket confirmation via email
- 💼 Staff mode for event management
- 💸 Secure payments with Stripe
- 🗂️ Fully containerized with Docker
- ☁️ Deployed to Render

---

## 🎥 Demo

[📺 Watch the demo video](https://youtu.be/ExyiK87rd9M?si=5ud2n8K33SrppiAr)

Try it live (may take a few seconds to boot ⏳):  
👉 [https://loopin-aiii.onrender.com/](https://loopin-aiii.onrender.com/)

---

## 🙋‍♂️ Author

Built with ❤️ by **Stefan Petrov**