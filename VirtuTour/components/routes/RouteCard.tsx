
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RouteCard = ({routeName, colorIndicator}) => (
    <View style={styles.cardContainer}>
      <View style={[styles.colorIndicator, {backgroundColor: 'grey'}]} />
      <View style={styles.routeDetails}>
        <Text style={styles.routeName}>{routeName}</Text>
        <Text style={styles.finalDestination}>{'Century Tree'}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    colorIndicator: {
      width: 50,
      height: 50,
      borderRadius: 8,
    },
    routeDetails: {
      marginLeft: 20,
    },
    routeName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    finalDestination: {
      fontSize: 14,
    },
    locationDetails: {
      fontSize: 12, // Slightly smaller font for location details
      color: 'grey', // Optional: Different color to distinguish from route name and final destination
    },
  });

  export default RouteCard;