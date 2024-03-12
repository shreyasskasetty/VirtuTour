import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const TourRoutesSheet = ({mapRef, onFocusChange}) => {
  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    const focused = index !== -1;
    console.log('handleSheetChanges', index,focused);
    onFocusChange && onFocusChange(focused);
  }, [onFocusChange]);

  const renderBackdropComponent = useCallback(
    (props : any) => (
      <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
    ),
    []
  );
  
  return (
    <View style={[styles.container, { minWidth: width }]}>
        <BottomSheet
          enablePanDownToClose = {true}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          simultaneousHandlers={mapRef}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdropComponent}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
    </View>

  );
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

export default TourRoutesSheet;
