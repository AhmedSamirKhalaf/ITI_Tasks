import { combineReducers } from "redux";
import themeReducer from "./ThemeReducer";
import favReducer from "./FavReducer";
import MoviesReducer from '../../pages/home/components/movieSlice';
export default combineReducers({
    RthemeReducer : themeReducer,
    RfavReducer : favReducer,
    RMoviesReducer : MoviesReducer,
});