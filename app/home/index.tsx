import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { getPaddingTop, hp, wp } from '@/helpers/common';
import Categories from '@/components/Categories';

const HomeScreen = () => {
  const [search, setSearch] = useState<string>('');
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  console.log('active category: ', activeCategory);

  return (
    <View style={[styles.container, { paddingTop: getPaddingTop(30) }]}>
      {/** header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name='bars-staggered'
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      {/* content section */}
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Ionicons
              name='search'
              size={22}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder='Search for photos...'
            ref={searchInputRef}
            value={search}
            onChangeText={(value) => setSearch(value)}
          />
          {search && (
            <Pressable style={styles.closeIcon} onPress={() => setSearch('')}>
              <Ionicons
                name='close'
                size={22}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semiBold as '600',
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  searchIcon: {
    padding: 5,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 5,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});
export default HomeScreen;
