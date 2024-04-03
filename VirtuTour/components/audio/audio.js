import { Audio } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet,Button } from 'react-native';
import {locations} from '../../constants/map/places'
import { getDistance } from 'geolib';
import AudioControls from './audioControl'
import AudioLocationService from './AudioLocationService';
import { Icon } from 'react-native-elements'
import { PLAY_POSITION_TOP } from '../../constants/data/data';


const {
    unloadAudio,
    playAudio,
    getSoundSource,
    pauseAudio,
    setVolume,
    handleAudioState,
    getStatus
} = AudioControls()

const Narration = ({currentLocation}) => {

    const [currentMode, setCurrentMode] = useState(false)
    // const [soundMap, setSoundMap] = useState({});
    // const soundMap = useRef({})
    const [trackMap, setTrackMap] = useState({}) 
    const trackProgress = useRef({})

    function onPress(){
        console.log("Setting mode to Play: " + !currentMode)
        setCurrentMode(!currentMode)
    }

    function unloadCurrentAudio() {
        //const tracks  = soundMap.current
        const tracks  = trackMap        
        for (trackId in tracks)
        {
            console.log(trackId)
            pauseAudio(tracks[trackId])
        }
    }

    function loadBackAudio() {
        // const tracks  = soundMap.current
        const tracks  = trackMap

        for (trackId in tracks)
        {
            console.log(trackId)
            playAudio(tracks[trackId])
        }
    }

    const saveProgress = async (source, trackId) => {
        if (source)
        {
            const {positionMillis} = await getStatus(source);
            trackProgress.current[trackId] = positionMillis;
        }
    }


    const updateExistingTrack = async (audioSource, updatedInfo) => {
        
        console.log("Updating existing audio")
        console.log(updatedInfo)

        if (updatedInfo.volume <= 0)
        {
            await saveProgress(audioSource, updatedInfo.trackId)
            console.log("Unloading a song, because volume is zero")
            await unloadAudio(audioSource)
        }
        else {
            try{
                await setVolume(audioSource, updatedInfo.volume)
            }catch(err)
            {
                console.log(err)
            }
        }

        await handleAudioState(audioSource, updatedInfo.playState)

    }

    const mapAudioToLocation = async (currentLocation) =>
    {
        if(!currentMode)
            return

        tracks = AudioLocationService(currentLocation, locations);

        let isUpdated = false
        //updatedSoundMap = {...soundMap.current}
        updatedSoundMap = {...trackMap}
        tracks_to_remove = []

        for (key in updatedSoundMap)
        {
            if(! tracks.some((track) => track.trackId === key))
            {
                console.log("Removing " + key + " from sound map.")
                if(updatedSoundMap[key])
                {
                    await saveProgress(updatedSoundMap[key], key)
                    unloadAudio(updatedSoundMap[key]);
                }

                tracks_to_remove.push(key)
                updatedSoundMap[key] = undefined;
            }else if(!updatedSoundMap[key])
            {
                tracks_to_remove.push(key)
            }
        }

        isUpdated = tracks_to_remove.length !== 0;

        tracks_to_remove.forEach(element => {
            delete updatedSoundMap[element];
        });

        newlyAddedTracks = []
        for(const track of tracks)
        {
            if(updatedSoundMap.hasOwnProperty(track.trackId))
            {
                updateExistingTrack(updatedSoundMap[track.trackId], track)
            }
            else if(track.volume > 0){
                console.log("New Track is added");
                console.log(track)
                options = {}

                if(trackProgress.current[track.trackId])
                {
                    options["positionMillis"] = trackProgress.current[track.trackId]
                }

                isUpdated = true;
                newlyAddedTracks.push(track.trackId)
                const sound = await getSoundSource(track.track, track.volume, options);
                updatedSoundMap[track.trackId] = sound
            }
        }

        if(isUpdated)
        {
            console.log("Updating the sound map");
            //soundMap.current = updatedSoundMap
            //console.log(soundMap.current)
            setTrackMap((prevState)=>{
                // console.log("Newly Added Tracks")
                // console.log(newlyAddedTracks)
                // console.log("prevstate : ")
                // console.log(prevState)
                // console.log("updated state : " )
                // console.log(updatedSoundMap)

                for(const key of newlyAddedTracks)
                {
                    if(prevState[key])
                        unloadAudio(prevState[key])
                }

                return updatedSoundMap;
            })
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
            <Icon name={currentMode? "pause" : "play-arrow"} raised type='material'onPress={onPress}/>
            {/* <Button title={"Lat: " + currentLocation.latitude + " Long: " + currentLocation.longitude}  />
            <Button title={" " + getDistance( currentLocation, locations[4])} /> */}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      zIndex: 1,
      position:"absolute",
      top:PLAY_POSITION_TOP,
      right: 5,
    },
  });


export default Narration;