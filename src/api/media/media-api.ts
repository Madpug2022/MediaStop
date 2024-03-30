import { requests } from "../api";


export const MEDIA = {
    getMedia: async (languaje: string, media: string, id: string) => {
        return requests.get(`/${media}/${id}?language=en-${languaje}`);
    }
}
