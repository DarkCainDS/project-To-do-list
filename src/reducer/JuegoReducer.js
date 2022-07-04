export const JuegoReducer = (state = [] , action) => {

    switch(action.type){
        case "create":
            return [...state,action.payload]
        
            case "delete":
                return state.filter(task => task.id !== action.payload);

            case "edith":
                let indice = state.findIndex(task => task.id === action.payload.id);
                state[indice] = action.payload;
                return [...state];
        default: 
            return state;
    }
}