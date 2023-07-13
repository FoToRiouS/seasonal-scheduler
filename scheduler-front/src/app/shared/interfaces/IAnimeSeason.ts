import {IStartSeason} from "./IAnime.ts";

export interface IAnimeSeason {
    idAnime: string,
    season: IStartSeason,
    previewText?: string,
    reviewText?: string
}