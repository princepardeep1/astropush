import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {fonts, icons} from '../../../../assets';
import {Button} from '../../../components/common/Button';
import {Header} from '../../../components/common/Header';
import {Loader} from '../../../components/common/Loader';
import {getBlogList} from '../../../store/actions/appActions';
import {colors} from '../../../utilities/constants';
import styles from './styles';

const Blogs = ({navigation}) => {
  let auth = useSelector(state => state.auth);
  let app = useSelector(state => state.app);
  const [blogArr, setblogArr] = useState([]);

  const dispatch = useDispatch();

  console.log(auth, 'auth in friend Request   page>>>>>>>>>>');
  console.log(app, 'user in friend Request   page>>>>>>>>>>');

  const [state, setState] = useState({
    refreshing: false,
  });

  //hit Api here
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let token = auth && auth?.userDetails?.access_token;
      dispatch(
        getBlogList(token, cb => {
          if (cb) {
            console.log(cb, 'callback list arr>>>>>>>>>>');
            if (cb?.data?.response?.isSuccess) {
              setblogArr(cb?.data?.response?.data);
            }
          }
        }),
      );
    });
    return unsubscribe;
  }, [navigation]);

  //create blog

  const createBlog = () => {
    alert('v');
  };

  const _renderView = ({item, index}) => (
    <TouchableOpacity
      style={[{backgroundColor: colors.white1}, styles.renderItem]}
      activeOpacity={0.8}
      onPress={() => alert('go details')}>
      <Image
        source={
          item && item.encode != ''
            ? {
                uri: item.encode,
              }
            : {
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC',
              }
        }
        style={styles.imageStyle}
      />

      {/* <View
        style={{
          backgroundColor: colors.primary,
          height: 25,
          width: 70,
          alignSelf: 'flex-end',
          right: 20,
          justifyContent: 'center',
          borderRadius: 6,
        }}>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.white2,
            alignSelf: 'center',
            fontSize: 10,
          }}>
          {item.creationTime}
        </Text>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 10,
          }}>
          By- Astrologer
        </Text>

        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 10,
          }}>
          {item.commentscount} Comments
        </Text>
      </View>
      <Text
        style={[
          styles.textStyle,
          {fontFamily: fonts.bold, color: colors.grey1, fontSize: 12},
        ]}>
        {item.title}
      </Text>
      <Text
        style={[
          styles.textStyle,
          {
            fontFamily: fonts.regular,
            color: colors.grey1,
            fontSize: 12,
          },
        ]}
        numberOfLines={3}
        ellipsizeMode={'tail'}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

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
        title={'My Blogs'}
        titleStyle={{fontFamily: fonts.bold}}
        leftIconSource={icons.ic_back_white}
        leftButtonStyle={{
          tintColor: colors.white1,
        }}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />

      <Button
        style={styles.btnStyles}
        label={'Create Blog'}
        onPress={() => navigation.navigate('CreateBlog')}
      />

      <FlatList
        extraData={blogArr}
        style={{alignSelf: 'center', marginTop: 10}}
        data={blogArr}
        renderItem={_renderView}
        keyExtractor={(item, index) => 'key' + index}
        numColumns={2}
        ListHeaderComponent={() =>
          blogArr && blogArr.length == 0 ? (
            <Text style={styles.nomatch}>No Match found</Text>
          ) : null
        }
      />

      <Loader isLoading={app.loading} isAbsolute />
    </SafeAreaView>
  );
};

export default Blogs;
