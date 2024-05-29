import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';

interface ICategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleCategoryClick: (category: string) => void;
}

const CategoryItem = (props: ICategoryItemProps) => {
  const { title, index, isActive, handleCategoryClick } = props;

  let categoryTitleColor = isActive
    ? theme.colors.white
    : theme.colors.neutral(0.8);
  let categoryBackgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;

  return (
    <View>
      <Pressable
        onPress={() => handleCategoryClick(isActive ? '' : title)}
        style={[styles.category, { backgroundColor: categoryBackgroundColor }]}
      >
        <Text style={[styles.title, { color: categoryTitleColor }]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  category: {
    padding: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    // backgroundColor: 'white',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium as '500',
  },
});
export default CategoryItem;
