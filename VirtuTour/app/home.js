import { StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import Map from './components/map/map.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CommonBottomSheet from './components/common/BottomSheets/CommonBottomSheet.tsx';

export default function Home() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
            <Text style={styles.buttonText}>Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Roam button pressed")}>
            <Text style={styles.buttonText}>Roam</Text>
          </TouchableOpacity>
        </View>
        {/* {bottomSheetVisible && <BottomSheet />} */}
        {bottomSheetVisible && <CommonBottomSheet />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 60,
  },

  button: {
    backgroundColor: '#500000',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'black',
  },

  buttonText: {
    color: 'white',
  }
})