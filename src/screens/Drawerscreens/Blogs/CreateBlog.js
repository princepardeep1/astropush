import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {fonts, icons} from '../../../../assets';
import {Header} from '../../../components/common/Header';
import {Loader} from '../../../components/common/Loader';
import {colors} from '../../../utilities/constants';
import TextInputComp from '../../../components/common/TextInputComp';
import styles from './styles';
import {layout} from '../../../utilities/layout';
import {Button} from '../../../components/common/Button';
import {
  createBlog,
  createBlogAction,
  getBlogCategory,
} from '../../../store/actions';
import ImageCropPicker from 'react-native-image-crop-picker';
import { showErrorAlert } from '../../../utilities/helperFunctions';

const CreateBlog = ({navigation}) => {
  let auth = useSelector(state => state.auth);
  let app = useSelector(state => state.app);

  const [categoryArr, setCatagoryArr] = useState([]);
  const [photopost, setPhotopost] = useState('');
  const [selectedVal, setSetSelectedVal] = useState('');

  const dispatch = useDispatch();

  console.log(auth, 'auth in friend Request   page>>>>>>>>>>');
  console.log(app, 'app in friend Request   page>>>>>>>>>>');

  const [state, setState] = useState({
    title: '',
    body: '',
  });

  const {title, body} = state;

  const _onChangeText = key => val => {
    setState({...state, [key]: val});
  };

  //hit Api here
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    let token = auth && auth?.userDetails?.access_token;

    dispatch(
      getBlogCategory(token, cb => {
        if (cb) {
          console.log(cb, 'callback list arr>>>>>>>>>>1');
          if (cb?.data?.response?.isSuccess) {
            let arr = [];

            for (
              let index = 0;
              index < cb?.data?.response?.data.length;
              index++
            ) {
              const element = cb?.data?.response?.data[index];
              console.log(element.name, 'elemen');
              arr.push({
                label: element.name,
                value: element.name,
              });
            }
            console.log(arr, 'arrarrarr');
            setCatagoryArr(arr);
          }
        }
      }),
    );
    return unsubscribe;
  }, [navigation]);

  const onPublish = () => {
    let obj = {};

    obj['Description'] = body;
    obj['Encode'] = photopost;
    obj['Role'] = 'astrologer';
    obj['Title'] = title;
    obj['userId'] = 214;

    console.log(obj, 'return  here');
    if(body =="" || title ==""){
      return showErrorAlert('Fields are required.')
    }
    dispatch(
      createBlogAction(obj, cb => {
        console.log(obj, 'obj >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        if (cb) {
          console.log(cb, 'callback create blog>>>>>>>>>>');
        }
      }),
    );
  };
  function _doOpenOption() {
    Alert.alert(
      '',
      'Please Select',
      [
        {text: 'Camera', onPress: () => _doOpenCamera()},
        {text: 'Gallery', onPress: () => _doOpenGallery()},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  function _doOpenCamera() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      multiple: true,
      // compressImageQuality: 0.8,
      includeBase64: true,
    }).then(res => {
      console.log(`ress`, res);
      setPhotopost(`data:${res.mime};base64,${res.data}`);
    });
  }
  function _doOpenGallery() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(res => {
      console.log(`ress`, res);

      console.log(
        `data:${res.mime};base64,${res.data}`,
        '`data:${res.mime};base64,${res.data}`',
      );

      setPhotopost(`data:${res.mime};base64,${res.data}`);
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header
        containerStyle={{
          backgroundColor: colors.primary,
          height: moderateScale(60),
        }}
        title={'Create Blog'}
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
          margin: moderateScale(10),
          backgroundColor: colors.white1,
        }}>
        <TextInputComp
          label={'Title'}
          value={title}
          placeholder={'Enter title for your blog here...'}
          labelTextStyle={styles.labelTextStyle}
          inputStyle={{margin: 5}}
          onChangeText={_onChangeText('title')}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.grey4,
              width: layout.size.width / 3,
              height: 40,
              justifyContent: 'center',
            }}
            onPress={() => _doOpenOption()}>
            <Text
              style={{
                padding: 2,
                alignSelf: 'center',
              }}>
              Choose thumbnail
            </Text>
          </TouchableOpacity>
          <Image
            source={{uri: photopost}}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            marginVertical: 10,
            padding: 5,
            backgroundColor: colors.white2,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
            }}>
            Select catagory
          </Text>
          <RNPickerSelect
            onValueChange={value => setSetSelectedVal(value)}
            items={categoryArr}
          />
        </View>

        <TextInputComp
          label={'Title'}
          value={body}
          placeholder={'Please enter about blog...'}
          labelTextStyle={styles.labelTextStyle}
          inputStyle={{margin: 5}}
          multiline={true}
          inputStyle={{
            height: layout.size.height / 4,
          }}
          onChangeText={_onChangeText('body')}
        />
        <Button
          style={[styles.btnStyles, {alignSelf: 'center'}]}
          label={'Publish'}
          onPress={() => onPublish()}
        />
      </View>

      <Loader isLoading={app.loading} isAbsolute />
    </SafeAreaView>
  );
};

export default CreateBlog;
