import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { setTourType } from '../../../context/actions/buttonActions';
import { setRoute } from '../../../context/actions/mapActions';
import {connect} from 'react-redux';
import {BOTTOM_SHEET_TOUR_LIST, BOTTOM_SHEET_TOUR_PREVIEW, GUIDE_TOUR_TYPE } from '../../../context/constants';
import TourPreviewContent from './TourPreviewContent';
import RoutesAndToggle from './RoutesAndToggle';
import { setContentType } from '../../../context/actions/bottomSheetActions';

const TourRoutesSheet = ({setTourType, setRoute, route,setContentType, content}) => {

  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%','70%'], []);
  
  const handleSheetChanges = useCallback((index: number) => {
    const focused = index !== -1;
    if(index === -1){
      switch(content){
        case BOTTOM_SHEET_TOUR_PREVIEW: 
            console.log("Leaving Bottom Sheet Tour Preview...")
            setContentType({
              contentType: 0
            });
            bottomSheetRef.current?.snapToIndex(1)
            setRoute({route: null});
            break;
          case BOTTOM_SHEET_TOUR_LIST: 
            console.log("Leaving Bottom Sheet List...")
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
    console.log('handleSheetChanges', index);
  }, [content]);

  // const renderBackdropComponent = useCallback(
  //   (props : any) => (
  //     <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
  //   ),
  //   []
  // );


  return (
        <BottomSheet
          enablePanDownToClose = {true}
          ref={bottomSheetRef}
          index = {1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
              {content == BOTTOM_SHEET_TOUR_PREVIEW && route && (
                <TourPreviewContent/>
              )}
              {content == BOTTOM_SHEET_TOUR_LIST &&(
                <RoutesAndToggle bottomSheetRef = {bottomSheetRef}/>
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

const mapStateToProps = (state)=>({
  content: state.bottomSheet.contentType,
  route: state.map.routeObj
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
