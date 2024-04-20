const initialState = {
    routeObj: null,
    wayPoints: [],
    mapRef : null,
    navigation: false,
    currentLocation: {
        latitude: 30.5921396,
        longitude: -96.3414484,
      },
      currentPlace : null
}

const mapReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'INIT_MAP_REF':
            return {
                ...state, 
                mapRef: action.mapRef
            }
        case 'SET_ROUTE':
            return {
            ...state,
            routeObj: action.routeObj,
        }
        case 'SET_WAYPOINTS':
            return {
                ...state,
                wayPoints: action.wayPoints,
            }
        case 'SET_CURRENT_LOCATION':
            //console.log("Action Type: "+action.type, " Lat: "+ action.currentLocation.latitude, "Long: "+action.currentLocation.longitude)
            return {
                ...state,
                currentLocation: action.currentLocation
            }
        case 'SET_CURRENT_PLACE':
            return {
                ...state,
                currentPlace : action.currentPlace
            }
        case 'START_NAVIGATION':
            return {
                ...state,
                navigation: action.navigation
            }
        default:
            return state;
    }
}
export default mapReducer;