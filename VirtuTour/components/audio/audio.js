import { Audio } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {locations} from '../../constants/map/places'
import { getDistance } from 'geolib';
import AudioControls from './audioControl'
import AudioLocationService from './AudioLocationService';

const {
    unloadAudio,
    playAudio,
    getSoundSource,
    pauseAudio,
    setVolume,
    handleAudioState,
    getStatus
} = AudioControls()

const getTrackInfo = (location, currectTrack) => {
    currentPlace = locations[0]
    volumne = 0.7
    update = false
    shouldPlay = false

    if (!currectTrack)
    {
        update = true
        shouldPlay = true
    }
    else{
        update = true
        volumne = currectTrack.volumne - 0.01
        shouldPlay = true
    }

    if (volumne <= 0)
    {
        shouldPlay = false
        volumne = 0
        update = false
    }

    return {
        update : update,
        trackId : currentPlace.name,
        track : currentPlace.track,
        volumne : volumne,
        shouldPlay : shouldPlay
    }
}

const Narration = ({currentLocation}) => {

    const [currentMode, setCurrentMode] = useState(false)
    // const [soundMap, setSoundMap] = useState({});
    const soundMap = useRef({})

    function onPress(){
        console.log("Setting mode to Play: " + !currentMode)
        setCurrentMode(!currentMode)
    }

    function unloadCurrentAudio() {
        const tracks  = soundMap.current
        for (trackId in tracks)
        {
            console.log(trackId)
            pauseAudio(tracks[trackId])
        }
    }

    function loadBackAudio() {
        const tracks  = soundMap.current

        for (trackId in tracks)
        {
            console.log(trackId)
            playAudio(tracks[trackId])
        }
    }


    const updateExistingTrack = async (audioSource, updatedInfo) => {
        
        console.log("Updating existing audio")
        console.log(updatedInfo)

        await setVolume(audioSource, updatedInfo.volume)

        await handleAudioState(audioSource, updatedInfo.playState)

    }

    const mapAudioToLocation = async (currentLocation) =>
    {
        if(!currentMode)
            return

        tracks = AudioLocationService(currentLocation, locations);

        let isUpdated = false
        updatedSoundMap = {...soundMap.current}
        tracks_to_remove = []

        for (key in updatedSoundMap)
        {
            if(! tracks.some((track) => track.trackId === key))
            {
                console.log("Removing " + key + " from sound map.")
                console.log(tracks)
                unloadAudio(updatedSoundMap[key]);
                tracks_to_remove.push(key)
                updatedSoundMap[key] = undefined;
                // isUpdated = updatedSoundMap[key] ? true : false;
            }
        }

        isUpdated = tracks_to_remove.length !== 0;

        tracks_to_remove.forEach(element => {
            delete updatedSoundMap[element];
        });

        for(const track of tracks)
        {
            if(updatedSoundMap.hasOwnProperty(track.trackId) && updatedSoundMap[track.trackId])
            {
                updateExistingTrack(updatedSoundMap[track.trackId], track)
            }
            else {
                console.log("New Track is added");
                isUpdated = true;
                const sound = await getSoundSource(track.track);
                updatedSoundMap[track.trackId] = sound
            }
        }

        if(isUpdated)
        {
            console.log("Updating the sound map");
            soundMap.current = updatedSoundMap
        }
    }

    useEffect(()=>{
        if(!currentMode)
        {
            unloadCurrentAudio()
        }else {
            loadBackAudio()
        }
    }, [currentMode])

    mapAudioToLocation(currentLocation);

    return (
        <View style={styles.container}>
            <Button title="Play Sound" onPress={onPress} />
            <Button title={"Lat: " + currentLocation.latitude + " Long: " + currentLocation.longitude}  />
            <Button title={" " + getDistance(currentLocation, locations[4])} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      zIndex: 1
    },
  });

export default Narration;