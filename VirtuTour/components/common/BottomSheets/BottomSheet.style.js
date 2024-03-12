import {SCREEN_HEIGHT} from '../../../utility/helper';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    bottomSheetContainer:{
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 25,
        top: SCREEN_HEIGHT,
        shadowOffset: {
            width: 0,
            height: 20
        }
    },
    line: {
        width: 50,
        height: 3,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 25
    }
})

export default styles;