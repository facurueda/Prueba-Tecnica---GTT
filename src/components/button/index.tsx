import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { ButtonProps } from './button.interface';
import styles from './styles';

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, style, ...props }) => {
  return (
    <PaperButton
      mode="contained"
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      {title}
    </PaperButton>
  );
};

export default CustomButton;
