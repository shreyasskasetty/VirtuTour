import MapView,{Polyline, PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {View,StyleSheet, Dimensions} from 'react-native';
import { locationPermission, getCurrentLocation, getAllRoutePoints} from '../../utility/map-helper';
import { useEffect, useState } from 'react';
import {getCenterLocation} from '../../utility/helper.js'
import {locations} from '../../constants/map/places'; 
import Narration from '../audio/audio';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({mapRef}) => {
    const [state, setState] = useState({
      currentLocation: {
        latitude: 30.5921396,
        longitude: -96.3414484,
      },
      routePoints: [],
      centerLocation: {latitude: 0, longitude: 0},
    })
    
    const { currentLocation} = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const zoomInOnMapReady = () => {
      const zoomRegion = {
        ...state.centerLocation,
        latitudeDelta: 0.008, // Smaller delta values for a closer zoom
        longitudeDelta: 0.009,
      };
      mapRef.current.animateToRegion(zoomRegion, 2000); // 2000 ms for smoother transition
    };

    const getLiveLocation = async () => {
        const locationPermissionStatus = await locationPermission();
        if(locationPermissionStatus){
          // ToDo : Handle case for reject
          const {latitude, longitude} = await getCurrentLocation();
          updateState({
              currentLocation: { latitude: latitude, longitude: longitude },
          })
        }
        
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
           getLiveLocation();
        }, 2000);
        return () => clearInterval(interval)
      }, [])

      useEffect(() => {
        // Define an async function inside the useEffect hook
        const fetchRoutePoints = async () => {
          const routePoints = await getAllRoutePoints();
          if (routePoints) {
            setState(prevState => ({
              ...prevState,
              routePoints: routePoints[3].coords
            }));
          }
        };
      
        // Call the async function
        fetchRoutePoints();
      }, []); 

      useEffect(()=> {
        const centerLocation = getCenterLocation(locations);
        setState(prevState => ({
          ...prevState,
          centerLocation: centerLocation
        }))
      },[]);
  
    return (
        <View style={styles.container}>
            <Narration currentLocation={state.currentLocation}/>
            <MapView
                provider= {PROVIDER_GOOGLE}
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    ...state.centerLocation,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                onMapReady={zoomInOnMapReady}
            >
            <Polyline
              coordinates={[
                ...state.routePoints
              ]}
             
              strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={6}
            />
            {
              locations.map((location, index) => {
                  //console.log(index,location.name,location.latitude,location.longitude)
                  return (
                    <Marker
                      key={`${index}`} 
                      coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                      title={location.name}
                      pinColor={'black'}
                    />
                  );
              })
            }

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