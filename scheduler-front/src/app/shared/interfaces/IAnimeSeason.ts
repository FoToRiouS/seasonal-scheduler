import {IStartSeason} from "./IAnime.ts";

export interface IAnimeSeason {
    id?: string,
    idAnime?: string,
    season?: IStartSeason,
    previewText?: string,
    reviewText?: string,
    services?: string[]
}