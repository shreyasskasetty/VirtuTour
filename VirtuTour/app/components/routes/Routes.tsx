import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import RouteCard from './RouteCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import routes from '../../constants/map/routes.js'
import { connect } from 'react-redux';
import { setRoute, setWayPoints } from '../../context/actions/mapActions';
import { setContentType } from '../../context/actions/bottomSheetActions';
import { BOTTOM_SHEET_TOUR_PREVIEW } from '../../context/constants';
import { getWayPoints } from '../../utility/map-helper';

const {width: SCREEN_WIDTH} = Dimensions.get('screen')
const edgePaddingValue = 70
const edgePadding = {
    top: edgePaddingValue,
    bottom: edgePaddingValue, 
    right: edgePaddingValue, 
    left: edgePaddingValue
}
const Routes = ({ selectedOption, mapRef, bottomSheetRef, setRoute, setWayPoints, setContentType}) => {
    const recommendedLocations = []

    // Function to handle route selection
    const handleRouteSelect = (route) => {
        setRoute({route});
        const wayPoints = getWayPoints(route);
        setWayPoints(wayPoints);
        setContentType({
            contentType: BOTTOM_SHEET_TOUR_PREVIEW
        });
        const region = {
            latitude: route.source.latitude,
            longitude: route.source.longitude,
            latitudeDelta: 0.004, 
            longitudeDelta: 0.004
        }
        mapRef.current?.animateToRegion(region, 1000)
        bottomSheetRef.current?.snapToIndex(0);
    };

    const routeList = selectedOption === 0? routes : recommendedLocations;
    return(
        <View>
            <View style={styles.line}/>
            <ScrollView style={styles.scrollview}>
            {
                routeList.length === 0?(
                    <Text style={{alignSelf:'center'}}>
                        No Recommended Routes
                    </Text>
                    ):routeList.map((route, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRouteSelect(route)}>
                    {/* <TouchableOpacity key={route.source.name}> */}
                        <RouteCard
                            key={route.source.name}
                            sourceName={route.source.name}
                            destinationName={route.destination.name}
                            colorIndicator={route.colorIndicator}
                        />
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    line: {
        width: SCREEN_WIDTH - 10,
        height: 0.25,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 25
    },
    scrollview: {
        height: SCREEN_HEIGHT*0.65,
        overflow:'hidden'
    }
})

const mapDispatchToProps = {
    setRoute,
    setContentType,
    setWayPoints
}

const mapStateToProps = (state)=>{
    return {
        mapRef : state.map.mapRef
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Routes);