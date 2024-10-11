export async function middleware(request) {
  const logged = request.cookies.get("logged")?.value;
  if(logged==="true"){
    const usertype = request.cookies.get("usertype")?.value;
    if(usertype==="Admin" && !request.nextUrl.pathname.startsWith("/dashboard/admin")){
      return Response.redirect(new URL('/dashboard/admin', request.url));
    }
    if(usertype==="User" && !request.nextUrl.pathname.startsWith("/dashboard/user")){
      return Response.redirect(new URL('/dashboard/user', request.url));
    }
  }else{
    if(request.nextUrl.pathname.startsWith("/dashboard")){
      return Response.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|search|images/*|.*\\.png$).*)'],
}
