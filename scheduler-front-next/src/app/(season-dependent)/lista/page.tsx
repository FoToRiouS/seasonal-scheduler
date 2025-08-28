import { ListaPage } from "@/components/lista/ListaPage";
import { auth } from "@/security/authOptions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchAnimesForList } from "@/actions/FetchedAnimeActions";
import dayjs from "dayjs";
import { getCurrentSeason } from "@/utils/MyAnimeListUtils";
import { SeasonMAL } from "@/interfaces/AnimeMAL";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const queryClient = new QueryClient();
    const session = await auth();

    const params = await searchParams;
    const year = params.year ? parseInt(params["year"]) : dayjs().year();
    const season = (params.season ? params.season : getCurrentSeason()) as SeasonMAL;

    queryClient.prefetchQuery({
        queryKey: ["fetch-animes-list", session?.userId, year, season],
        queryFn: () => fetchAnimesForList(session?.userId, year, season),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ListaPage />
        </HydrationBoundary>
    );
}
