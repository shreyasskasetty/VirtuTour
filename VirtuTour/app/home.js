import { StyleSheet, 
        } from 'react-native';
import {useRef} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import Map from '../components/map/map.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../components/common/BottomSheets/BottomSheet.tsx';

export default function Home() {
  const mapRef = useRef();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
         <Map mapRef={mapRef}/>
          <BottomSheet />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})