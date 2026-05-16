import { createSlice ,  createAsyncThunk, createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";



// the createEntityAdapter normalize the data by converting the data comming from the api call from an array to an object which improves the lookup by id's 
// and it gives u extra selectors in the extraReducers 
const MoviesAdapter = createEntityAdapter();

const initialState = MoviesAdapter.getInitialState({
    status : 'idle' , 
    error : null
});

export const {selectAll: selectAllMovies ,selectById: selectByIdMovies} = MoviesAdapter.getSelectors(
    state => state.RMoviesReducer
);

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
            MoviesAdapter.setAll(state,action.payload);
            state.status = 'fulfilled';
        })
        .addCase(FetchMovies.rejected , (state , action) => {
            state.error = action.error.message;
            state.status = 'rejected';
        })
    }
})



// createSelector improves performance by preventing the re-render every time the state changes only render when the data itself changes
export const TopRatedMovies = createSelector(
    selectAllMovies , 
    (movies) => movies.filter(m => {
        console.log(m)
        return m.vote_average > 8
    })
);

export const MoviesStatus = (state) => state.RMoviesReducer.status;
export const MoviesError = (state) => state.RMoviesReducer.error;

export default MoviesSlice.reducer;