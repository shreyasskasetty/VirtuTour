import React, {useState} from 'react';
import { Text } from 'react-native';
import Routes from '../../routes/Routes';
import Toggle from '../../routes/Toggle';
import styles from './RoutesList.style.js';

const RoutesAndToggle = ({bottomSheetRef}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  return (
    <>
      <Text style={styles.bottomSheetHeading}>Routes</Text>
      <Toggle selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Routes bottomSheetRef = {bottomSheetRef} selectedOption={selectedOption} />
    </>
  );
};

export default RoutesAndToggle;