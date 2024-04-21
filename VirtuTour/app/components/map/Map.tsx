import MapView,{Polyline, PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {View,StyleSheet, Dimensions} from 'react-native';
import { locationPermission, getCurrentLocation, getWayPoints, getClosestLocation} from '../../utility/map-helper';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import {getCenterLocation} from '../../utility/helper.js'
import {locations} from '../../constants/map/places.js'; 
import Narration from '../audio/audio2.js';
import {connect} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { initMapRef, setCurrentLocation, setCurrentPlace } from '../../context/actions/mapActions';
import { FREE_ROAM_TOUR_TYPE, GUIDE_TOUR_TYPE } from '../../context/constants';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({mapRef, initMapRef,tourType, route, wayPoints, navigation, currentLocation, setCurrentPlace, setCurrentLocation}) => {
    const [state, setState] = useState({
      routePoints: [],
    })
    
    useEffect(() => {
      const interval = setInterval(() => {
         getLiveLocation();
      }, 2000);
      return () => clearInterval(interval)
    }, [])
    
    useEffect(()=> {
      const centerLocation = getCenterLocation(locations);
      setState(prevState => ({
        ...prevState,
        centerLocation: centerLocation
      }));
    },[]);
  

      useEffect(()=>{
        switch(tourType){
          case GUIDE_TOUR_TYPE:
            if(navigation && route && currentLocation){
              const currentPlace = getClosestLocation(currentLocation,route.route);
              if(currentPlace.length == 0){
                setCurrentPlace({currentPlace: null});
              }else{
                setCurrentPlace({currentPlace: currentPlace[0]});
              }
            }
            break;
          case FREE_ROAM_TOUR_TYPE:
            if(navigation && locations && currentLocation){
              const currentPlace = getClosestLocation(currentLocation,locations);
              setCurrentPlace({currentPlace: currentPlace[0]});
            }
        }
      
      },[currentLocation])


    const zoomInOnMapReady = () => {
      initMapRef({mapRef});
      // const zoomRegion = {
      //   ...currentLocation,
      //   latitudeDelta: 0.008, // Smaller delta values for a closer zoom
      //   longitudeDelta: 0.009,
      // };
      const location_list = locations.map((place)=>{return {latitude:place.latitude, longitude:place.longitude}})
      mapRef.current?.fitToCoordinates(location_list,{edgePadding: {top: 70, right: 70, bottom: 70, left: 70},animated: true}); // 2000 ms for smoother transition
    };

    const getLiveLocation = async () => {
        const locationPermissionStatus = await locationPermission();
        if(locationPermissionStatus){
          // ToDo : Handle case for reject
          const {latitude, longitude} = await getCurrentLocation();
          setCurrentLocation({
              currentLocation: { latitude: latitude, longitude: longitude },
          })
        }
        
      }
      
      const goToMyLocation = () => {
          const { latitude, longitude } = currentLocation;
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.001, // Adjust as needed
            longitudeDelta: 0.001, // Adjust as needed
          }, 500); // 1500 milliseconds for the animation
      }
      
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Icon name={"my-location"} raised type='material' onPress={goToMyLocation}/>
            </View>
            <Narration currentLocation={currentLocation}/>
            <MapView
                provider= {PROVIDER_GOOGLE}
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    ...currentLocation,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                
                showsUserLocation
                showsCompass
                mapType={"satellite"}
                showsTraffic = {true}
                onMapReady={zoomInOnMapReady}
                
            >
            {
              route && wayPoints &&
              (
                <MapViewDirections
                  origin={currentLocation}
                  destination={{latitude:route.destination.latitude, longitude:route.destination.longitude}}
                  apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                  strokeColor='#1B6EF3'
                  strokeWidth={5}
                  waypoints={wayPoints}
                  splitWaypoints={true}
                  precision={"high"}
                  mode={"WALKING"}
                  resetOnChange={false}
                  optimizeWaypoints={true}
                >
                </MapViewDirections>
              )
            }
            {
              route && route.route?.map((location, index) => {
                    return (
                      <Marker
                      key={`${index}`} 
                      coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                      title={location.name}
                      pinColor={route.colorIndicator}
                      />
                    )
              })
            }
            </MapView>
        </View>
    )
}

  const styles = StyleSheet.create({
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      zIndex: 1,
      position:"absolute",
      top:200,
      right: 5,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    }
  });

const mapStateToProps = (state: any)=>{
  return {
      route: state.map.routeObj,
      wayPoints: state.map.wayPoints,
      currentLocation: state.map.currentLocation,
      navigation: state.map.navigation,
      tourType: state.button.tourType
  }   
}
const mapDispatchToProps = {
    initMapRef, 
    setCurrentPlace,
    setCurrentLocation
};


export default connect(mapStateToProps,mapDispatchToProps)(Map);