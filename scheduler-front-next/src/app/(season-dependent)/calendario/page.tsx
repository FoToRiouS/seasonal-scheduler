import { CalendarioPage } from "@/components/calendario/CalendarioPage";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/security/authOptions";
import { redirect } from "next/navigation";
import { fetchAnimesForCalendar, fetchAnimesForList } from "@/actions/FetchedAnimeActions";
import dayjs from "dayjs";
import { getCurrentSeason } from "@/utils/MyAnimeListUtils";
import { SeasonMAL } from "@/interfaces/AnimeMAL";
import { FetchedAnime } from "@/interfaces/FetchedAnime";

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

    console.log("RENDENIZANDO SERVER SIDE...");

    if (!session) {
        redirect("/login");
    } else {
        await queryClient.prefetchQuery({
            queryKey: ["fetch-animes-calendar", session.userId, year, season],
            queryFn: () => fetchAnimesForCalendar(session?.userId, year, season),
        });

        // const animes = await fetchAnimesForCalendar(session?.userId, year, season);

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CalendarioPage />
            </HydrationBoundary>
        );
    }
}
