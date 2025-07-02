import { auth } from "@/security/authOptions";
import { NextResponse } from "next/server";

export default auth((request) => {
    console.log("PASSOU PELO MIDDLEWARE");
    return NextResponse.next();
});

export const config = {
    matcher: ["/lista"],
};
