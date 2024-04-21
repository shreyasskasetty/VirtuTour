import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { BOTTOM_SHEET_PLACE_DETAIL, BOTTOM_SHEET_TOUR_PREVIEW, GUIDE_TOUR_TYPE } from '../../../context/constants';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { placeDetailStyles } from './PlaceDetails.style';
import { startNavigation } from '../../../context/actions/mapActions';
import { current } from '@reduxjs/toolkit';
import ImageCarousel from './ImageCarousel';

const PlaceDetail = ({bottomSheetRef, tourType, currentPlace, setContentType, startNavigation }) => {
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
  
  useEffect(()=>{
    if(currentPlace){
      bottomSheetRef.current?.expand();
    }else{
      bottomSheetRef.current?.snapToIndex(0);
    }
  },[currentPlace])

  return (
    <>
    <View style={placeDetailStyles.placeDetailContainer}>
        <View style={placeDetailStyles.buttonsContainer}>
          <TouchableOpacity style={placeDetailStyles.exitButton} onPress={handleExitButtonClick}>
            <Text style={placeDetailStyles.exitButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
        {currentPlace && <View style={placeDetailStyles.contentContainer}>
          <Text style={placeDetailStyles.headerText}>{currentPlace?.name}</Text>     
            <ImageCarousel images={currentPlace?.images.images}/>
          <Text style={placeDetailStyles.descriptionText}>{currentPlace?.description}</Text>
        </View>}
      </View>
    </>
  )
}

const mapStateToProps = (state) => ({
  tourType : state.button.tourType,
  currentPlace: state.map.currentPlace, // Access place data from Redux store
});

const mapDispatchToProps = {
  setContentType,
  startNavigation
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);