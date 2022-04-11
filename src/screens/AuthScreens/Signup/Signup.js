//import liraries
import React, { useState } from 'react';
import { Alert, Image, Keyboard, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, icons } from '../../../../assets';
import { Button } from '../../../components/common/Button';
import { Header } from '../../../components/common/Header';
import { Loader } from '../../../components/common/Loader';
import TextInputComp from '../../../components/common/TextInputComp';
import strings from '../../../localization/en';
import { signUpWithEmail } from '../../../store/actions';
//internal libraries
import { colors } from '../../../utilities/constants';
import styles from './styles';
const Signup = ({ navigation }) => {
  let auth = useSelector(state => state.auth);
  console.log(auth, 'auth in sigup page>>>>>>>>>>');

  const dispatch = useDispatch();
  const [interViewDate, setinterViewDate] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [island, setIsland] = useState('');
  const [productPhoto, setProductPhoto] = useState('');

  const [errors, setErrors] = useState({
    interViewDate: '',
    fullname: '',
    email: '',
    password: '',
    confirmpassword: '',
    city: '',
    island: '',
    isLoading: false,
    productPhoto: '',
    cmlHolder: '',
  });

  const name_and_values = [
    { name: 'interViewDate', value: interViewDate },
    { name: 'fullname', value: fullname },
    { name: 'email', value: email },
    { name: 'city', value: city },
    { name: 'island', value: island },
    { name: 'password', value: password },
    { name: 'confirmpassword', value: confirmpassword },
  ];

  ///toggeling
  const toggleCml = index => {
    const array = cmlHolder.map(v => {
      const newItem = Object.assign({}, v);
      newItem.isSelected = false;
      return newItem;
    });
    array[index].isSelected = !array[index].isSelected;
    setCmlHolder(array);
  };

  async function Submit() {

    Keyboard.dismiss();
    let err = {};

    //email error
    name_and_values.forEach(data => {
      let name = data.name;
      // let check =
      // productPhoto != '';
      let value = data.value;
      if (!value) {
        err[name] = 'Should not be empty';
      } else if (
        'email' === name &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      ) {
        err[name] = 'Email should be valid';
      } else if ('password' === name && value.length < 8) {
        err[name] = 'Too short';
      } else if ('confirmpassword' === name && value.length < 8) {
        err[name] = 'Too short';
      } else if ('confirmpassword' === name && value !== password) {
        err[name] = 'Confirm password should match';
      }
    });
    setErrors(err);
    if (Object.keys(err).length == 0) {
      let formData = new FormData();
      if (productPhoto && productPhoto != '') {
        formData.append('image', {
          uri: productPhoto,
          type: 'image/jpeg', // or photo.type
          name: 'profilePic',
        });
      }
      formData.append('user_name', interViewDate);
      formData.append('full_name', fullname);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('island', island);
      formData.append('cml', 1);
      formData.append('password', password);
      formData.append('password_confirmation', confirmpassword);
      formData.append('device_token', fcmToken);

      let obj = {};
      obj.password = password;
      obj.full_name = fullname;
      obj.email = email;
      obj.island = island;
      obj.cml = cmlHolder;
      obj.password_confirmation = confirmpassword;
      obj.city = city;
      obj.user_name = setinterViewDate;
      obj.image = productPhoto;
      obj.device_token = fcmToken;

      console.log(formData, 'sending to aApi');
      dispatch(signUpWithEmail(formData));
      // dispatch(signUpWithEmail(obj));
      // dispatch({type:REGISTER,payloads:formData});
    }
  }

  const _renderView = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => toggleCml(index)}
      activeOpacity={0.8}>
      {item.isSelected ? (
        <Image
          source={icons.ic_radio_btn_on}
          style={{
            tintColor: colors.white1,
          }}
        />
      ) : (
          <Image
            source={icons.ic_radio_btn_off}
            style={{
              tintColor: colors.white1,
              width: 15,
              height: 15,
            }}
          />
        )}

      <Text style={styles.textStyle}>{item.value}</Text>
    </TouchableOpacity>
  );

  function _doOpenOption() {
    Alert.alert(
      '',
      'Please Select',
      [
        { text: 'Camera', onPress: () => _doOpenCamera() },
        { text: 'Gallery', onPress: () => _doOpenGallery() },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }
  function _doOpenCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      // includeBase64: true,
      compressImageQuality: 0.2,
    }).then(res => {
      console.log(`ress`, res);
      console.log(
        ` res && res.assets && res.assets.length > 0 && res.assets[0].uri`,
        res.path,
      );
      res && res.assets && res.assets.length > 0 && res.assets[0].uri;
      if (Platform.OS == 'ios') {
        setProductPhoto(res.path);
      } else {
        setProductPhoto(res.path);
      }
      0;
    });
  }
  function _doOpenGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      // includeBase64: true,
      compressImageQuality: 0.2,
    }).then(res => {
      console.log(`ress`, res);
      // res && res.assets && res.assets.length > 0 && res.assets[0].uri,
      if (Platform.OS == 'ios') {
        setProductPhoto(res.sourceURL);
      } else {
        setProductPhoto(res.path);
      }
    });
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
          title={'Astrologer registration'}
          titleStyle={{ fontFamily: fonts.bold }}
          leftIconSource={icons.ic_back_white}
          leftButtonStyle={{
            tintColor: colors.white1,
          }}
          onLeftPress={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{
            flex: 1,
            backgroundColor: colors.grey6,
            margin: 10
          }}
          contentContainerStyle={{ paddingBottom: moderateScale(2), margin: 10, }}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>

          <View
            style={{
              marginTop: moderateScale(30),
            }}>
            <View>
              <Text style={{
                fontFamily: fonts.semiBold,
                color: colors.grey10,
                paddingVertical: moderateScale(10)
              }}>
                What's your main Source of income, Are you engage with any other Job/Bussiness Apart from Astrology?
              </Text>

              <TextInputComp
                label={strings.username}
                value={interViewDate}
                placeholder={'Select'}
                labelTextStyle={styles.labelTextStyle}
                onChangeText={interViewDate => setinterViewDate(interViewDate)}
                onFocus={() =>
                  setErrors({
                    ...errors,
                    interViewDate: '',
                  })
                }
              />
              <TextInputComp
                label={strings.username}
                value={interViewDate}
                placeholder={'Choose interview date'}
                labelTextStyle={styles.labelTextStyle}
                onChangeText={interViewDate => setinterViewDate(interViewDate)}
                onFocus={() =>
                  setErrors({
                    ...errors,
                    interViewDate: '',
                  })
                }
              />
              {errors.interViewDate ? (
                <Text
                  transparent
                  style={{ color: colors.primary, bottom: 14 }}>
                  {errors.interViewDate}
                </Text>
              ) : null}
            </View>
          </View>

          <View>
            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10)
            }}>
              What's your suitable time for An interview?
            </Text>

            <TextInputComp
              label={strings.username}
              value={interViewDate}
              placeholder={'Select'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
            />
            <TextInputComp
              value={interViewDate}
              placeholder={'Enter Permanent Address'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
              onFocus={() =>
                setErrors({
                  ...errors,
                  interViewDate: '',
                })
              }
            />

            <TextInputComp
              value={interViewDate}
              placeholder={'Write about yourself'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
              onFocus={() =>
                setErrors({
                  ...errors,
                  interViewDate: '',
                })
              }
            />

            <TextInputComp
              value={interViewDate}
              placeholder={'Enter city'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
              onFocus={() =>
                setErrors({
                  ...errors,
                  interViewDate: '',
                })
              }
            />
          </View>

          <View>
            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10)
            }}>
              Profile pic
            </Text>

            <TextInputComp
              label={strings.username}
              value={interViewDate}
              placeholder={'Select'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
            />

          </View>

          <View>

            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10),

            }}>
              Upload ID Proof(jpg,png,jpeg only) Please check refrence (Maximum size 1 MB) (if Indian, upload aadhare
              card and pan card)(jpg,png,jpeg only) (Max. size 1 MB)
            </Text>

            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10)
            }}>
              ID Proof 1
            </Text>

            <TextInputComp
              label={strings.username}
              value={interViewDate}
              placeholder={'Select'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
            />

            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10)
            }}>
              ID Proof 2
            </Text>

            <TextInputComp
              label={strings.username}
              value={interViewDate}
              placeholder={'Select'}
              labelTextStyle={styles.labelTextStyle}
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
            />

          </View>

          <View>
            <Text style={{
              fontFamily: fonts.semiBold,
              color: colors.grey10,
              paddingVertical: moderateScale(10)
            }}>
              Correcepondence Address
            </Text>

            <TextInputComp
              label={strings.username}
              value={interViewDate}
              placeholder={'Select'}
              labelTextStyle={styles.labelTextStyle}
              multiline
              onChangeText={interViewDate => setinterViewDate(interViewDate)}
            />
          </View>

          <View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 10,

            }}>
              <Image source={icons.emptyCheckBox} style={{
                height: 20,
                width: 20
              }} />

              <Text style={{
                fontFamily: fonts.semiBold,
                color: colors.grey10,
                paddingVertical: moderateScale(10)
              }}>
                By signing up, You Agree to Our Terms and Conditions(Please tick the box to register)
            </Text>

            </View>


            <Button
              style={styles.btnStyles}
              label={strings.submit}
            // onPress={() => Done()}
            />

          </View>

        </KeyboardAwareScrollView>

        <Loader isLoading={auth.loading} isAbsolute />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
