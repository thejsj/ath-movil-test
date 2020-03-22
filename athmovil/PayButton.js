import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';

const MODULE_NAME = 'ATH móvil';

const LANGUAGES = {
  es: {
    accessibilityLabel: 'Paga con ' + MODULE_NAME,
    images: {
      white: require('./images/athm_white_es.png'),
      black: require('./images/athm_black_es.png')
    }
  },
  en: {
    accessibilityLabel: 'Pay with ' + MODULE_NAME,
    images: {
      white: require('./images/athm_white_en.png'),
      black: require('./images/athm_black_en.png')
    }
  }
};

const THEMES = {
  original: StyleSheet.create({
    container: {
      backgroundColor: "#F57C00"
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: "#424242",
    }
  }),
  light: StyleSheet.create({
    container: {
      backgroundColor: "#f9f9f9",
    }
  }),
};

class PayButton extends Component {
  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const imageColor = this.props.theme === 'light' ? 'black' : 'white';
    const language = (this.props.language === 'es' || this.props.language === 'en') ? this.props.language : 'en';
    const theme = this.props.theme ? this.props.theme : 'original';
    return (
      <Touchable
        accessibilityLabel={LANGUAGES[language].accessibilityLabel}
        accessibilityRole="button"
        onPress={this.props.onPress}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple("rgba(76, 76, 76, 0.15)")}>
        <View style={[this.props.style, Style.container, THEMES[theme].container]}>
          <Image source={LANGUAGES[language].images[imageColor]} resizeMode="center" />
        </View>
      </Touchable>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.30,
    shadowRadius: 1.41,
  }
});

export default PayButton;
