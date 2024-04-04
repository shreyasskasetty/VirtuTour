import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { setTourType } from '../../../context/actions/buttonActions';
import {connect} from 'react-redux';
import RoutesList from './RoutesList'

const TourRoutesSheet = ({setTourType}) => {

  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    const focused = index !== -1;
    if(index === -1){
      setTourType({tourOption: null});
    }
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdropComponent = useCallback(
    (props : any) => (
      <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
    ),
    []
  );
  
  
  return (
        <BottomSheet
          enablePanDownToClose = {true}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdropComponent}
        >
          <BottomSheetView style={styles.contentContainer}>
            <RoutesList />
          </BottomSheetView>
        </BottomSheet>
  );
};


const mapDispatchToProps = {
  setTourType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -30
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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

export default connect(null, mapDispatchToProps)(TourRoutesSheet);
