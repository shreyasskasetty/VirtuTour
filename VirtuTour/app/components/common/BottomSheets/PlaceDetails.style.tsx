import { StyleSheet } from 'react-native';

export const placeDetailStyles = StyleSheet.create({
  placeDetailContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    width: '100%',
    flexGrow: 0.18,
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  nextStopText:{
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  exitButton: {
    height: 35,
    backgroundColor: '#500000',
    padding:10,
    width: 80,
    borderRadius: 20,
    alignItems: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  descriptionText: {
    padding: 20,
    textAlign: 'justify',
    fontSize: 16,
  },
  contentContainer: {
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 30,
    width: 300,
    height: 300,
  },
});