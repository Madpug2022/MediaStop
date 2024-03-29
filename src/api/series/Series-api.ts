import { requests } from "../api";


export const SERIES = {
    getPopularSeries: async (languaje: string, page: number) => {
        return requests.get(`/tv/popular?language=en-${languaje}&page=${page}`);
    }

}
