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

let callHistoryArr = [
    {
        sn: 1, phone_no: 7696809212, user_phone: 7837656315
    }, {
        sn: 2, phone_no: 7696809212, user_phone: 7837656315
    }, {
        sn: 3, phone_no: 7696809212, user_phone: 7837656315
    }, {
        sn: 4, phone_no: 7696809212, user_phone: 7837656315
    },
];
const CallHistory = ({ navigation }) => {
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
        <View style={[styles.renderItem, {
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: colors.white1
        }]}>
            <Text style={{
                fontFamily: fonts.regular
            }}>
                {item.sn}
            </Text>
            <Text style={{
                fontFamily: fonts.regular
            }}>
                {item.phone_no}
            </Text>
            <Text style={{
                fontFamily: fonts.regular
            }}>
                {item.user_phone}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('CallHistoryDetails', { item: item })}
                hitSlop={{ bottom: 5, top: 5, right: 5, left: 5 }}
            >
                <Image source={icons.view} />

            </TouchableOpacity>
        </View >
    );


    const flatList_Header = () => {
        return (
            <View style={{
                height: 45,
                width: "100%",
                backgroundColor: "#00B8D4",
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text style={{ fontSize: 24, }}> Sample FlatList Header </Text>

            </View>
        );
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
                title={'Call History'}
                titleStyle={{ fontFamily: fonts.bold }}
                leftIconSource={icons.ic_back_white}
                leftButtonStyle={{
                    tintColor: colors.white1,
                }}
                onLeftPress={() => {
                    navigation.goBack();
                }}
            />

            <FlatList
                extraData={callHistoryArr}
                style={{ margin: moderateScale(5), padding: moderateScale(10) }}
                data={callHistoryArr}
                renderItem={_renderView}
                ListHeaderComponent={flatList_Header}
                keyExtractor={(item, index) => 'key' + index}
                ListHeaderComponent={() =>
                    callHistoryArr.length > 0 ? (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: colors.primary,
                            padding: 10
                        }}>
                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                                Sr.no
                            </Text>

                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                                Contact no.
                            </Text>
                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                                User phone no.
                            </Text>
                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                               View
                            </Text>
                        </View>
                    ) : null
                }
            />

            <Loader isLoading={user.loading} isAbsolute />

        </SafeAreaView>
    );
};

export default CallHistory;
