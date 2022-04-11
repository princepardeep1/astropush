import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, icons } from '../../../../assets';
import { Button } from '../../../components/common/Button';
import { Header } from '../../../components/common/Header';
import { Loader } from '../../../components/common/Loader';
import { colors } from '../../../utilities/constants';
import styles from "./styles";
import { layout } from '../../../utilities/layout';

let notificationArr = [
    {
        text: "Your weekly horoscope is here", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    }, {
        text: "Your weekly horoscope is here", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    },
    {
        text: "Your weekly horoscope is here", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    },
];
const Notifications = ({ navigation }) => {
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
        const unsubscribe = navigation.addListener('focus', () => {

        });
        return unsubscribe;
    }, [navigation]);

    const _renderView = ({ item, index }) => (
        <View style={[{}, {
            backgroundColor: 'lightblue',
            margin: 2,
            padding: 5,
            borderRadius: 10,
        }]}>
            <View style={{
                flexDirection: 'row'

            }} >
                <View>
                    <Text style={{
                        fontFamily: fonts.semiBold,
                    }}>
                        {item.text}
                    </Text>
                    <Text style={{
                        fontFamily: fonts.regular,
                        width: layout.size.width / 2 + 50
                    }}>
                        {item.description}
                    </Text>
                </View>

                <View style={{
                    left: 40,
                }}>
                    <TouchableOpacity onPress={() => alert('del')}
                        hitSlop={{ bottom: 5, top: 5, right: 5, left: 5 }}
                    >
                        <Image source={icons.bluedelete} style={{
                            tintColor: colors.primary,
                            height: 20,
                            width: 20,
                            alignSelf: 'flex-end'
                        }} />

                    </TouchableOpacity>

                </View>

            </View >
            <Text style={{
                fontFamily: fonts.regular,
                alignSelf: 'flex-end'
            }}>
                {item.date}
            </Text>
        </View>
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
                title={'Notice Board'}
                titleStyle={{ fontFamily: fonts.bold }}
                leftIconSource={icons.ic_back_white}
                leftButtonStyle={{
                    tintColor: colors.white1,
                }}
                onLeftPress={() => {
                    navigation.goBack();
                }}
                rightIconSource={icons.bluedelete}
                rightIconStyle={{
                    tintColor: colors.white1,
                }}
            />

            <FlatList
                extraData={notificationArr}
                style={{ margin: moderateScale(5), padding: moderateScale(10) }}
                data={notificationArr}
                renderItem={_renderView}
                keyExtractor={(item, index) => 'key' + index}
                ListHeaderComponent={() =>
                    !notificationArr.length ? (
                        <View>
                            <Text>
                                No match found
                            </Text>
                        </View>
                    ) : null
                }
            />

            <Loader isLoading={user.loading} isAbsolute />

        </SafeAreaView>
    );
};

export default Notifications;
