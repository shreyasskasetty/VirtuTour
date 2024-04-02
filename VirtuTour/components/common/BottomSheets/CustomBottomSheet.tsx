import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './BottomSheet.style.js';
import RouteDetails from './RouteDetails';
import RoutesAndToggle from './RoutesAndToggle';

const CustomBottomSheetContent = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleSelectedRoute = (route: any) => {
    setSelectedRoute(route);
  };

  const clearSelectedRoute = () => {
    setSelectedRoute(null);
  };

  return (
    <View>
      <View style={styles.line} />
      {selectedRoute ? (
        <RouteDetails selectedRoute={selectedRoute} clearSelectedRoute={clearSelectedRoute} />
      ) : (
        <RoutesAndToggle
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onRouteSelect={handleSelectedRoute}
        />
      )}
    </View>
  );
};

export default CustomBottomSheetContent;
