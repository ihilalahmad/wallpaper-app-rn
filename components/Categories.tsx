import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { categories } from '@/constants/Data';
import CategoryItem from './CategoryItem';
import { wp } from '@/helpers/common';

interface ICategoriesProps {
  activeCategory: string;
  handleCategoryClick: (category: string) => void;
}

const Categories = (props: ICategoriesProps) => {
  const { activeCategory, handleCategoryClick } = props;
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={styles.flatListContainer}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => {
        return (
          <CategoryItem
            title={item}
            index={index}
            isActive={activeCategory == item}
            handleCategoryClick={handleCategoryClick}
          />
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 15,
  },
});
export default Categories;
