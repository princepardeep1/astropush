//import liraries
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../../../assets';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import TextInputComp from '../../../components/common/TextInputComp';
import strings from '../../../localization/en';

import { loginWithEmail, verifyLoginAction } from '../../../store/actions';
//intrnal libraries
import { colors, screenNames } from '../../../utilities/constants';
import { layout } from '../../../utilities/layout';
import styles from './styles';

const Signin = ({ navigation }) => {
  let auth = useSelector(state => state.auth);
  console.log(auth, 'auth in signin page>>>>>>>>>>');
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: 'support@astropus.com',
    password: '12345',
    // email: 'myname@yopmail.com',
    // password: 'qwerty123',
  });
  const { email, password } = state;
  const _onChangeText = key => val => {
    setState({ ...state, [key]: val });
  };

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    isLoading: false,
  });
  const name_and_values = [
    { name: 'email', value: email },
    { name: 'password', value: password },
  ];

  async function Done() {
    Keyboard.dismiss();
    // navigation.navigate('HomeStack');

    let err = {};
    //email error
    name_and_values.forEach(data => {
      let name = data.name;
      let value = data.value;
      if (!value) {
        err[name] = 'Should not be empty';
      } else if (
        'email' === name &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      ) {
        err[name] = 'Email should be valid';
      }
      // else if ('password' === name && value.length < 8) {
      //   err[name] = 'Too short';
      // }
    });
    setErrors(err);
    if (Object.keys(err).length == 0) {
      // let formData = new FormData();
      // formData.append('email', email);
      // formData.append('password', password);

      let obj = {};
      obj.email = email;
      obj.password = password;

      dispatch(
        loginWithEmail(obj, cb => {
          console.log(obj, 'obj >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          if (cb) {
            console.log(cb, 'callback login>>>>>>>>>>');
            obj.token = cb.data;
            dispatch(verifyLoginAction(obj));

          }
        }),
      );

    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white1
    }}>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: moderateScale(20),
            flex: 1,
          }}>
          <View style={styles.uploadContainer}>
            <Image
              source={icons.logo_icon}
              resizeMode="contain"
              style={{
                height: 80,
                width: 80,
                tintColor: colors.white1,
              }}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.subContainer}
            contentContainerStyle={styles.subContentContainer}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}>

            <View style={{
              backgroundColor: colors.white4,
              marginTop: moderateScale(40),
              height: layout.size.height / 2,
              padding: 10
            }}>
              <View
                style={{
                  marginTop: moderateScale(40),
                }}>
                <View>
                  <TextInputComp
                    label={strings.email}
                    value={email}
                    placeholder={strings.enterEmail}
                    labelTextStyle={styles.labelTextStyle}
                    onFocus={() =>
                      setErrors({
                        ...errors,
                        email: '',
                      })
                    }
                    onChangeText={_onChangeText('email')}
                  />
                  {errors.email ? (
                    <Text
                      transparent
                      style={{ color: colors.primary, bottom: 13, left: 4 }}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <TextInputComp
                    label={strings.Password}
                    value={password}
                    secureTextEntry
                    placeholder={strings.enterPassword}
                    labelTextStyle={styles.labelTextStyle}
                    onChangeText={_onChangeText('password')}
                    onFocus={() =>
                      setErrors({
                        ...errors,
                        password: '',
                      })
                    }
                  />
                  {errors.password ? (
                    <Text
                      transparent
                      style={{ color: colors.primary, bottom: 13, left: 4 }}>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Image source={icons.emptyCheckBox}
                    style={{
                      tintColor: colors.grey1,
                      height: 20,
                      width: 20
                    }}
                  />

                  <TouchableOpacity
                  //onPress={() => navigation.navigate(screenNames.ForgotPassword)}
                  >
                    <Text style={[styles.forgotStyle, { marginHorizontal: 5 }]}>Remeber me</Text>
                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate(screenNames.ForgotPassword)}>
                  <Text style={styles.forgotStyle}>{strings.forgotpassword}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 20
                }}>
                <Button
                  style={styles.btnStyles}
                  label={strings.login}
                  onPress={() => Done()}
                />

                <TouchableOpacity
                  style={{
                    marginBottom: moderateScale(100),
                  }}
                  onPress={() => navigation.navigate(screenNames.Signup)}
                  >
                  <Text style={styles.createAccount}>
                    {strings.createAccount}
                    <Text style={styles.signuptext}>{strings.signup}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
        <Loader
          isLoading={auth.loading}
          // isLoading={false}
          isAbsolute
        />
      </View>
    </SafeAreaView>
  );
};

export default Signin;
