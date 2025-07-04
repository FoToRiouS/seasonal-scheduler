import { auth } from "@/security/authOptions";
import { NextResponse } from "next/server";

const authRoutes = ["/calendario"];

export default auth(async (request) => {
    const { nextUrl } = request;
    const pathname = request.nextUrl.pathname;

    const token = await auth();

    if (authRoutes.includes(pathname) && !token) {
        const loginUrl = new URL("/login", nextUrl.origin);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/:path*"],
};
