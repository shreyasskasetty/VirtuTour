// import {showMessage} from 'react-native-flash-message'
import {Platform} from 'react-native'
import * as Location from 'expo-location'

export const getCurrentLocation = () => new Promise(async (resolve, reject)=>{
    location = await Location.getCurrentPositionAsync({})
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