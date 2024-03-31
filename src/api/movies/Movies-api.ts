/* eslint-disable */
import { requests } from "../api";

export const MOVIES = {
    getPopularMovies: async (language: string, page: number) => {
        try {
            const response = await requests.get(`/movie/popular?language=en-${language}&page=${page}`);
            if (!response) throw new Error("Error obteniendo las peliculas");
            return response.results ? response : undefined;
        } catch (error) {
            console.error("Error obteniendo las peliculas:", error);
            return undefined
        }
    }
};
