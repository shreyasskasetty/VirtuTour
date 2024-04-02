import { getDistance } from 'geolib';

const proximity_limit = 25

const background_pause_limit = 35;

const background_drop_limit = background_pause_limit + 30;

const background_drop_states = 6;

const Background_music = {
    name: "Background Music",
    latitude: 30.61708581996873, 
    longitude: -96.33897274238043,
    track : 'https://sample-music.netlify.app/Faded.mp3'
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

const AudioLocationService = (currentLocation, routes) => {
    close_locations = routes
    close_locations = close_locations.filter((route) => {
        const distance = getDistance(currentLocation, route)
        return distance < proximity_limit
    });

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