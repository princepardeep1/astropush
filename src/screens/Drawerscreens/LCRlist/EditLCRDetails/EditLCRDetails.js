import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground, Keyboard, SafeAreaView,
  ScrollView,
  Text, TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, icons } from '../../../../../assets';
import { Header } from '../../../../components/common/Header';
import { Loader } from '../../../../components/common/Loader';
import TextInputComp from '../../../../components/common/TextInputComp';
import { updatelcrreport } from '../../../../store/actions';
import { colors } from '../../../../utilities/constants';
import { layout } from '../../../../utilities/layout';
import styles from './styles';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditLCRDetails = ({ navigation, route }) => {
  const { item, allDropDown } = route.params;
  let auth = useSelector(state => state.auth);
  console.log(auth, 'auth in editprofile  page>>>>>>>>>>');
  console.log(item, 'editlcrlist   in  >>>>>>>>>>');
  console.log(allDropDown, 'allDropDown   in edit lcrdetails >>>>>>>>>>');
  const dispatch = useDispatch();

  console.log(item.Fish_weight, 'Fish_weight');

  const [Profilepic, setProfilepic] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setDateStatus] = useState(false);
  const [showTime, setTimeStatus] = useState(false);

  const [fishTypeState, setFishTypeState] = useState(item && item.fish && item.fish.title);
  const [fishWeightState, setFishWeightState] = useState(toString(item && item.Fish_weight ? item.Fish_weight.toString() : ''));
  const [fishingTypeOpen, setFishingTypeOpen] = useState(false);
  const [fishingTypeState, setFishingTypeState] = useState(item.fish.first_category.title ? item.fish.first_category.title : false);
  const [boatFishingTypeState, setBoatFishingTypeState] = useState(item.fish.second_category.title ? item.fish.second_category.title : false);
  const [boatFishingTypeOpen, setBoatFishingTypeOpen] = useState(false);
  const [sendingimage, setsendingimage] = useState(false);

  const [fishingTypeItems, setFishingTypeItems] = useState([
    { label: 'Boat Fishing', value: 'Boat Fishing' },
    { label: 'Shoreline Fishing', value: 'Shoreline Fishing' },
  ]);
  const [defaultFishingTypeItems, setDefaultFishingTypeItems] = useState([
    { label: 'Offshore Fishing', value: 'Offshore Fishing' },
    { label: 'Bottom Fishing', value: 'Bottom Fishing' },
    { label: 'Whipping', value: 'Whipping' },
    { label: 'Baitcasting', value: 'Baitcasting' },
    { label: 'Slide Bait', value: 'Slide Bait' },
  ]);
  const [boatFishingTypeItems, setBoatFishingTypeItems] = useState([
    { label: 'Offshore Fishing', value: 'Offshore Fishing' },
    { label: 'Bottom Fishing', value: 'Bottom Fishing' },
  ]);
  const [shorelineFishingTypeItems, setShorelineFishingTypeItems] = useState([
    { label: 'Whipping', value: 'Whipping' },
    { label: 'Baitcasting', value: 'Baitcasting' },
    { label: 'Slide Bait', value: 'Slide Bait' },
  ]);
  const _onChangeText = key => val => {
    setState({ ...state, [key]: val });
  };

  const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date
    // setDate(selectedDate)HGHG
  };

  useEffect(() => {
    let fishW = item && item.Fish_weight;
    setFishWeightState(fishW.toString());

    console.log(fishWeightState, 'fishWeightState');
  }, [])


  function Save() {
    let token = auth && auth?.userDetails?.access_token;
    Keyboard.dismiss();
    let err = {};
    //email error


    if (Object.keys(err).length == 0) {
      let formData = new FormData();
      // if (sendingimage) {
      //   formData.append('image', {
      //     uri: Profilepic,
      //     type: 'image/jpeg', // or photo.type
      //     name: 'profilePic',
      //   });
      // }

      formData.append('fish_weight', fishWeightState);
      // formData.append('fish_id', fishTypeState);
      formData.append('id', item && item.id);

      console.log(formData, 'sending to aApi');
      dispatch(updatelcrreport(token, formData));

    }
  }


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
      includeBase64: true,
      compressImageQuality: 0.2,
    }).then(response => {
      let data = `data:${response.mime};base64,${response.data}`;
      if (value == 'Profilepic') {
        setProfilepic(data);
      }
    })
      .catch(err => {
        setsendingimage(false);
      });
  }
  function _doOpenGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.2,
    }).then(image => {
      console.log(`images`, image);
      let data = `data:${image.mime};base64,${image.data}`;
      setProfilepic(data);
    })
      .catch(err => {
        setsendingimage(false);
        console.log(err, 'err in image picker');
      });
  }
  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const handleEffortChange = v => setEffortHrsState((v * 0.24).toFixed(0));
  return (
    <ImageBackground
      source={icons.LeaderBoard1}
      style={{ flex: 1, height: '100%' }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Header
          containerStyle={{
            backgroundColor: 'transparent',
            height: moderateScale(60),
          }}
          blackTitle
          title={' Edit Catch Report'}
          titleStyle={{ fontFamily: fonts.bold }}
          leftIconSource={icons.ic_back_white}
          leftButtonStyle={{
            tintColor: colors.black1,
          }}
          onLeftPress={() => {
            navigation.goBack();
          }}
          onRightPress={() => Save()}
          // {() => {
          //   navigation.navigate('LCRDetails');
          // }}
          rightIconSource={icons.post}
          rightIconStyle={{
            height: 30,
            width: 30,
            tintColor: colors.green1,
          }}
        />
        <SafeAreaView style={styles.EditLCR}>
          <ScrollView style={{ flex: 1, }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => _doOpenOption()}>
              <Image
                source={{
                  uri:
                    item && item.image
                      // ? `https://server3.rvtechnologies.in/LokahiFishing_Admin/public/LCR_images/user_fishes/${item.image}`
               ? `http://admin.lokahifishing.com/LCR_images/user_fishes/${item.image}` // live url      ....

                      : icons.loginLogo,
                  // Profilepic != '' ? { uri: Profilepic } : icons.loginLogo
                }}
                resizeMode="cover"
                style={{
                  height: layout.size.height / 6,
                  width: layout.size.height / 6,
                  borderColor: '#fff',
                  borderWidth: 2,
                  borderRadius: 7,
                }}
              />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', paddingTop: 5, marginBottom: 10, opacity: 0.6 }}>
              Tap photo to change
            </Text>


            <Text style={[styles.label, { marginTop: 0 }]}>Date & Time</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDateStatus(true);
                  setTimeStatus(false);
                }}>
                <Text>Show date</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setTimeStatus(true);
                  setDateStatus(false);
                }}>
                <Text>Show time</Text>
              </TouchableOpacity>
            </View>
            <View>
              {showDate && Platform.OS == 'android' ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="spinner"
                  onChange={onChange}
                  style={{ height: windowHeight * 0.2, marginVertical: -10 }}
                />
              ) : Platform.OS == 'ios' ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="spinner"
                  onChange={onChange}
                  style={{ height: windowHeight * 0.2, marginVertical: -10 }}
                />
              ) : null}

              {showTime && Platform.OS == 'android' ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  display="spinner"
                  onChange={onChange}
                  style={{
                    height: windowHeight * 0.2,
                    marginTop: -10,
                    marginBottom: -20,
                  }}
                />
              ) : Platform.OS == 'ios' ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  display="spinner"
                  onChange={onChange}
                  style={{
                    height: windowHeight * 0.2,
                    marginTop: -10,
                    marginBottom: -20,
                  }}
                />
              ) : null}
            </View>
            <Text style={styles.label}>Fish Type</Text>
            <TextInputComp
              style={styles.info}
              value={fishTypeState}
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="done"
              onChangeText={text => setFishTypeState(text)}
            />
            <Text style={styles.label}>Fish Weight</Text>
            <TextInputComp
              placeholder={'Enter fish weight'}
              value={fishWeightState}
              style={styles.info}
              onChangeText={fishWeightState => setFishWeightState(fishWeightState)}
            />

            {/* <View style={styles.subsection}>
              <Circular />
            </View> */}

            <Text style={styles.label}>Fishing Type</Text>
            <View style={{ bottom: moderateScale(10) }}>
              <DropDownPicker
                open={fishingTypeOpen}
                value={fishingTypeState}
                items={fishingTypeItems}
                setOpen={setFishingTypeOpen}
                setValue={setFishingTypeState}
                setItems={setFishingTypeItems}
                containerStyle={{ width: windowWidth * 0.9 }}
                zIndex={1000}
                dropDownDirection={'TOP'}
              />
            </View>
            <Text style={styles.label}>Boat Fishing Type</Text>
            <View style={{ bottom: moderateScale(10) }}>
              <DropDownPicker
                open={boatFishingTypeOpen}
                value={boatFishingTypeState}
                items={
                  fishingTypeState === 'Boat Fishing'
                    ? boatFishingTypeItems
                    : fishingTypeState === 'Shoreline Fishing'
                      ? shorelineFishingTypeItems
                      : defaultFishingTypeItems
                }
                setOpen={setBoatFishingTypeOpen}
                setValue={setBoatFishingTypeState}
                setItems={
                  fishingTypeState === 'Boat Fishing'
                    ? setBoatFishingTypeItems
                    : fishingTypeState === 'Shoreline Fishing'
                      ? setShorelineFishingTypeItems
                      : setDefaultFishingTypeItems
                }
                style={{ width: windowWidth * 0.9 }}
                containerStyle={{ width: windowWidth * 0.9 }}
                zIndex={1000}
                dropDownDirection={'TOP'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
      <Loader isLoading={auth.loading} isAbsolute />

    </ImageBackground>
  );
};

export default EditLCRDetails;
