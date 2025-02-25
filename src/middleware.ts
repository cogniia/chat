import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./api/user/service/main";
import { refreshToken } from "./api/auth/service/main";

const unAuthPaths = [
    "/login",
    "/recovery/:patch",
    "/register",
    "/privacy-terms",
    "/service-terms",
];

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (unAuthPaths.find((v) => v === request.nextUrl.pathname))
        return NextResponse.next();

    const signURL = new URL("/login", request.url);
    const homeURL = new URL("/", request.url);

    // If there's no token and the path is not in unAuthPaths, redirect to login.
    if (!token) return NextResponse.redirect(signURL);

    try {
        await getMe(token);
    } catch (error) {
        try {
            await refreshToken();
        } catch (error) {
            return NextResponse.redirect(signURL);
        }
    }

    // Allow access to the home page.
    if (request.nextUrl.pathname === "/") {
        return NextResponse.next();
    }

    // If a valid token is present but the user is trying to access an unauthenticated route, redirect them to home.
    if (token && unAuthPaths.find((v) => v === request.nextUrl.pathname)) {
        return NextResponse.redirect(homeURL);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/home",
        "/login",
        "/recovery/:patch",
        "/profile",
        "/register",
        "/changepassword",
        "/contact",
    ],
};
