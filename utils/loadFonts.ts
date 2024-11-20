import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    MontserratBlack: require('../assets/fonts/Montserrat-Black.ttf'),   
    MontserratRegularItalic: require('../assets/fonts/Montserrat-BlackItalic.ttf'),   
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),   
    MontserratBoldItalic: require('../assets/fonts/Montserrat-BoldItalic.ttf'),   
    MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratExtraBoldItalic: require('../assets/fonts/Montserrat-BoldItalic.ttf'),
    MontserratExtraLight: require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    MontserratExtraLightItalic: require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    MontserratItalicVariableFont: require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    MontserratItalic: require('../assets/fonts/Montserrat-Italic.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });
};