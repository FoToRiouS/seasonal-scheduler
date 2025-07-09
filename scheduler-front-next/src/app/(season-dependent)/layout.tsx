"use client";

import { SeasonContextProvider } from "@/components/shared/animes/provider/SeasonContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SeasonContextProvider>{children}</SeasonContextProvider>;
}
