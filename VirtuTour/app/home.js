import { StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import Map from './components/map/Map'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setTourType } from './context/actions/buttonActions.js';
import { setContentType } from './context/actions/bottomSheetActions.js';
import {connect} from 'react-redux';
import { FREE_ROAM_TOUR_TYPE, GUIDE_TOUR_TYPE, BOTTOM_SHEET_TOUR_LIST, BOTTOM_SHEET_PLACE_DETAIL } from './context/constants.js';
import TourRoutesSheet from './components/common/BottomSheets/TourRoutesSheet';
import { startNavigation } from './context/actions/mapActions';

const Home = ({tourType, setTourType, setContentType, startNavigation, navigation}) => {

  const handleRoamButtonPress = () => {
    startNavigation(true);
    setTourType({
      tourOption: FREE_ROAM_TOUR_TYPE
    });
    setContentType({
      contentType: BOTTOM_SHEET_PLACE_DETAIL,
    })
  };

  const handleGuideButtonPress = () => {
    setTourType({
      tourOption: GUIDE_TOUR_TYPE
    })
    setContentType({
      contentType: BOTTOM_SHEET_TOUR_LIST,
    })
  }
  const mapRef = useRef();

  return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Map mapRef={mapRef}/>
            {!navigation && <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=> {handleGuideButtonPress()}}>
                  <Text style={styles.buttonText}>Guide</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                    onPress={()=> {
                      handleRoamButtonPress()
                }}>
                <Text style={styles.buttonText}>Roam</Text>
                </TouchableOpacity>
              </View>
              }
            {(tourType == GUIDE_TOUR_TYPE || tourType == FREE_ROAM_TOUR_TYPE )&& <TourRoutesSheet />}
          {/* {bottomSheetVisible && <BottomSheet />} */}
        </SafeAreaView>
      </GestureHandlerRootView>
  );
}

const mapStateToProps = (state) =>{
  return { tourType: state.button.tourType,
           navigation: state.map.navigation 
          }
}

const mapDispatchToProps = {
  setTourType,
  setContentType,
  startNavigation,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '85%',
  },

  button: {
    backgroundColor: '#500000',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowOffset: 2,
  },

  buttonText: {
    color: 'white',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);