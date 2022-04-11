import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Switch,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts, icons} from '../../../../assets';
import {Header} from '../../../components/common/Header';
import strings from '../../../localization/en';
//extrenal libraries
//internal libraries
import {colors, menu} from '../../../utilities/constants';
import styles from './styles';
import {layout} from '../../../utilities/layout';
import {useSelector} from 'react-redux';

let callHistoryArr1 = [
  {
    img: icons.orangeCircle,
    name: 'Mohan Sharma',
    service: 'For Vedic Astrologer',
    time: '2m ago',
  },
  {
    img: icons.orangeCircle,
    name: 'Mohan Sharma',
    service: 'For Vedic Astrologer',
    time: '2m ago',
  },
  {
    img: icons.orangeCircle,
    name: 'Mohan Sharma',
    service: 'For Vedic Astrologer',
    time: '2m ago',
  },
];

const Home = ({navigation}) => {
  let auth = useSelector(state => state.auth);
  console.log(auth, 'auth in home');

  const [menus, setMenus] = useState(menu);
  const [callHistoryArr, setCallHistoryArr] = useState(callHistoryArr1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledCall, setIsEnabledCall] = useState(false);
  const [isEnabledProfile, setIsEnabledProfile] = useState(false);

  //toggle switch
  const toggleSwitch = index => {
    if (index == 0) {
      setIsEnabled(previousState => !previousState);
    } else {
      setIsEnabledCall(previousState => !previousState);
    }
  };
  const toggleSwitchHeader = () => {
    setIsEnabledProfile(previousState => !previousState);
  };

  const _renderView = ({item, index}) => (
    <View
      style={[{backgroundColor: item.bgColor}, styles.renderItem]}
      activeOpacity={0.8}>
      <Text style={styles.textStyle}>{item.name}</Text>

      <Text
        style={[styles.textStyle, {fontFamily: fonts.regular, fontSize: 12}]}>
        {item.text}
      </Text>
      {item.name == 'Chat status' || item.name == 'Call status' ? (
        <Switch
          trackColor={{false: '#767577', true: '#34C759'}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={() => toggleSwitch(index)}
          value={index == 0 ? isEnabled : isEnabledCall}
          style={{
            alignSelf: 'center',
          }}
        />
      ) : (
        <Image source={item.img} style={styles.imageStyle} />
      )}
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: colors.black1,
          height: 40,
          opacity: 0.3,
          justifyContent: 'center',
          top: 10,
        }}
        onPress={() => navigation.navigate(item.navigate)}>
        <Text
          style={[styles.textStyle, {fontFamily: fonts.bold, fontSize: 12}]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  //View of call history
  const _renderViewCall = ({item, index}) => (
    <View
      style={{
        backgroundColor: colors.white2,
        margin: 4,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      <Image
        source={item.img}
        style={{
          height: moderateScale(40),
          width: moderateScale(40),
          borderRadius: 20,
        }}
      />

      <View>
        <Text style={[styles.textStyle, {color: colors.grey1}]}>
          {item.name}
        </Text>
        <Text style={[styles.textStyle, {color: colors.primary}]}>
          {item.service}
        </Text>
      </View>

      <Text style={[styles.textStyle, {color: colors.grey1}]}>{item.time}</Text>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white1}}>
      <View
        style={{
          flex: 1,
        }}>
        <Header
          containerStyle={{
            backgroundColor: colors.primary,
            height: moderateScale(60),
          }}
          title={auth?.userDetails?.userName}
          titleStyle={{fontFamily: fonts.bold}}
          leftIconSource={icons.inactivetestimonial}
          onLeftPress={() => {
            navigation.navigate('ProfileStack');
          }}
        />
        <Switch
          trackColor={{false: '#767577', true: '#34C759'}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleSwitchHeader}
          value={isEnabledProfile}
          style={{
            right: 10,
            top: 20,
            position: 'absolute',
          }}
        />
        <ScrollView
          style={{
            flex: 1,
          }}> 
          <FlatList
            extraData={menus}
            data={menus}
            renderItem={_renderView}
            keyExtractor={(item, index) => 'key' + index}
            numColumns={3}
            ListHeaderComponent={() =>
              !menus.length ? (
                <Text style={styles.nomatch}>No Match found</Text>
              ) : null
            }
          />
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.regular,
              }}>
              Call History
            </Text>
            <FlatList
              data={callHistoryArr}
              renderItem={_renderViewCall}
              keyExtractor={(item, index) => 'key' + index}
              ListHeaderComponent={() =>
                !callHistoryArr.length ? (
                  <Text style={styles.nomatch}>No Match found</Text>
                ) : null
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
