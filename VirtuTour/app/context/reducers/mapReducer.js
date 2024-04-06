const initialState = {
    routeObj: null,
    wayPoints: [],
    mapRef : null,
    currentLocation: {
        latitude: 30.5921396,
        longitude: -96.3414484,
      }
}

const mapReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'INIT_MAP_REF':
            console.log("Action Type: "+action.type+"mapRef"+action.mapRef)
            return {
                ...state, 
                mapRef: action.mapRef
            }
        case 'SET_ROUTE':
            console.log("Action Type: "+action.type)
            return {
            ...state,
            routeObj: action.routeObj,
        }
        case 'SET_WAYPOINTS':
            console.log("Action Type: "+action.type, " wayPoints: "+ action.wayPoints)
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
        default:
            return state;
    }
}
export default mapReducer;