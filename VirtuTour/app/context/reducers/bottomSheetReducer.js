const initialState = {
    contentType: null,
    bottomSheetRef: null,
}

const bottomSheetReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_BOTTOM_SHEET_CONTENT_TYPE':
            console.log("[Action] "+action.type, " contentType: "+ action.contentType)
            return {
                ...state,
                contentType: action.contentType,
            }
        case 'INIT_BOTTOM_SHEET_REF':
            console.log("[Action] "+action.type,"bottomSheetRef: "+ action.bottomSheetRef)
            return {
                ...state,
                bottomSheetRef: action.bottomSheetRef,
            }
            
        default:
            return state;
    }
}
export default bottomSheetReducer;