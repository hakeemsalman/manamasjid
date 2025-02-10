import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  
  const allowedOrigins = [
    "http://localhost:3000",
    "https://manamasjid.vercel.app",
  ];
  
  const origin = request.headers.get("origin") || request.headers.get("referer");
  const host = request.headers.get("host"); // Get the host header

  
  // ✅ Allow requests with no origin but from the same host
  if (!origin && host === "localhost:3000") {
  } else if (!origin || !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = ["/dashboard","/profile"];

 if (!user && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
  const url = request.nextUrl.clone();
    url.pathname = "/login";
    // const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  
  return supabaseResponse;
}


// if (
//   !user &&
//   request.nextUrl.pathname.startsWith("/login") &&
//   request.nextUrl.pathname.startsWith("/auth")
// ) {
//   // no user, potentially respond by redirecting the user to the login page
//   const url = request.nextUrl.clone();
//   url.pathname = "/login";
//   return NextResponse.redirect(url);
// }

// IMPORTANT: You *must* return the supabaseResponse object as it is.
// If you're creating a new response object with NextResponse.next() make sure to:
// 1. Pass the request in it, like so:
//    const myNewResponse = NextResponse.next({ request })
// 2. Copy over the cookies, like so:
//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
// 3. Change the myNewResponse object to fit your needs, but avoid changing
//    the cookies!
// 4. Finally:
//    return myNewResponse
// If this is not done, you may be causing the browser and server to go out
// of sync and terminate the user's session prematurely!
