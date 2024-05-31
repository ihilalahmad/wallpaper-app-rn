import { WallpaperType } from '@/types/WallpaperTypes';
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

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (deviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    return 2;
  }
};

export const isLastInRow = (index: number) => {
  return (index + 1) % getColumnCount() === 0;
};

export const getImageHeight = (item: WallpaperType) => {
  let { imageHeight: height, imageWidth: width } = item;
  return { height: getImageSize(height, width) };
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};
