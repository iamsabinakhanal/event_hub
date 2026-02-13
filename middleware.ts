import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Get token and user data from cookies
    const token = request.cookies.get('auth_token')?.value;
    const userDataCookie = request.cookies.get('user_data')?.value;
    
    let userData: any = null;
    if (userDataCookie) {
        try {
            userData = JSON.parse(userDataCookie);
        } catch (error) {
            try {
                userData = JSON.parse(decodeURIComponent(userDataCookie));
            } catch (decodeError) {
                console.error('Error parsing user data:', decodeError);
            }
        }
    }

    const extractRole = (data: any): string | null => {
        if (!data) return null;
        return (
            data.role ||
            data.user?.role ||
            data.data?.role ||
            null
        );
    };

    const role = extractRole(userData);
    const isAdmin =
        (typeof role === 'string' && role.toLowerCase() === 'admin') ||
        userData?.isAdmin === true;

    // Check if the route is an admin route
    if (pathname.startsWith('/admin')) {
        // If no token, redirect to login
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // If user is not admin, redirect to unauthorized page or dashboard
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/auth/dashboard', request.url));
        }
    }

    // Check if the route is a user route
    if (pathname.startsWith('/user')) {
        // If no token, redirect to login
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: ['/admin/:path*', '/user/:path*']
};
