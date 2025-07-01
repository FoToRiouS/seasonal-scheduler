import { IAnime, IStartSeason } from "./IAnime.ts";

export interface IAnimeSeason {
    id?: string;
    idAnime?: number;
    anime?: IAnime;
    seasons?: IStartSeason[];
    previewText?: string;
    reviewText?: string;
    services?: string[];
}
