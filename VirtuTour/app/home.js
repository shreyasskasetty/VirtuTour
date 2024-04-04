import { StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import Map from './components/map/map.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setTourType } from './context/actions/buttonActions.js';
import {connect} from 'react-redux';
import { FREE_ROAM_TOUR_TYPE, GUIDE_TOUR_TYPE } from './context/constants.js';
import TourRoutesSheet from './components/common/BottomSheets/TourRoutesSheet';

const Home = ({tourType, setTourType}) => {
  const setTourOption = (tourOption) => {
    setTourType({
      tourOption,
    })
  };

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=> setTourOption(GUIDE_TOUR_TYPE)}>
              <Text style={styles.buttonText}>Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> setTourOption(FREE_ROAM_TOUR_TYPE)}>
              <Text style={styles.buttonText}>Roam</Text>
            </TouchableOpacity>
          </View>
            {tourType == GUIDE_TOUR_TYPE && <TourRoutesSheet />}
          {/* {bottomSheetVisible && <BottomSheet />} */}
        </SafeAreaView>
      </GestureHandlerRootView>
  );
}

const mapStateToProps = (state) =>{
  return { tourType: state.tourTypeSelector.tourType }
}

const mapDispatchToProps = {
  setTourType,
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
    width: '100%',
    paddingHorizontal: 60,
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