export interface MediaItemI {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface MovieI extends MediaItemI {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}

export interface SeriesI extends MediaItemI {
    origin_country: string[];
    original_title?: string;
    original_name?: string;
    first_air_date: string;
    name: string;
    video?: boolean;
}

export interface MediaResultsI<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
