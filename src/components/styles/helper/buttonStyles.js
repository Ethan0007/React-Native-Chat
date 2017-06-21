import {
    Platform,
    View
} from 'react-native';


export const ButtonStyle = (props , style) => {
 
    return {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: props.disabled ? style.disabledColor : style.borderColor,
        padding: 10,
        marginTop: 10,
        backgroundColor: props.disabled ? style.disabledColor : style.backgroundColor
    }
}

export const TextStyle = (style) => {
    return {
        width: 230,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: style.textColor
    }
}