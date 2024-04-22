import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { BOTTOM_SHEET_PLACE_DETAIL, BOTTOM_SHEET_TOUR_PREVIEW, GUIDE_TOUR_TYPE } from '../../../context/constants';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { placeDetailStyles } from './PlaceDetails.style';
import { startNavigation } from '../../../context/actions/mapActions';
import { current } from '@reduxjs/toolkit';
import ImageCarousel from './ImageCarousel';
import PlaceCard from '../../routes/PlaceCard';

const initRouteStops = (route) =>{
    const stops = []
    if(!route)
    {
      return stops
    }
    for (const stop of route.route)
    {
      stops.push({
        ...stop,
        visited : false
      })
    }
    return stops
}

const PlaceDetail = ({bottomSheetRef, route,tourType, currentPlace, setContentType, startNavigation }) => {
  const routeStop = useRef(initRouteStops(route))
  const [nextStop, setNextStop] = useState({
    name:undefined
  })
  const handleExitButtonClick = () => {
    console.log("TourType: "+tourType)
    if(tourType == GUIDE_TOUR_TYPE){
      setContentType({ contentType: BOTTOM_SHEET_TOUR_PREVIEW });
    }
    else{
      setContentType({ contentType: null });
      bottomSheetRef.current?.close();
    }
    startNavigation(false);
  };

  const getNextStop = ()=>{
    for (const stop of routeStop.current)
    {
      if(!stop.visited)
      {
        return stop
      }
    }
    return null
  }
  
  useEffect(()=>{
    if(currentPlace){
      bottomSheetRef.current?.expand();
    }else{
      const stop = getNextStop()
      if(stop)
      {
        if(stop.name !== nextStop.name)
        {
          setNextStop(stop) 
        }
      }
      else
      {
        setNextStop({
          name:undefined
        })
      }
      
      console.log("GEtting next stop", nextStop)

      bottomSheetRef.current?.snapToIndex(0);
    }
  },[currentPlace])

  // useEffect(()=>{
  //   const stop = getNextStop()
  //   if(stop)
  //     nextStop.current = {...stop}
  //   else
  //     nextStop.current = null
    
  //   console.log("GEtting next stop", nextStop)
  // }, [nextStop.current])

  return (
    <>
    <View style={placeDetailStyles.placeDetailContainer}>
        <View style={placeDetailStyles.buttonsContainer}>
          {
            <Text style={placeDetailStyles.nextStopText}> {nextStop.name ? "Next Stop" : "Free Roam"}</Text>
          }
          <TouchableOpacity style={placeDetailStyles.exitButton} onPress={handleExitButtonClick}>
            <Text style={placeDetailStyles.exitButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
        {currentPlace ? <View style={placeDetailStyles.contentContainer}>
          <Text style={placeDetailStyles.headerText}>{currentPlace?.name}</Text>     
            <ImageCarousel images={currentPlace?.images.images}/>
          <Text style={placeDetailStyles.descriptionText}>{currentPlace?.description}</Text>
        </View>: 
        (
          nextStop.name ? 
          <PlaceCard sourceName={nextStop?.name} source={nextStop?.images[0]}/>
          : <></>
        )
        }
      </View>
    </>
  )
}

const mapStateToProps = (state) => ({
  tourType : state.button.tourType,
  currentPlace: state.map.currentPlace, // Access place data from Redux store
  route: state.map.routeObj
});

const mapDispatchToProps = {
  setContentType,
  startNavigation
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);