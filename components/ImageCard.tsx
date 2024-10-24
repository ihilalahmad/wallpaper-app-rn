import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { WallpaperType } from '@/types/WallpaperTypes';
import { getImageHeight, hp, isLastInRow, wp } from '@/utils/helpers/design';
import { Image } from 'expo-image';
import { theme } from '@/constants/theme';

interface IImageCardProps {
  item: WallpaperType;
  index: number;
}

const ImageCard = (props: IImageCardProps) => {
  const { item, index } = props;
  return (
    <Pressable
      style={[styles.imageWrapper, !isLastInRow(index) && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight(item)]}
        source={item.webformatURL}
        transition={1000}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: wp(100),
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
export default ImageCard;
