import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../../../assets';
import { colors } from '../../../utilities/constants';
import { layout } from '../../../utilities/layout';

//external libraries
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({

    card1: {
        backgroundColor: colors.white1,
        shadowColor: colors.black1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.27,
        elevation: 5,
        margin: moderateScale(10),
        padding: 10,
    },
    container: {
        backgroundColor: colors.white1,
    },
    card: {
        backgroundColor: colors.white1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: colors.black1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.27,
        elevation: 5,
        margin: moderateScale(10),
        padding: 10

    },
});
