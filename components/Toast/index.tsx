/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */

import { theme } from '@/constants/theme';
import { hp, wp } from '@/utils/helpers/design';
import { Feather, Ionicons } from '@expo/vector-icons';
import { memo } from 'react';

import { Text, View } from 'react-native';

type ToastProps = {
  variant?: string;
  title?: string;
  error?: boolean;
  success?: boolean;
};

const Toast = ({ variant, title, error, success }: ToastProps) => {
  return (
    <View
      style={{
        borderRadius: 9999,
        width: wp(83.3333),
        minHeight: hp(70),
        shadowColor: theme.colors.backgroundDarkGray,
        shadowOffset: {
          width: 0,
          height: hp(3),
        },
        shadowOpacity: 0.27,
        shadowRadius: hp(4.65),
        elevation: 6,
        maxWidth: '100%',
        alignSelf: 'center',
        backgroundColor: theme.colors.backgroundDarkGray,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flexShrink: 1,
          width: '100%',
          justifyContent: 'center',
          paddingLeft: wp(10),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexShrink: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexShrink: 1,
              alignItems: 'center',
              flexDirection: 'row',
              // justifyContent: 'space-between',
            }}
          >
            {error && <Ionicons name='close' size={wp(40)} color='#ff3333' />}

            {success && <Feather name='check' size={wp(40)} color='#5cb85c' />}

            <Text
              style={{
                fontWeight: '600',
                flexShrink: 1,
                fontFamily: 'poppins',
                fontSize: 17,
                color:
                  variant === 'solid'
                    ? '#fff'
                    : variant !== 'outline'
                    ? '#000'
                    : 'primary',
              }}
            >
              {title && title?.length > 70
                ? `${title?.slice(0, 70)}...`
                : title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(Toast);
