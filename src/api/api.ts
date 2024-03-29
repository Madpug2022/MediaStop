/* eslint-disable */
const MediaClient = {
    baseURL: process.env.NEXT_PUBLIC_MOVIEAPI,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEAPI_TOKEN}`,
    },
    timeout: 30000,
    timeoutErrorMessage: "Request timed out",
};

const responseBody = async (response: Response) => {
    const data = await response.json();
    return data;
};

export const requests = {
    async request(
        method: "get" | "post" | "put" | "delete",
        url: string,
    ) {
        try {
            const options: RequestInit = {
                method,
                headers: MediaClient.headers,
            };

            const response = await fetch(MediaClient.baseURL + url, options);
            return responseBody(response);
        } catch (error: any) {
            console.log(error);
        }
    },

    get: (url: string, body?: {}) => {
        return requests.request("get", url);
    },

};
