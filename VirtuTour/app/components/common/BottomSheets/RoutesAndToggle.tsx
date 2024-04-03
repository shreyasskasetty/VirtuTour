import React from 'react';
import { Text } from 'react-native';
import Routes from '../../routes/Routes';
import Toggle from '../../routes/Toggle';
import styles from './BottomSheet.style.js';

interface RoutesAndToggleProps {
  selectedOption: number;
  setSelectedOption: (option: number) => void;
  onRouteSelect: (route: any) => void;
}

const RoutesAndToggle: React.FC<RoutesAndToggleProps> = ({
  selectedOption,
  setSelectedOption,
  onRouteSelect,
}) => {
  return (
    <>
      <Text style={styles.bottomSheetHeading}>Routes</Text>
      <Toggle selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Routes selectedOption={selectedOption} onRouteSelect={onRouteSelect} />
    </>
  );
};

export default RoutesAndToggle;