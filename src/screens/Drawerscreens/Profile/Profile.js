import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {fonts, icons} from '../../../../assets';
import {Header} from '../../../components/common/Header';
import {Loader} from '../../../components/common/Loader';
import {colors} from '../../../utilities/constants';
import styles from './styles';
import store from '../../../store';
import {logout} from '../../../store/actions';

const Profile = ({navigation}) => {
  let auth = useSelector(state => state.auth);
  let user = useSelector(state => state.user);

  const dispatch = useDispatch();

  console.log(auth, 'auth in friend Request   page>>>>>>>>>>');
  console.log(user, 'user in friend Request   page>>>>>>>>>>');

  const [state, setState] = useState({
    refreshing: false,
  });

  //hit Api here
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [navigation]);

  const signOut = () => {
    store.dispatch(logout());
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white3,
      }}>
      <Header
        containerStyle={{
          backgroundColor: colors.primary,
          height: moderateScale(60),
        }}
        title={'My Profile'}
        titleStyle={{fontFamily: fonts.bold}}
        leftIconSource={icons.ic_back_white}
        leftButtonStyle={{
          tintColor: colors.white1,
        }}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.card}>
        <Image
          source={icons.inactivetestimonial}
          style={{
            flex: 0.1,
          }}
        />

        <View
          style={{
            flex: 0.6,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
            }}>
            {auth?.userDetails?.userName}
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
            }}>
            {auth?.userDetails?.email}
          </Text>
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <Image source={icons.login_icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.card1}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Mobile
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
            }}>
            {auth?.userDetails?.phoneNumber}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // borderTopWidth: 0.5,
            // borderTopColor: colors.grey6
          }}>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Location
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
            }}>
            Chandigarh
          </Text>
        </View>
      </View>

      <View style={styles.card1}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Edit Profile
          </Text>
          <Image source={icons.arrow_icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Change Password
          </Text>

          <Image source={icons.arrow_icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => alert('Preffred')}>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Preffred Language
          </Text>
          <Image source={icons.arrow_icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.card1}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            navigation.navigate('Webviewer', {
              url: 'http://ec2-65-1-136-190.ap-south-1.compute.amazonaws.com/terms',
              title: 'Terms and conditions',
            })
          }>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Terms and conditions
          </Text>
          <Image source={icons.arrow_icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('Webviewer', {
              url: 'http://ec2-65-1-136-190.ap-south-1.compute.amazonaws.com/privacy',
              title: 'Privacy Policy',
            })
          }>
          <Text
            style={{
              fontFamily: fonts.bold,
            }}>
            Privacy Policy
          </Text>

          <Image source={icons.arrow_icon} />
        </TouchableOpacity>
      </View>

      <Loader isLoading={user.loading} isAbsolute />
    </SafeAreaView>
  );
};

export default Profile;
