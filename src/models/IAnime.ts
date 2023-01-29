
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
    id?: string;
    number?: number;
    url?: string;
}

//crunchyroll data
// export interface IAnimeDetails {
//     id?: string;
//     title?: string;
//     isAdult?: boolean;
//     image?: string;
//     cover?: string;
//     description?: string;
//     releaseDate?: string;
//     genres?: string[];
//     season?: string;
//     hasDub?: boolean,
//     hasSub?: boolean,
//     rating?: string,
//     ratingTotal?: number,
//     recommendations?: [
//         {
//             id?: string,
//             title?: string,
//             image?: string,
//             cover?: string,
//             description?: string
//         }
//     ]
//     episodes?: [
//         seasonName?: [
//             {
//                 id?: string,
//                 season_number?: number,
//                 episode_number?: number,
//                 title?: string,
//                 image?: string,
//                 description?: string,
//                 releaseDate?: string,
//                 isHD?: boolean,
//                 isAdult?: boolean,
//                 isDubbed?: boolean,
//                 isSubbed?: boolean
//             }
//         ]
//     ]
// }


export interface IAnimeDetails {
    description?: string;
    episodes?: IEpisodes[];
    genres?: string[];
    id?: string;
    image?: string;
    releaseDate?: string;
    status?: string;
    subOrDub?: string;
    title?: string;
    totalEpisodes?: number;
    type?: string;
    url?: string;
}