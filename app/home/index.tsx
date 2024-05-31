import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { getPaddingTop, hp, wp } from '@/helpers/common';
import Categories from '@/components/Categories';
import { apiCall } from '@/api';
import ImageGrid from '@/components/ImageGrid';
import { wallpapersApi } from '@/store/apis/wallpaperApis';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { useWallpaperData } from '@/store/selectors/wallpapersSelector';
import { addWallpapersData } from '@/store/slices/wallpaperSlice';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const searchInputRef = useRef(null);

  const dispatchWallpapers = useAppDispatch();
  // getting wallpapers from redux store
  const wallpaperData = useAppSelector(useWallpaperData);

  // calling this function on category click
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const {
    data: searchedWallpapers,
    isLoading: isSearchedWallpaperLoading,
    isFetching: isSearchedWallpaperFetching,
    isSuccess: isSearchedWallpaperSuccess,
    isError: isSearchedWallpaperError,
    error: searchedWallpaperError,
  } = wallpapersApi.useSearchWallpaperQuery(searchTerm, {
    skip: !searchTerm || searchTerm.replace(/ /g, '') === '',
  });

  if (isSearchedWallpaperSuccess) {
    dispatchWallpapers(addWallpapersData(searchedWallpapers!));
  }

  // this debounce is called when user stop typing in search input
  const setSearchDebounce = debounce((searchQuery: string) => {
    setSearchTerm(searchQuery);
  }, 500);

  // when user type something in search input
  const setSearchQuery = useCallback((search: string) => {
    setSearchInputValue(search);
    setSearchDebounce(search);
  }, []);

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
      <ScrollView contentContainerStyle={{ gap: 16, flexGrow: 1 }}>
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
            value={searchInputValue}
            onChangeText={(value) => setSearchQuery(value)}
          />
          {searchInputValue && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => setSearchQuery('')}
            >
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

        {/* images masonry grid */}
        {isSearchedWallpaperLoading || isSearchedWallpaperFetching ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator
              size={'large'}
              color={theme.colors.neutral(0.9)}
            />
          </View>
        ) : (
          <ImageGrid data={wallpaperData.hits} />
        )}
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
