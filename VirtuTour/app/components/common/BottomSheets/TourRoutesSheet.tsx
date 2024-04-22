import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { setTourType } from '../../../context/actions/buttonActions';
import { setRoute } from '../../../context/actions/mapActions';
import {connect} from 'react-redux';
import {BOTTOM_SHEET_TOUR_LIST, BOTTOM_SHEET_TOUR_PREVIEW, GUIDE_TOUR_TYPE, BOTTOM_SHEET_PLACE_DETAIL } from '../../../context/constants';
import TourPreviewContent from './TourPreviewContent';
import RoutesAndToggle from './RoutesAndToggle';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import PlaceDetails from './PlaceDetails';

const TourRoutesSheet = ({setTourType,tourType, mapRef, wayPoints, navigation, currentPlace, setRoute, route,setContentType, content}) => {

  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['18%','50%','70%'], []);
  
  const handleSheetChanges = useCallback((index: number) => {
    const focused = index !== -1;
    if(index === -1){
      if(tourType == GUIDE_TOUR_TYPE){
        switch(content){
          case BOTTOM_SHEET_TOUR_PREVIEW: 
              setContentType({
                contentType: 0
              });
              bottomSheetRef.current?.snapToIndex(1)
              setRoute({route: null});
              break;
            case BOTTOM_SHEET_TOUR_LIST: 
              setContentType({
                contentType: null
              });
              setTourType({tourOption: null});
              setRoute({route: null});
              break;
          default:
            setRoute({route: null});
            setTourType({tourOption: null});
        }
      }
    }

    if(index > 0 && content == BOTTOM_SHEET_TOUR_PREVIEW){
      console.log("Changing Zoom...")
      console.log(wayPoints)
      mapRef.current?.fitToCoordinates(wayPoints, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, // Adjust padding as needed
        animated: true, // Set to false if you do not want the map to animate zooming
      });
    }
    if(index == 0 && content ==  BOTTOM_SHEET_TOUR_PREVIEW){
        const region = {
            latitude: route.source.latitude,
            longitude: route.source.longitude,
            latitudeDelta: 0.004, 
            longitudeDelta: 0.004
        }
        mapRef.current?.animateToRegion(region, 1000)
    }
  }, [content]);

  // const renderBackdropComponent = useCallback(
  //   (props : any) => (
  //     <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
  //   ),
  //   []
  // );


  return (
        <BottomSheet
          enablePanDownToClose = {!navigation}
          ref={bottomSheetRef}
          index = {0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
              {content == BOTTOM_SHEET_TOUR_PREVIEW && route && (
                <TourPreviewContent bottomSheetRef ={bottomSheetRef}/>
              )}
              {content == BOTTOM_SHEET_TOUR_LIST &&(
                <RoutesAndToggle bottomSheetRef = {bottomSheetRef}/>
              )}
              {content == BOTTOM_SHEET_PLACE_DETAIL && (
                <PlaceDetails bottomSheetRef = {bottomSheetRef}/>
              )}
          </BottomSheetView>
        </BottomSheet>
  );
};


const mapDispatchToProps = {
  setTourType,
  setRoute,
  setContentType
};

const mapStateToProps = (state: any)=>({
  content: state.bottomSheet.contentType,
  route: state.map.routeObj,
  mapRef: state.map.mapRef,
  currentPlace: state.map.currentPlace,
  wayPoints: state.map.wayPoints,
  navigation: state.map.navigation,
  tourType: state.button.tourType
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -30
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  footerContainer: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TourRoutesSheet);
