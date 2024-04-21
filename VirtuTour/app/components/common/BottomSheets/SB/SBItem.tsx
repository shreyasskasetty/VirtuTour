import React from "react";
import type { StyleProp, ViewStyle, ViewProps, ImageSourcePropType } from "react-native";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import Constants from "expo-constants";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>
  index?: number
  image?: any
  pretty?: boolean
  showIndex?: boolean
  img?: ImageSourcePropType
}

export const SBItem: React.FC<Props> = (props) => {
  const { style, showIndex = true, index, image, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
  return (
    <Animated.View testID={testID} style={{ flex: 1 }} >
      <SBImageItem style={style} index={index} image={image} img={img} />
    </Animated.View>
  );
};