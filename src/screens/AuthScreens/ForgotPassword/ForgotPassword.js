import React, { useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native';
//extrenal libraries
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, icons } from '../../../../assets';
import { Button } from '../../../components/common/Button';
import { Header } from '../../../components/common/Header';
import { Loader } from '../../../components/common/Loader';
import TextInputComp from '../../../components/common/TextInputComp';
import strings from '../../../localization/en';
import { forgotPassword } from '../../../store/actions';
//internal libraries
import { colors } from '../../../utilities/constants';
import { layout } from '../../../utilities/layout';
import styles from './styles';

const ForgotPassword = ({ navigation }) => {
  let auth = useSelector(state => state.auth);
  console.log(auth, 'auth in forgotpassword page>>>>>>>>>>');
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
  });
  const { email } = state;
  const _onChangeText = key => val => {
    setState({ ...state, [key]: val });
  };
  const [errors, setErrors] = useState({
    email: '',
    isLoading: false,
  });
  const name_and_values = [{ name: 'email', value: email }];

  function Forpassword() {
    Keyboard.dismiss();
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
    });
    setErrors(err);
    if (Object.keys(err).length == 0) {
      var formData = new FormData();
      formData.append('email', email);
      let obj = {};
      obj.email = email;

      obj.token = auth && auth.userDetails.access_token;

      dispatch(forgotPassword(obj));
      // dispatch({type:REGISTER,payloads:formData});
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white1 }}>
      <View
        style={{
          flex: 1,
        }}>
        <Header
          containerStyle={{
            backgroundColor: colors.primary,
            height: moderateScale(60),
          }}
          title={''}
          titleStyle={{ fontFamily: fonts.bold }}
          leftIconSource={icons.ic_back_white}
          leftButtonStyle={{
            tintColor: colors.white1,
          }}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          style={styles.subContainer}
          contentContainerStyle={styles.subContentContainer}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>

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

          <View style={{
            backgroundColor: colors.white4,
            marginTop: moderateScale(40),
            height: layout.size.height / 3 + 20,
            padding: 10
          }}>

            <Text style={styles.forgotpassword}>{strings.forgot}</Text>
            <View
              style={{
                marginTop: moderateScale(25),
              }}>
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
            <View
              style={{
                marginTop: moderateScale(50),
              }}>
              <Button
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  width: layout.size.width - 80,
                  alignSelf: 'center',
                }}
                label={strings.send}
                onPress={() => Forpassword()}
              />
            </View>
          </View>

        </KeyboardAvoidingView>
        <Loader isLoading={auth.loading} isAbsolute />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
