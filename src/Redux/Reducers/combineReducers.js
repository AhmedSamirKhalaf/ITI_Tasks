import { combineReducers } from "redux";
import themeReducer from "./ThemeReducer";
import favReducer from "./FavReducer";
export default combineReducers({
    RthemeReducer : themeReducer,
    RfavReducer : favReducer,
});