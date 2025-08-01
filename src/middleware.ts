// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const themeCookie = req.cookies.get('theme');

    const isHomePage = req.nextUrl.pathname === '/';
    if (!themeCookie) {
        // If not set, then set cookie
        const theme = 'theme1';
        res.cookies.set('theme', theme, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }
    if (!themeCookie && isHomePage) {
        // Call your API (could be domain based or anything)
        // const domain = req.headers.get('host');
        // const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-theme?domain=${domain}`;

        // Set the cookie
        // const theme = data.theme || 'theme 1';
        const theme = 'theme1';

        res.cookies.set('theme', theme, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        try {
            // const response = await fetch(apiUrl);
            // const data = await req.json();


            return res;

        } catch (err) {
            // console.error('Theme fetch failed:', err);
            // // fallback theme
            // res.cookies.set('theme', 'default', { path: '/' });
            // return res;
        }
    }

    return res;
}

// Apply only to paths where needed
export const config = {
    matcher: ['/', '/((?!_next|api|favicon.ico).*)'],
};
