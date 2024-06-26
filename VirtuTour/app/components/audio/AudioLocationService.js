import { getDistance } from 'geolib';
import {locations} from '../../constants/map/places'
import AudioControls from './audioControl'
import { Asset } from 'expo-asset';

const {
    getSoundSource,
    getSoundSourceFromLocalSource,
} = AudioControls()

const proximity_limit = 25

const background_pause_limit = 35;

const background_drop_limit = background_pause_limit + 30;

const background_drop_states = 6;

const Background_music = {
    name: "Background Music",
    latitude: 30.61708581996873, 
    longitude: -96.33897274238043,
    track : 'https://github.com/shreyasskasetty/VirtuTour/blob/main/VirtuTour/app/constants/audio/background-music.mp3?raw=true'
}

function buildTrackInfo (track, volume = 1, shouldPlay = true){
    return (
        {
            trackId : track.name,
            track : track.track,
            volume : volume,
            playState : shouldPlay
        }
    )
}

const getDistanceMap = (currentLocation, routes) => {
    distance_map = routes.map((route) => {
        return [route.name, getDistance(currentLocation, route)]
    })
    distance_map.sort((x, y) => {
        return x[1] > y[1] ? 1 : -1;
    })
    return distance_map
}

export const getClosestLocation = (currentLocation, routes) =>{
    close_locations = routes
    close_locations = close_locations.filter((route) => {
        const distance = getDistance(currentLocation, route)
        return distance < proximity_limit
    });

    return close_locations
}

const AudioLocationService = (currentLocation, routes) => {
    close_locations = getClosestLocation(currentLocation, routes)

    currentTracks = []
    if (close_locations.length !== 0)
    {
        currentTracks = close_locations.map((loc) => buildTrackInfo(loc));
    }
    else {
        distance_map = getDistanceMap(currentLocation, routes)
        distance_to_nearest = distance_map[0][1]
        background_volume = 1;

        if(distance_to_nearest <= background_drop_limit)
        {
            drop_distance = distance_to_nearest - background_pause_limit
            drop_rate = Math.ceil(drop_distance / background_drop_states)
            background_volume = 1 * (drop_rate / background_drop_states)
            background_volume = background_volume <= 0 ? 0 : background_volume;

        }

        currentTracks = [buildTrackInfo(Background_music, background_volume)]
    }

    return currentTracks;
}

export default AudioLocationService;


const background_track = 'https://github.com/shreyasskasetty/VirtuTour/blob/main/VirtuTour/app/constants/audio/background-music.mp3?raw=true'

const createSoundSource = async (track, options) => {
    let soundSource = getSoundSource;
    if(track instanceof Asset)
    {
        soundSource = getSoundSourceFromLocalSource;
    }
    const sound = await soundSource(track, 1, options);
    return sound
}

const initTrackStore =  async () => {
    console.log("Init Track Store")
    const map = {}
    for (const place of locations)
    {
        options = {
            shouldPlay : false
        }
        map[place.name] = await createSoundSource(place.track, options)
    }

    map["Background Music"] = await createSoundSource(background_track, {
        shouldPlay : false
    })

    return map
}

const trackInit = initTrackStore().then(x => { return x });

export { trackInit };