import { 
    StyleSheet,
 } from "react-native"

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            height: -6,
            width: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    wrapper: {
        flex: 1,
      },
      content: {
        flex: 1,
        padding: 20,
      },
      title: {
        fontWeight: '400',
        fontSize: 22,
      },
      fakeContent: {
        flex: 1,
        height: 1000,
      },
});

export default styles;