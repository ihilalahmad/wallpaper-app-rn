import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import { getColumnCount, hp, wp } from '@/utils/helpers/design';
import ImageCard from './ImageCard';
import { WallpaperType } from '@/types/WallpaperTypes';
import { theme } from '@/constants/theme';
import { Entypo } from '@expo/vector-icons';

interface ImageGridProps {
  data: WallpaperType[];
}
const ImageGrid = (props: ImageGridProps) => {
  const { data } = props;
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Entypo name='emoji-sad' size={100} color={theme.colors.gray} />
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorSubtitle}>
          No wallpapers available at the moment. Please check back later or try
          a different category.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <MasonryFlashList
        data={data}
        numColumns={getColumnCount()}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  errorTitle: {
    fontSize: hp(5),
    color: theme.colors.gray,
    fontWeight: theme.fontWeights.semiBold as '600',
  },
  errorSubtitle: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium as '500',
    color: theme.colors.gray,
    textAlign: 'center',
  },
  listContainer: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
export default ImageGrid;
