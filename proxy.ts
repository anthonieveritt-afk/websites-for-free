import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isClientRoute = createRouteMatcher(["/dashboard(.*)"]);

// If Clerk keys aren't configured yet, skip auth (allows public site to work)
const clerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY;

export default clerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isAdminRoute(req) || isClientRoute(req)) {
        await auth.protect();
      }
    })
  : function middleware(req: NextRequest) {
      if (isAdminRoute(req) || isClientRoute(req)) {
        return new NextResponse("Admin area — Clerk auth not yet configured.", { status: 503 });
      }
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Required for Clerk's auto-proxy path
    "/__clerk/:path*",
    "/(api|trpc)(.*)",
  ],
};
