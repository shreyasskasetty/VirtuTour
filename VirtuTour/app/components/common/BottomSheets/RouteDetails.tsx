import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import styles from './RoutesList.style.js';

interface RouteDetailsProps {
  selectedRoute: {
    source: { name: string };
    destination: { name: string };
    route: { name: string }[];
    colorIndicator: string;
  } | null;
  clearSelectedRoute: () => void;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ selectedRoute, clearSelectedRoute }) => {
  return (
    <>
      <TouchableOpacity onPress={clearSelectedRoute}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      {selectedRoute && (
        <>
          <Text style={styles.bottomSheetHeading}>Route Details</Text>
          <Text>Source: {selectedRoute.source.name}</Text>
          <Text>Destination: {selectedRoute.destination.name}</Text>
          <Text>Route: {selectedRoute.route.map((place) => place.name).join(' → ')}</Text>
          <Text>Color Indicator: {selectedRoute.colorIndicator}</Text>
        </>
      )}
    </>
  );
};

export default RouteDetails;
