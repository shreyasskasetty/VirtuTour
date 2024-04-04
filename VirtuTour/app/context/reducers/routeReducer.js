const initialState = {
    route: 0
}

const routeReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_ROUTE':return {
            ...state,
            route: state.route,
        }
        default:
            return state;
    }
}
export default routeReducer;