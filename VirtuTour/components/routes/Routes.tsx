import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import RouteCard from './RouteCard';
import {locations} from '../../constants/map/places'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';

const {width: SCREEN_WIDTH} = Dimensions.get('screen')

const Routes = ({ selectedOption, onRouteSelect }) => {
    const recommendedLocations = []
    /*NOTE: change locations to routes. Add a new file in map called routes and create different routes*/
    const places = selectedOption === 0?locations : recommendedLocations;

    // Function to handle route selection
    const handleRouteSelect = (routeName) => {
        // Invoke the callback function to pass the name of selected route to the parent
        onRouteSelect(routeName);
    };

    return(
        <View>
            <View style={styles.line}/>
            <ScrollView style={styles.scrollview}>
            {
                places.length === 0?(
                    <Text style={{alignSelf:'center'}}>
                        No Recommended Routes
                    </Text>
                    ):places.map(route => (
                    <TouchableOpacity key={route.name} onPress={() => handleRouteSelect(route.name)}>
                        <RouteCard
                            key={route.name}
                            routeName={route.name}
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

export default Routes;