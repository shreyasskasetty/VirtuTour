import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Stack } from "expo-router";
import Map from '../components/map/map.js'

export default function Home() {
  return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
       <Map />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});