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

const CallHistoryDetails = ({ navigation, route }) => {

    let callDetails = route?.params?.item;

    console.log(callDetails, 'callDetails');


    let auth = useSelector(state => state.auth);
    let user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [state, setState] = useState({
        refreshing: false,
    });

    //hit Api here
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

        });
        return unsubscribe;
    }, [navigation]);

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
                title={'Call History Details'}
                titleStyle={{ fontFamily: fonts.bold }}
                leftIconSource={icons.ic_back_white}
                leftButtonStyle={{
                    tintColor: colors.white1,
                }}
                onLeftPress={() => {
                    navigation.goBack();
                }}
            />
            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    S.no
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    {callDetails.sn}
                </Text>
            </View>

            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    Contact no.
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    {callDetails.phone_no}
                </Text>
            </View>

            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    Contact no.
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    {callDetails.user_phone}
                </Text>
            </View>
            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    call id
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    88777000712AA
                </Text>
            </View>

            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    Call start time
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    12/2/2022 8:10
                </Text>
            </View>

            <View style={styles.callStyle}>
                <Text style={{
                    fontFamily: fonts.semiBold
                }}>
                    Call start time
                </Text>

                <Text style={{
                    fontFamily: fonts.regular
                }}>
                    12/2/2022 8:15

                </Text>
            </View>

            <Loader isLoading={user.loading} isAbsolute />

        </SafeAreaView>
    );
};

export default CallHistoryDetails;
