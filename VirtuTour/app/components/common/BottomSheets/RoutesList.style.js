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
        width: 35,
        height: 3,
        opacity: 0.5,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 25
    },
    bottomSheetHeading:{
        paddingLeft: 20,
        fontSize: 30,
        fontWeight: '600'
    }
})

export default styles;