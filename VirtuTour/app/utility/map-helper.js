// import {showMessage} from 'react-native-flash-message'
import * as Location from 'expo-location'
import routes from '../constants/map/routes'; 
import { longitudeKeys } from 'geolib';

export const getCurrentLocation = () => new Promise(async (resolve, reject)=>{
    serviceEnabled = await Location.hasServicesEnabledAsync()
    if(!serviceEnabled)
    {
        return reject("Location disabled")
    }
    location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy:  Location.Accuracy.BestForNavigation,
    })
    // console.log(location)
    const { latitude, longitude } = location.coords;
    return resolve({latitude, longitude})
}).catch((error)=> {
    return reject(error)
})


export const locationPermission = () => new Promise(async (resolve, reject)=>{
    try{
        const { status } = await Location.requestForegroundPermissionsAsync();
        if(status == 'granted'){
            return resolve("granted");
        }
    } catch(error){
        return reject(error);
    }
})


export const getWayPoints = (route) => {
    if(!route){
        console.log("No valid route")
        return;
    }
    const wayPoints = route.route.map(place => ({latitude: place.latitude,longitude: place.longitude}));
    return wayPoints;
};


// Updating getPathPoints function to be async and use await
// export const getPathPoints = async (mode, origin, destination) => {
//     const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&mode=${mode}`;
    
//     try {
//         // Using await to wait for the fetch to complete
//         const response = await fetch(url);
//         const responseJson = await response.json();
        
//         if (responseJson.routes.length) {
//             const coords = decode(responseJson.routes[0].overview_polyline.points);
//             return coords;
//         } else {
//             return null;
//         }
//     } catch (e) {
//         console.warn(e);
//         return null;
//     }
// };

// const decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})};