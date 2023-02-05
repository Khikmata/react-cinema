import { StringMappingType } from "typescript";

enum subanddub {
    'SUB',
    'DUB'
}

export interface IAnimeData {
    id: string;
    image: string;
    title: string;
    url: string;
    genres: string[];
}

interface IEpisodes {
    id: string;
    number: number;
    url: string;
}

export interface IAnimeDetails {
    description: string;
    episodes: IEpisodes[];
    genres: string[];
    id: string;
    image: string;
    releaseDate?: string;
    status?: string;
    subOrDub?: string;
    title: string;
    totalEpisodes?: number;
    type?: string;
    url?: string;
    otherName?: string;
}

interface IHeaders {
    Referer: string
}
export interface ISources {
    url: string;
    isM3U8: string;
    quality: string;
}

export interface IAnimePlayer {
    download: string;
    headers: IHeaders;
    sources: ISources[];
}