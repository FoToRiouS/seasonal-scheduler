import { ListaPage } from "@/components/lista/ListaPage";
import { auth } from "@/security/authOptions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchAnimesForList } from "@/actions/FetchedAnimeActions";

export default async function Page() {
    const queryClient = new QueryClient();
    const session = await auth();

    queryClient.prefetchQuery({
        queryKey: ["fetch-animes-list", session?.userId, 2025, "summer"],
        queryFn: () => fetchAnimesForList(session?.userId, 2025, "summer"),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ListaPage />
        </HydrationBoundary>
    );
}
