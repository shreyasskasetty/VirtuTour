import React from "react";
import type {
  StyleProp,
  ViewStyle,
  ImageURISource,
  ImageSourcePropType,
} from "react-native";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Image } from 'expo-image';

interface Props {
  style?: StyleProp<ViewStyle>
  index?:number,
  image?: any
  img?: ImageSourcePropType
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  image,
  img
}) => {
  const index = _index ?? 0;
  return  (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="small" />
      <Image cachePolicy={'memory-disk'} key={index} style={styles.image} source={img ?? image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});