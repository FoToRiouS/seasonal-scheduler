import { CalendarioPage } from "@/components/calendario/CalendarioPage";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/security/authOptions";
import { redirect } from "next/navigation";
import { fetchAnimesForList } from "@/actions/FetchedAnimeActions";
import dayjs from "dayjs";
import { AnimeSeasons, getCurrentSeason } from "@/service/MyAnimeListService";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const queryClient = new QueryClient();
    const session = await auth();

    const params = await searchParams;
    const year = params.year ? parseInt(params["year"]) : dayjs().year();
    const season = (params.season ? params.season : getCurrentSeason()) as AnimeSeasons;

    if (!session) {
        redirect("/login");
    } else {
        queryClient.prefetchQuery({
            queryKey: ["fetch-animes-calendar", session.userId, year, season],
            queryFn: () => fetchAnimesForList(session?.userId, year, season),
        });

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CalendarioPage />
            </HydrationBoundary>
        );
    }
}
