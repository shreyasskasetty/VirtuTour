import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import google_maps_api from '../../../apis/google_maps_api';
import { startNavigation } from '../../../context/actions/mapActions';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { BOTTOM_SHEET_PLACE_DETAIL } from '../../../context/constants';
import PlaceCard from '../../routes/PlaceCard';

const TourPreviewContent = ({route,bottomSheetRef, setContentType,mapRef, currentLocation, startNavigation}) => {
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  const handleTourPreviewPress = ()=>{
      bottomSheetRef.current?.snapToIndex(1);
  }

  const handleStartButtonPress = () =>{
    console.log('Navigation Started!')
    const { latitude, longitude } = currentLocation;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.001, // Adjust as needed
      longitudeDelta: 0.001, // Adjust as needed
    }, 500); // 1500 milliseconds for the animation
    startNavigation(true);
    setContentType({ contentType: BOTTOM_SHEET_PLACE_DETAIL});
  }

  useEffect(()=>{
    google_maps_api.getDuration({latitude: route.source.latitude, longitude: route.source.longitude}, {latitude: route.destination.latitude, longitude: route.destination.longitude}).then(
      (res)=>{
        const dist = res.data.rows[0].elements[0].distance.text;
        const dur = res.data.rows[0].elements[0].duration.text;
        setDistance(dist);
        setDuration(dur);
      }
    ).catch((error)=>{
      console.error('Error fetching data: ', error);
    })
  },[duration, distance]);
  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.startButton} onPress={()=>{handleStartButtonPress()}}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tourPreviewButton} onPress={()=>{handleTourPreviewPress()}}>
                <Text style={styles.startButtonText}>Tour Preview</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.routeSummary}>
        <Text style={styles.summaryText}>{route.source.name}</Text>
        <Text style={styles.detailsText}>Duration: {duration}</Text>
        <Text style={styles.detailsText}>Distance: {distance}</Text>
      </View>
      <View style={styles.line}/>
      <ScrollView style={styles.routeSteps}>
        {route && route.route.map((place, index) => (
          <PlaceCard sourceName={place.name} source={place.images[0]} key={place.name}/>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state)=>{
    return {
        route: state.map.routeObj,
        mapRef: state.map.mapRef,
        currentLocation: state.map.currentLocation
    }   
  }

const mapDispatchToProps = {
    setContentType,
    startNavigation,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%'
  },
  buttonsContainer: {
    flexDirection:'row',
    width:'auto',
    justifyContent: 'flex-start'
  },
  line: {
    width: SCREEN_WIDTH - 10,
    height: 0.25,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 25
  },
  startButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1B6EF3',
    borderRadius: 20,
    paddingHorizontal: 30, // Horizontal padding
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 5
  },
  tourPreviewButton: {
    alignSelf: 'flex-end',
    marginLeft: 10,
    backgroundColor: '#CBCCCE',
    paddingHorizontal: 25, // Horizontal padding
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 5
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  routeSummary: {
    marginLeft: 20,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 14,
  },
  routeSteps: {
    marginLeft: 10,
    flex: 1,
  },
  step: {
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TourPreviewContent);
