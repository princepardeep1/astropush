//import liraries
import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//ecternal libaraies
import ImagePicker from 'react-native-image-crop-picker';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
//internal libraries
import {fonts, icons} from '../../../../../assets';
import {Button} from '../../../../components/common/Button';
import {Header} from '../../../../components/common/Header';
import {Loader} from '../../../../components/common/Loader';
import TextInputComp from '../../../../components/common/TextInputComp';
import strings from '../../../../localization/en';
import {updateProfile, updateProfleInfo} from '../../../../store/actions';
import {colors} from '../../../../utilities/constants';
import {layout} from '../../../../utilities/layout';
import styles from './styles';

const EditProfile = ({navigation}) => {
  let auth = useSelector(state => state.auth);
  let user = useSelector(state => state.user);

  console.log(auth, 'auth in editprofile  page>>>>>>>>>>');

  const dispatch = useDispatch();
  const [username, setUsername] = useState(auth?.userDetails?.name);
  const [fullname, setFullname] = useState(auth?.userDetails?.full_name);
  const [email, setEmail] = useState(auth?.userDetails?.email);
  const [city, setCity] = useState(auth?.userDetails?.city);
  const [contactNumber, setContactnumber] = useState(
    auth?.userDetails?.phoneNumber ? auth?.userDetails?.phoneNumber : '',
  );
  const [island, setIsland] = useState('');
  const [profilePhoto, setprofilePhoto] = useState();
  // auth?.userDetails?.profile_picture,
  const [sendingProfile, setSendingProfile] = useState(false);

  const [cmlHolder, setCmlHolder] = useState(
    auth?.userDetails?.CML == '0'
      ? [
          {value: 'Yes', isSelected: false},
          {value: 'No', isSelected: true},
        ]
      : [
          {value: 'Yes', isSelected: true},
          {value: 'No', isSelected: false},
        ],
  );

  const [errors, setErrors] = useState({
    username: '',
    fullname: '',
    email: '',
    contactNumber: '',
    city: '',
    island: '',
    isLoading: false,
    profilePhoto: '',
  });

  const name_and_values = [
    {name: 'username', value: username},
    // {name: 'fullname', value: fullname},
    {name: 'email', value: email},
    {name: 'city', value: city},
    {name: 'island', value: island},
    {name: 'contactNumber', value: contactNumber},
  ];

  // const _onChangeText = key => val => {
  //   setState({...state, [key]: val});
  // };

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

  function Save() {
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
      } else if ('contactNumber' === name && value) {
        if (!/^[0-9]{10}$/.test(value)) {
          err[name] = 'Should be valid Phone number';
        }
      }
    });
    console.log(err);
    setErrors(err);
    if (Object.keys(err).length == 0) {
      let token = auth && auth?.userDetails?.access_token;

      // let formData = new FormData();

      // formData.append('UpdateAbout', island);
      // formData.append('UpdateEmail', email);
      // formData.append('UpdateName', username);
      // formData.append('UpdatePhone', contactNumber);

      let obj = {};

      obj['UpdateAbout'] = island;
      obj['UpdateEmail'] = email;
      obj['UpdateName'] = username;
      obj['UpdatePhone'] = contactNumber;

      dispatch(updateProfleInfo(obj, token));
    }
  }

  function _doOpenOption() {
    setSendingProfile(true);
    Alert.alert(
      '',
      'Please Select',
      [
        {text: 'Camera', onPress: () => _doOpenCamera()},
        {text: 'Gallery', onPress: () => _doOpenGallery()},
        {
          text: 'Cancel',
          onPress: () => console.log('err'), //setSendingProfile(false),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }
  function _doOpenCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.2,
    })
      .then(res => {
        console.log(`ress`, res);
        // res && res.assets && res.assets.length > 0 && res.assets[0].uri,
        if (Platform.OS == 'ios') {
          setprofilePhoto(res.path);
        } else {
          setprofilePhoto(res.path);
        }
      })
      .catch(err => {
        setSendingProfile(false);
      });
  }

  function _doOpenGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.2,
    })
      .then(res => {
        console.log(`ress`, res);
        // res && res.assets && res.assets.length > 0 && res.assets[0].uri,
        if (Platform.OS == 'ios') {
          setprofilePhoto(res.sourceURL);
        } else {
          setprofilePhoto(res.path);
        }
      })
      .catch(err => {
        setSendingProfile(false);
        console.log(err, 'err in image picker');
      });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white1}}>
      <Header
        containerStyle={{
          backgroundColor: colors.primary,
          height: moderateScale(60),
        }}
        title={'Edit Profile'}
        titleStyle={{fontFamily: fonts.bold}}
        leftIconSource={icons.ic_back_white}
        leftButtonStyle={{
          tintColor: colors.white1,
        }}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.grey6,
          margin: 10,
        }}>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.subContainer}
            contentContainerStyle={styles.subContentContainer}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: moderateScale(0),
              }}></View>

            <View
              style={{
                marginTop: moderateScale(30),
              }}>
              <View>
                <TextInputComp
                  label={strings.username}
                  value={username}
                  placeholder={'First name'}
                  labelTextStyle={styles.labelTextStyle}
                  onChangeText={username => setUsername(username)}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      username: '',
                    })
                  }
                />
                {errors.username ? (
                  <Text transparent style={{color: colors.red1, bottom: 14}}>
                    {errors.username}
                  </Text>
                ) : null}
              </View>

              {/* <View>
                <TextInputComp
                  label={strings.fullname}
                  value={fullname}
                  placeholder={'Last Name'}
                  labelTextStyle={styles.labelTextStyle}
                  onChangeText={fullname => setFullname(fullname)}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      fullname: '',
                    })
                  }
                />
                {errors.fullname ? (
                  <Text
                    transparent
                    style={{color: colors.red1, bottom: 13, left: 4}}>
                    {errors.fullname}
                  </Text>
                ) : null}
              </View> */}

              <View>
                <TextInputComp
                  label={strings.contactnumber}
                  value={contactNumber}
                  keyboardType="number-pad"
                  placeholder={'Your mobile no.'}
                  labelTextStyle={styles.labelTextStyle}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      contactNumber: '',
                    })
                  }
                  onChangeText={contactNumber =>
                    setContactnumber(contactNumber)
                  }
                />
                {errors.contactNumber ? (
                  <Text
                    transparent
                    style={{color: colors.red1, bottom: 13, left: 4}}>
                    {errors.contactNumber}
                  </Text>
                ) : null}
              </View>
              <View>
                <TextInputComp
                  label={strings.email}
                  value={email}
                  editable={false}
                  placeholder={strings.enterEmail}
                  labelTextStyle={styles.labelTextStyle}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      email: '',
                    })
                  }
                  onChangeText={email => setEmail(email)}
                />
                {errors.email ? (
                  <Text
                    transparent
                    style={{color: colors.red1, bottom: 13, left: 4}}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>

              <View>
                <TextInputComp
                  label={strings.city}
                  value={city}
                  placeholder={'About'}
                  labelTextStyle={styles.labelTextStyle}
                  onChangeText={city => setCity(city)}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      city: '',
                    })
                  }
                />
                {errors.city ? (
                  <Text
                    transparent
                    style={{color: colors.red1, bottom: 13, left: 4}}>
                    {errors.city}
                  </Text>
                ) : null}
              </View>
              <View>
                <TextInputComp
                  label={strings.island}
                  value={island}
                  placeholder={'Qualification'}
                  labelTextStyle={styles.labelTextStyle}
                  onChangeText={island => setIsland(island)}
                  onFocus={() =>
                    setErrors({
                      ...errors,
                      island: '',
                    })
                  }
                />
                {errors.island ? (
                  <Text
                    transparent
                    style={{color: colors.red1, bottom: 13, left: 4}}>
                    {errors.island}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={styles.uploadContainer}>
              <Image
                source={
                  profilePhoto != ''
                    ? {uri: profilePhoto}
                    : {
                        uri: 'https://quadmenu.com/divi/wp-content/uploads/sites/8/2013/06/placeholder-image.png',
                      }
                }
                resizeMode={profilePhoto != '' ? 'cover' : 'contain'}
                style={{
                  borderRadius: moderateScale(100),
                  height: profilePhoto != '' ? '80%' : '100%',
                  width: profilePhoto != '' ? '80%' : '100%',
                }}
              />
              <TouchableOpacity
                style={[styles.uploadStoreBtn]}
                onPress={() => _doOpenOption()}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                  }}>
                  Upload pic
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: moderateScale(50),
              }}>
              <Button
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 20,
                  width: layout.size.width - 80,
                  alignSelf: 'center',
                }}
                label={strings.save}
                onPress={() => Save()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <Loader isLoading={user.loading} isAbsolute />
      </View>
    </SafeAreaView>
  );
};
export default EditProfile;
