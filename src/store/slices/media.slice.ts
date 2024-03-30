/* eslint-disable */
import { MovieI, SeriesI } from "@/interfaces/media";
import { createSlice } from "@reduxjs/toolkit";

interface MediaState {
    movies: MovieI[];
    series: SeriesI[];

}

const initialState: MediaState = {
    movies: [],
    series: []
}

export const mediaSlice = createSlice({
    name: "mediaSlice",
    initialState,
    reducers: {
        storeData: (state, action) => {
            state.movies = action.payload.movies;
            state.series = action.payload.series;
        }
    },
});

export default mediaSlice;

export const {
    storeData
} = mediaSlice.actions;
