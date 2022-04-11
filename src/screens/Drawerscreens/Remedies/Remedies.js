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

let remediesArr = [
    {
        name: "Hey", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    }, {
        name: "Hello", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    },
    {
        name: "Astro", description: "Lorem Ipsum has been the industry's standard dummy text ever since", date: " 12 / 02 / 2022"
    },
];
const Remedies = ({ navigation }) => {
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
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: colors.white1,
            margin: 5,
            padding: 5
        }]}>

            <Text style={{
                fontFamily: fonts.regular,
                width: 70
            }}>
                {item.name}
            </Text>
            <Text style={{
                fontFamily: fonts.regular,
                width: layout.size.width / 2
            }}>
                {item.description}
            </Text>
            <Text style={{
                fontFamily: fonts.regular
            }}>
                {item.date}
            </Text>

            {/* <TouchableOpacity onPress={() => navigation.navigate('CallHistoryDetails', { item: item })}
                hitSlop={{ bottom: 5, top: 5, right: 5, left: 5 }}
            >
                <Image source={icons.view} />

            </TouchableOpacity> */}
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
                title={'Remedies'}
                titleStyle={{ fontFamily: fonts.bold }}
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
                label={'Create Remedies'}
            // onPress={() => createBlog()}
            />

            <FlatList
                extraData={remediesArr}
                style={{ margin: moderateScale(5), padding: moderateScale(10) }}
                data={remediesArr}
                renderItem={_renderView}
                ListHeaderComponent={flatList_Header}
                keyExtractor={(item, index) => 'key' + index}
                ListHeaderComponent={() =>
                    remediesArr.length ? (
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
                                Username
                            </Text>

                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                                Description
                            </Text>
                            <Text style={{
                                fontFamily: fonts.bold,
                                color: colors.white1
                            }}>
                                Date/ Time
                            </Text>
                        </View>
                    ) : null
                }
            />

            <Loader isLoading={user.loading} isAbsolute />

        </SafeAreaView>
    );
};

export default Remedies;
