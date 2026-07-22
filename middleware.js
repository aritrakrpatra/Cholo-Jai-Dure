import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ADMIN_PATTERN = /^\/admin(\/|$)/;

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  if (ADMIN_PATTERN.test(path)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      // Not signed in → redirect to login
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // role is stored in session token as "metadata.role"
    // Requires Clerk Dashboard → Sessions → Customize session token:
    //   { "metadata": "{{user.public_metadata}}" }
    const role = sessionClaims?.metadata?.role;
    if (role !== "admin") {
      const homeUrl = new URL("/?error=unauthorized", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (req.nextUrl.pathname.startsWith("/account")) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
