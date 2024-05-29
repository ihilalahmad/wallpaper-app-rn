import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const wp = (percentage: any) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: any) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getPaddingTop = (padding: number): number => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : padding;
  return paddingTop;
};
