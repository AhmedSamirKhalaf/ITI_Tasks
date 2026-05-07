const INTIAL_VALUE = {
    theme : "light"
}

export default function themeReducer(state=INTIAL_VALUE , action){
    switch(action.type){
        case 'CHANGE_MY_THEME' :
            return{
                ...state,
                theme : action.payload,
            }
        default : 
            return state;
    }
}