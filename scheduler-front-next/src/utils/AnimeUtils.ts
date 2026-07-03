import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { SeasonMAL } from "@/interfaces/SeasonMAL";
import { AnimeSeasonDTO } from "@/schemas/generated/model";

const emptyPreviews = (fetchedAnimes: FetchedAnime[], year: number, season: SeasonMAL): FetchedAnime[] => {
    if (!fetchedAnimes) {
        return [];
    }

    return fetchedAnimes.filter((fetchedAnime: FetchedAnime) => {
        if (!fetchedAnime.animeBackend || !fetchedAnime.animeBackend.animeSeasons) {
            return false;
        }

        return fetchedAnime.animeBackend.animeSeasons.some((animeSeason: AnimeSeasonDTO) => {
            return (
                animeSeason.season.year === year &&
                animeSeason.season.season === season &&
                !animeSeason.previewText
            );
        });
    });
};

const emptyReviews = (fetchedAnimes: FetchedAnime[], year: number, season: SeasonMAL): FetchedAnime[] => {
    if (!fetchedAnimes) {
        return [];
    }

    return fetchedAnimes.filter((fetchedAnime: FetchedAnime) => {
        if (!fetchedAnime.animeBackend || !fetchedAnime.animeBackend.animeSeasons) {
            return false;
        }

        return fetchedAnime.animeBackend.animeSeasons.some((animeSeason: AnimeSeasonDTO) => {
            return (
                animeSeason.season.year === year &&
                animeSeason.season.season === season &&
                !animeSeason.reviewText
            );
        });
    });
};

export const AnimeUtils = {
    emptyPreviews,
    emptyReviews,
};
