import {Dimensions, Platform} from 'react-native';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const getScreenSize = (percentage)=> {
    return - SCREEN_HEIGHT * percentage/100
}

const getCenterLocation = (routes) => {
    let totalLat = 0;
    let totalLng = 0;
    let totalCount = 0;

    routes.forEach(route => {
        totalLat += route.latitude;
        totalLng += route.longitude;
        totalCount++;
    });

    const averageLat = totalCount > 0 ? totalLat / totalCount : 0;
    const averageLng = totalCount > 0 ? totalLng / totalCount : 0;
    return {latitude: averageLat, longitude: averageLng}
}
export {SCREEN_HEIGHT, SCREEN_WIDTH, getScreenSize, getCenterLocation};

export const isWeb = Platform.OS === "web";