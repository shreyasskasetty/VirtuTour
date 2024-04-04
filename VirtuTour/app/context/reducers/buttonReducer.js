const initialState = {
    tourType: null
}

const buttonReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_TOUR_TYPE':
            console.log("Action Type: "+action.type, " tourOption: "+action.tourOption)
            return {
                ...state,
                tourType: action.tourOption,
            }
        default:
            return state;
    }
}
export default buttonReducer;