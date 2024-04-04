import Animated, {useAnimatedStyle, withTiming } from 'react-native-reanimated'
import React from 'react';
import {View, StyleSheet} from 'react-native'
import {SCREEN_WIDTH, TouchableOpacity } from '@gorhom/bottom-sheet';
const enum OPTIONS {
    ALL_ROUTES,
    RECOMMENDED_ROUTES
}
const Toggle = ({selectedOption, setSelectedOption}) => {
   
    const sliderPosition = useAnimatedStyle(() => {
        const position = selectedOption === 0 ? 0 : SCREEN_WIDTH * 0.9 / 2;
        return {
            transform: [{ translateX: withTiming(position) }],
        };
    });

    const textStyle = (option) => useAnimatedStyle(() => {
        const isActive = selectedOption === option;
        return {
            transform: [{ scale: isActive ? 1.1 : 1 }],
            fontWeight: isActive ? '600' : 'normal'
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, sliderPosition]} />
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => setSelectedOption(OPTIONS.ALL_ROUTES)}>
                <Animated.Text style={[styles.text, textStyle(OPTIONS.ALL_ROUTES)]}>
                    All Routes
                </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => setSelectedOption(OPTIONS.RECOMMENDED_ROUTES)}>
                <Animated.Text style={[styles.text, textStyle(OPTIONS.RECOMMENDED_ROUTES)]}>
                    Recommended
                </Animated.Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.9,
        height: 35,
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#EEEEEF',
        overflow: 'hidden', // Ensure the slider does not overflow the rounded corners
        position: 'relative', // Required for absolute positioning of the slider
    },
    text: {
        flex: 1, 
        padding: 10,
        fontSize: 12,
        textAlignVertical: 'center', // Center text vertically
        textAlign: 'center', 
        zIndex: 1,
    },
    slider: {
        margin: 2, 
        position: 'absolute',
        width: '49%', 
        height: '85%',
        backgroundColor: 'white',
        borderRadius: 5,
        zIndex: -1,
        shadowColor: 'grey',
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
})


export default Toggle;