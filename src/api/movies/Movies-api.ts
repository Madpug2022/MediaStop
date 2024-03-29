import { requests } from "../api";


export const MOVIES = {
    getPopularMovies: async (languaje: string, page: number) => {
        return requests.get(`/movie/popular?language=en-${languaje}&page=${page}`);
    }

}
