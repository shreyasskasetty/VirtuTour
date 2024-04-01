import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './BottomSheet.style.js'
import Routes from '../../routes/Routes';
import Toggle from '../../routes/Toggle';
import {locations} from '../../../constants/map/places'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon library

const CustomBottomSheetContent = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Callback function to handle route selection
  const handleSelectedRoute = (route) => {
    setSelectedRoute(route);
  };

  // Function to clear the selected route
  const clearSelectedRoute = () => {
    setSelectedRoute(null);
  };

  return (
    <View>
      <View style={styles.line} />
      
      {/* Conditionally render route details or toggle/routes based on whether a route is selected */}
      {selectedRoute ? (
        <>
          <TouchableOpacity onPress={clearSelectedRoute}>
            <FontAwesome name="arrow-left" size={24} color="black" /> 
          </TouchableOpacity>
          <Text style={styles.bottomSheetHeading}>{selectedRoute.name}</Text>
          <Text>{selectedRoute.latitude}</Text>
          <Text>{selectedRoute.longitude}</Text>
        </>
      ) : (
        <>
          <Text style={styles.bottomSheetHeading}>Routes</Text>
          <Toggle selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          <Routes selectedOption={selectedOption} onRouteSelect={handleSelectedRoute} />
        </>
      )}
    </View>
  );
};

export default CustomBottomSheetContent;


// const CustomBottomSheetContent = () => {

//   const [selectedOption, setSelectedOption] = useState(0);
//   const [selectedRoute, setSelectedRoute] = useState({ name: "None", latitude: -1, longitude: -1 });

//   // useEffect(() => {
//   //   const selectedPlace = locations[selectedOption];
//   //   setSelectedRoute(selectedPlace ? selectedPlace.name : 'None');
//   // }, [selectedOption]);

//   const handleSelectedRoute = (route) => {
//     setSelectedRoute(route);
//   };

//   return (
//     <View>
//       <View style={styles.line} />
//       <Text style={styles.bottomSheetHeading}>Routes</Text>
//       <Text>{selectedRoute.name}</Text>
//       <Text>{selectedRoute.latitude}</Text>
//       <Text>{selectedRoute.longitude}</Text>
//       <Toggle selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
//       <Routes selectedOption={selectedOption}  onRouteSelect={handleSelectedRoute}/>
//     </View>
//   );
// }

// export default CustomBottomSheetContent;
