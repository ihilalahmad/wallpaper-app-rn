import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '@/helpers/common';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { Link, useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { wallpapersApi } from '@/store/apis/wallpaperApis';
import { addWallpapersData } from '@/store/slices/wallpaperSlice';
import ToastNew from 'react-native-toast-message';

const Page = () => {
  const router = useRouter();
  const dispatchWallpapers = useAppDispatch();
  const {
    data: wallpapersData,
    isLoading: isWallpaperLoading,
    isFetching: isWallpaperFetching,
    isSuccess: isWallpaperSuccess,
    isError: isWallpaperError,
  } = wallpapersApi.useGetAllWallpapersQuery(1);

  const renderToastError = (title: string) => {
    console.log('toast: ', title);

    return ToastNew.show({
      type: 'error',
      position: 'bottom',
      swipeable: true,
      visibilityTime: 4000,
      text1: title,
    });
  };

  const getAllWallpapers = () => {
    // renderToastError('testing error toast');
    // Alert.alert('Testing', 'This is a testing prompt');
    if (isWallpaperLoading || isWallpaperFetching) {
    }
    if (isWallpaperSuccess) {
      dispatchWallpapers(addWallpapersData(wallpapersData));
      router.push('/home/');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.backgroundImage}
        resizeMode='cover'
      />

      {/*Linear gradient*/}
      <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255,255,255,0.5)',
            'white',
            'white',
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        >
          {/* content */}
          <View style={styles.contentContainer}>
            <Animated.Text
              entering={FadeInDown.delay(400).springify()}
              style={styles.title}
            >
              Pixels
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(500).springify()}
              style={styles.punchLine}
            >
              Every pixel tells a story
            </Animated.Text>
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              {/* <Link href={'/home/'} asChild> */}
              <Pressable
                style={styles.startButton}
                onPress={() => getAllWallpapers()}
              >
                <Text style={styles.startButtonText}>Start Exploring</Text>
              </Pressable>
              {/* </Link> */}
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold as '700',
  },
  punchLine: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium as '500',
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
  },
  startButtonText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fontWeights.medium as '500',
    letterSpacing: 1,
  },
});
export default Page;
