import { getDistance } from 'geolib';
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {locations} from '../../constants/map/places'
import AudioControls from './audioControl'
import AudioLocationService, {trackInit} from './AudioLocationService';
import { Icon } from 'react-native-elements'
import { PLAY_POSITION_TOP } from '../../constants/data/data';
import { useStore, useDispatch } from 'react-redux';
import { changePlayMode } from '../../context/actions/audioActions';
import { GUIDE_TOUR_TYPE } from '../../context/constants';


const {
    playAudio,
    pauseAudio,
    setVolume,
    handleAudioState,
    getStatus
} = AudioControls()

const Narration = ({currentLocation}) => {

    const playMode = useStore().getState().audio.playMode;
    const dispatch = useDispatch()
    const [currentTracks, setCurrentTrack] = useState({})
    const trackProgress = useRef({})
    const trackStore = useRef({})
    const navigation = useStore().getState().map.navigation
    const route = useStore().getState().map.routeObj
    const tourType = useStore().getState().button.tourType


    const setPlayMode = (mode) => {
        dispatch(changePlayMode(mode))
    }

    useEffect(()=>{
        if(!playMode)
        {
            unloadCurrentAudio()
        }else {
            loadBackAudio()
        }
    }, [playMode])
    
    useEffect(()=>{
        if(navigation)
        {
            loadTrackStore()

            const currentStateOfTracks = {...currentTracks}
            for(const key in currentStateOfTracks)
            {
                currentStateOfTracks[key] = false
            }

            setCurrentTrack(currentStateOfTracks)

            for(const key in trackProgress.current)
            {
                trackProgress.current[key] = 0
            }

            if(!playMode)
            {
                console.log("Setting mode to Play: True for navigation.")
                setPlayMode(true)
            }
        }else{
            if(playMode)
            {
                console.log("Setting mode to Play: False for navigation.")
                setPlayMode(false)
            }
        }
    },[navigation])

    function onPress(){
        console.log("Setting mode to Play: " + !playMode)
        setPlayMode(!playMode)
    }

    useEffect(()=>{
        try{
            mapLocationToAudio(currentLocation);
        }catch(err)
        {
            console.log(err)
        }
    },[currentLocation]);

    async function loadTrackStore()
    {
        console.log("Loading Track Store")
        if(Object.keys(trackStore.current).length === 0)
        {
            trackInit.then((map) => {
                for(const key in map)
                {
                    trackStore.current[key] = map[key]
                }
            })
        }
    }

    function unloadCurrentAudio() {
        for(key in currentTracks)
        {
            if(currentTracks[key])
            {
                pauseAudio(trackStore.current[key])
            }
        }
    }

    function loadBackAudio() {

        for(key in currentTracks)
        {
            if(currentTracks[key])
            {
                console.log(key)
                playAudio(trackStore.current[key])
            }
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
        
        if(playMode)
        {
            //console.log("Updating existing track.")
            if (updatedInfo.volume <= 0)
            {
                await saveProgress(audioSource, updatedInfo.trackId)
                console.log("Unloading a song, because volume is zero")
                await pauseAudio(audioSource)
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
    }

    const mapLocationToAudio = async (currentLocation) =>
    {
        if(!playMode)
        {
            //console.log("Return because of current mode is false.")
        }else{
            tracks = AudioLocationService(currentLocation, tourType === GUIDE_TOUR_TYPE? route.route : locations);

            let currentStateOfTracks = {...currentTracks}
            let isUpdated = false
            for (key in currentStateOfTracks)
            {
                if(currentStateOfTracks[key] && !tracks.some((track) => track.trackId === key))
                {
                    isUpdated = true
                    currentStateOfTracks[key] = false
                    await saveProgress(trackStore.current[key], key)
                    await pauseAudio(trackStore.current[key])
                }
            }

            for(const track of tracks)
            {
                if(currentStateOfTracks[track.trackId])
                {
                    updateExistingTrack(trackStore.current[track.trackId], track)
                }
                else if(track.volume > 0){
                    console.log("New Track is added");
                    console.log(track)
                    isUpdated = true
                    currentStateOfTracks[track.trackId] = true
                    let positionMillis = 0
                    if(trackProgress.current[track.trackId])
                    {
                        positionMillis = trackProgress.current[track.trackId]
                    }
                    console.log("Position in mills", track.trackId, positionMillis)
                    await playAudio(trackStore.current[track.trackId], positionMillis)
                }
            }

            if(isUpdated)
            {
                console.log("Updating the sound map");
                setCurrentTrack((prevState)=>{
                    // console.log("prevstate : ")
                    // console.log(prevState)
                    // console.log("updated state : " )
                    // console.log(currentStateOfTracks) 
    
                    return currentStateOfTracks;
                })
            }
        }
    }

    if(!navigation)
    {
        return (<></>)
    }
 
    return (
        <View style={styles.container}>
            {/* {
                playMode && justFinished ? 
                <Icon name={"replay"} raised type='material'onPress={replayTrack}/>
                : <></>
            } */}
            <Icon name={playMode? "pause" : "play-arrow"} raised type='material'onPress={onPress}/>
            {/* <Button title={"Lat: " + currentLocation.latitude + " Long: " + currentLocation.longitude}  />
            <Button title={" " + getDistance( currentLocation, locations[11])} /> */}
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