import { ButtonProps as PaperButtonProps } from 'react-native-paper';

export interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
  title: string;
  onPress: () => void;
  style?: object;
}
