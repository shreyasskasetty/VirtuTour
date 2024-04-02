import {View, Text} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {Gesture,  GestureDetector } from 'react-native-gesture-handler';
import Animated, {Extrapolate,interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styles from './BottomSheet.style.js'
import { HALF_SCREEN_TRANSLATE_Y, QUARTER_SCREEN_STRANLATE_Y, MAX_TRANSLATE_Y } from '../../../constants/data/data';
import Routes from '../../routes/Routes';
import Toggle from '../../routes/Toggle';

const BottomSheet = () =>{
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const [selectedOption, setSelectedOption] = useState(0);

    const scrollTo = useCallback((destination: number) => {
        "worklet";
        translateY.value = withSpring(destination, {damping: 15})
    },[])

    const gesture = Gesture.Pan().onStart(()=>{
        context.value = {y: translateY.value}
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    }).onEnd(()=>{
        if (translateY.value > HALF_SCREEN_TRANSLATE_Y && 
            translateY.value < HALF_SCREEN_TRANSLATE_Y - QUARTER_SCREEN_STRANLATE_Y/2) {
            scrollTo(QUARTER_SCREEN_STRANLATE_Y)
        }

        if (translateY.value < QUARTER_SCREEN_STRANLATE_Y && translateY.value > 3*QUARTER_SCREEN_STRANLATE_Y/2){
            scrollTo(HALF_SCREEN_TRANSLATE_Y)
        }

        if(translateY.value > QUARTER_SCREEN_STRANLATE_Y){
            scrollTo(QUARTER_SCREEN_STRANLATE_Y)
        }

        if(translateY.value < HALF_SCREEN_TRANSLATE_Y && translateY.value > HALF_SCREEN_TRANSLATE_Y + QUARTER_SCREEN_STRANLATE_Y/3){
            scrollTo(MAX_TRANSLATE_Y)
        }
        if(translateY.value > MAX_TRANSLATE_Y && translateY.value < MAX_TRANSLATE_Y - QUARTER_SCREEN_STRANLATE_Y/2){
            scrollTo(HALF_SCREEN_TRANSLATE_Y)
        }        
    });


    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value, 
            [MAX_TRANSLATE_Y+50, MAX_TRANSLATE_Y],
            [25,5],
            Extrapolate.CLAMP)
        return {
            borderRadius,
            transform: [{translateY: translateY.value}],
        }
    })

    useEffect(()=> {
        scrollTo(QUARTER_SCREEN_STRANLATE_Y);
    },[])

    return (
       <GestureDetector gesture={gesture}>
            <Animated.View style = {[styles.bottomSheetContainer, rBottomSheetStyle]} > 
                <View style={styles.line} />
                <Text style={styles.bottomSheetHeading}>Routes</Text>
                <Toggle selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
                <Routes selectedOption={selectedOption}/>
            </Animated.View>
        </GestureDetector>
    );
}

export default BottomSheet;
