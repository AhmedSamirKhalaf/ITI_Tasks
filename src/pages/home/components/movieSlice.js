import { createSlice ,  createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { uselanguage } from "../../../context/languageContext";
import { useContext } from "react";


const initialState = {
    movies : [],
    status : 'idle' , 
    error : null
};

const language = uselanguage


// thunk
const FetchMovies =  createAsyncThunk('movies/fetch', async () => {
    const response = await axiosInstance('',{
        params : {
            
        }
    })
    return response.data;
});

const MoviesSlice = createSlice({
    name : 'mvoies', 
    initialState , 
    reducers : {

    },
    extraReducers(builder){
        builder
        .addCase(FetchMovies.pending , (state , action) => {
            state.status = 'pending';
        })
        .addCase(FetchMovies.fulfilled , (state , action) => {
            state.movies.push(action.payload);
            state.status = 'fulfilled';
        })
        .addCase(FetchMovies.rejected , (state , action) => {
            state.error = action.error.message;
            state.status = 'rejected';
        })
    }
})


export const  MoviesSelector = (state) => state.movies.movies;
export const MoviesStatus = (state) => state.movies.status;
export const MoviesError = (state) => state.movies.error;

export default MoviesSlice.reducer;




