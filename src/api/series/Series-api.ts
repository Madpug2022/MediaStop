/* eslint-disable */
import { requests } from "../api";


export const SERIES = {
    getPopularSeries: async (languaje: string, page: number) => {
        try {
            const response = await requests.get(`/tv/popular?language=en-${languaje}&page=${page}`);
            if (!response) throw new Error("Error obteniendo las series");
            return response.results ? response : undefined;
        } catch (error) {
            console.error("Error obteniendo las Series:", error);
            return undefined
        }

    }

}
