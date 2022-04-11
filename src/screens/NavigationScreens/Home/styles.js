import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { fonts } from '../../../../assets';
import { colors } from '../../../utilities/constants';
import { layout } from '../../../utilities/layout';


export default StyleSheet.create({
  container: {
    backgroundColor: colors.white1,
  },
  renderItem: {
    margin: moderateScale(4),
    width: layout.size.width / 3 - 10,
    height: layout.size.height / 5 - 20,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imageStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    flex: 0.6,
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
  textStyle: {
    fontFamily: fonts.semiBold,
    color: colors.white1,
    paddingHorizontal: moderateScale(5),
    alignSelf: 'center',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
  },
  nomatch: {
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: fonts.semiBold,
  }
})