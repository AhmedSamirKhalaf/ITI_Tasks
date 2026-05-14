const INTIAL_VALUE = {
    fav : []
}

export default function favReducer(state=INTIAL_VALUE , action){
    switch(action.type){
        case "ADD_TO_FAV" :
            const exists = state.fav.includes(action.payload);
            return {
                ...state,
                fav : exists ? 
                state.fav.filter(id=> id !== action.payload) :
                [...state.fav , action.payload]
            };
        default :
            return state;
    }
}

