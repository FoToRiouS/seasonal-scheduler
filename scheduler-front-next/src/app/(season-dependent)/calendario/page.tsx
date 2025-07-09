import { CalendarioPage } from "@/components/calendario/CalendarioPage";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/security/authOptions";
import { redirect } from "next/navigation";
import { fetchAnimesForList } from "@/actions/FetchedAnimeActions";

export default async function Page() {
    const queryClient = new QueryClient();
    const session = await auth();

    if (!session) {
        redirect("/login");
    } else {
        queryClient.prefetchQuery({
            queryKey: ["fetch-animes-calendar", session.userId, 2025, "summer"],
            queryFn: () => fetchAnimesForList(session?.userId, 2025, "summer"),
        });

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CalendarioPage />
            </HydrationBoundary>
        );
    }
}
