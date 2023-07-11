import {IStartSeason} from "./IAnime.ts";

export interface IAnimeSeason {
    id: string,
    season: IStartSeason,
    previewText: string,
    reviewText: string
}