import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "harshvansjaliya.com";
const LEGACY_HOSTS = ["harsh-vansjaliya.vercel.app"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host && LEGACY_HOSTS.includes(host)) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
