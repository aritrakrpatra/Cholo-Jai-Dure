This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Clerk Authentication Setup

This project uses Clerk for sign up, sign in, session management, and protecting the `/account` page.

Add these environment variables locally (`.env.local`) and in your deployment provider:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login` (optional)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup` (optional)

Then in Clerk Dashboard:

- Add your development URL (for example `http://localhost:3000`) to allowed origins/redirects.
- Add your production domain before deploying.

## MongoDB Setup (Users + Bookings)

This project now stores user profile data and booking records in MongoDB.

Add these environment variables to your local `.env.local` and deployment platform:

- `MONGODB_URI` (MongoDB connection string)
- `MONGODB_DB` (optional, defaults to `cholo_jai_dure`)

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=cholo_jai_dure
```

Recommended collections used by the app:

- `users`
- `bookings`

Notes:

- Booking APIs (`/api/bookings/*`) read/write MongoDB.
- User profile API (`/api/users/me`) syncs authenticated Clerk users into MongoDB.
- Legacy `/api/auth` route also writes/reads users from MongoDB (for backward compatibility).

## Contact Enquiry Form Setup (Vercel)

The enquiry form posts to `/api/contact` and sends email using SMTP via `nodemailer`.

Add these environment variables in Vercel Project Settings -> Environment Variables:

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` for port `465`, otherwise `false`)
- `SMTP_USER` (sender email)
- `SMTP_PASS` (SMTP password or Gmail app password)
- `SMTP_FROM` (optional, defaults to `SMTP_USER`)
- `CONTACT_RECEIVER_EMAIL` (where enquiry emails are received)
- `CONTACT_BUSINESS_PHONE` (optional, used in customer auto-reply)

You can copy defaults from `.env.example`.

Important for Gmail:
- Use a Google App Password (not your normal Gmail password).
- Keep 2-step verification enabled on that Google account.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
