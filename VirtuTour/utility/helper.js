import {Dimensions} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const getScreenSize = (percentage)=> {
    return - SCREEN_HEIGHT * percentage/100
}

export {SCREEN_HEIGHT, getScreenSize};