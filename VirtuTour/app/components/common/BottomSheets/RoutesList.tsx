import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './RoutesList.style.js';
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
