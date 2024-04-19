import instance from ".";

const google_maps_api = {
    getDuration: (source, destination)=> instance.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${source.latitude},${source.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`),
};

export default google_maps_api;