
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const PlaceCard = ({sourceName, source}) => {
    return (
    <View style={styles.cardContainer}>
      {source && <Image source={source} style={[styles.colorIndicator]} />}
      <View style={styles.routeDetails} >
        <Text style={styles.routeName}>{sourceName}</Text>
      </View>
    </View>
  );}

  const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
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

  export default PlaceCard;