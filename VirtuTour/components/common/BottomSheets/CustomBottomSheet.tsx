import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './BottomSheet.style.js'
import Routes from '../../routes/Routes';
import Toggle from '../../routes/Toggle';
import {locations} from '../../../constants/map/places'


const CustomBottomSheetContent = () => {

  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState("None");

  // useEffect(() => {
  //   const selectedPlace = locations[selectedOption];
  //   setSelectedRoute(selectedPlace ? selectedPlace.name : 'None');
  // }, [selectedOption]);

  const handleSelectedRoute = (routeName) => {
    setSelectedRoute(routeName);
  };

  return (
    <View>
      <View style={styles.line} />
      <Text style={styles.bottomSheetHeading}>Routes</Text>
      <Text>{selectedRoute}</Text>
      <Toggle selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
      <Routes selectedOption={selectedOption}  onRouteSelect={handleSelectedRoute}/>
    </View>
  );
}

export default CustomBottomSheetContent;
