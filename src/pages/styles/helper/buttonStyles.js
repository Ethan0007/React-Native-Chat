import {
    Platform,
    View
} from 'react-native';

export const ButtonStyle = () => {
    return {
        backgroundColor: '#3498db',
        underlayColor: '#51437f',
        borderColor: '#3498db',
        disabledColor: '#ababab',
        textColor: '#ffffff'
    };
};

export const KeyboardView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})();