"use client";

import { SeasonContextProvider } from "@/components/animes/provider/SeasonContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SeasonContextProvider>{children}</SeasonContextProvider>;
}
