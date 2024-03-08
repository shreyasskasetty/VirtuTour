import MapView,{ PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {View,StyleSheet, Dimensions} from 'react-native';
import { locationPermission, getCurrentLocation} from '../../utility/map-helper';
import { useEffect, useRef, useState } from 'react';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
    const mapRef = useRef();
    const [state, setState] = useState({
      currentLocation: {
        latitude: 30.5921396,
        longitude: -96.3414484,
      }
    })

    const { currentLocation} = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const getLiveLocation = async () => {
        const locationPermissionStatus = await locationPermission()
        console.log("location permission", locationPermissionStatus)
        if(locationPermissionStatus){
          const {latitude, longitude} = await getCurrentLocation();
          console.log("latitude: ",latitude, "longitude: ",longitude)
          updateState({
              currentLocation: { latitude: latitude, longitude: longitude },
          })

        }
        
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000);
        return () => clearInterval(interval)
      }, [])


    return (
        <View style={styles.container}>
            <MapView
                provider= {PROVIDER_GOOGLE}
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    ...currentLocation,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                
                region={{
                    ...currentLocation,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >

            <Marker
                coordinate={currentLocation}
                title={"title"}
                pinColor = {"purple"}
                description={"description"}
            />
            </MapView>
        </View>
    )
}

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    }
  });
  
export default Map;