import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


//external libraries
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../../../../../assets';
import { colors } from '../../../../utilities/constants';
import { layout } from '../../../../utilities/layout';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white1,
  },
  subContainer: {
    paddingHorizontal: moderateScale(15),
    marginLeft: 15,
  },
  subContentContainer: {
    paddingBottom: moderateScale(40),
  },
  textInputStyles: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: moderateScale(30),
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    color: colors.white1,
    fontFamily: fonts.semiBold,
  },
  signInBtn: {
    height: 44,
    width: layout.size.width - 80,
    backgroundColor: colors.primary,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  image: {
    flex: 1,
    height: '100%',
  },
  labelTextStyle: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(16),
    color: colors.white1,

    height: moderateScale(25)
  },
  textinput: {
    fontSize: RFValue(22),
    alignSelf: 'center',
    fontFamily: fonts.semiBold,
    marginTop: moderateScale(15),
    color: colors.white1,
  },
  textStyle: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(16),
    color: colors.white1,
    paddingHorizontal: moderateScale(5),
    alignSelf: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(100),
    width: moderateScale(100),
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(100),
    borderColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    borderWidth: 0.5,
  },
  uploadContent: {
    alignItems: 'center',
    backgroundColor:'red',
  },
  uploadStoreBtn: {
    height: 40,
    width: 80,
    borderRadius: 20,
    backgroundColor: 'transparent',
    top: 20,
  },
  logo2: {
    tintColor: colors.white1,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 20,
  },
});
