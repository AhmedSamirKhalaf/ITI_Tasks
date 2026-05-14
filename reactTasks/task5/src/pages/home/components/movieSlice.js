import { createSlice ,  createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

const initialState = {
    movies : [],
    status : 'idle' , 
    error : null
};

// thunk
export const FetchMovies = createAsyncThunk('movies/fetch', async ({ query, page, language }) => {
    const endpoint = query ? '/search/movie' : '/discover/movie';
    const params = query
        ? { page, query, language }
        : { page, language, certification_country: 'US', 'certification.lte': 'PG-13' };

    const response = await axiosInstance.get(endpoint, { params });
    return response.data.results;
});

const MoviesSlice = createSlice({
    name : 'movies', 
    initialState , 
    reducers : {

    },
    extraReducers(builder){
        builder
        .addCase(FetchMovies.pending , (state) => {
            state.status = 'pending';
        })
        .addCase(FetchMovies.fulfilled , (state , action) => {
            state.movies = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(FetchMovies.rejected , (state , action) => {
            state.error = action.error.message;
            state.status = 'rejected';
        })
    }
})


export const MoviesSelector = (state) => state.movies.movies;
export const MoviesStatus = (state) => state.movies.status;
export const MoviesError = (state) => state.movies.error;

export default MoviesSlice.reducer;