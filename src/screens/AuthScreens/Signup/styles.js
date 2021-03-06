import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../../../assets';
import { colors } from '../../../utilities/constants';
import { layout } from '../../../utilities/layout';

//external libraries
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white1,
  },
  subContainer: {
    height: layout.size.height / 1.1,
  },
  subContentContainer: {
    paddingBottom: moderateScale(10),
    backgroundColor: colors.black1,
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
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
  },
  labelTextStyle: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(16),
    color: colors.white1,
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
    height: moderateScale(200),
    width: moderateScale(200),
    alignSelf: 'center',
    marginTop: moderateScale(55),
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
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  uploadStoreBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    top: 20,
    // alignItems: 'center',
  },
  logo2: {
    tintColor: colors.white1,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 20,
  }, btnStyles: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: layout.size.width - 50,
    alignSelf: 'center',
  },
});
