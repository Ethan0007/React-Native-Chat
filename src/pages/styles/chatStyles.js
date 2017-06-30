import {
    StyleSheet,
    PixelRatio
} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    chatContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#f7f8fc'
    },
    inputContainer: {
        height: 44,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#b2b2b2',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInput: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        backgroundColor: '#FFF',
        flex: 1,
        padding: 0,
        margin: 0,
        fontSize: 15,
    },
    photoButton: {
        marginTop: 11,
        marginRight: 10,
    },
    sendButton: {
        marginTop: 11,
        marginLeft: 10,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f7f8fc',
        padding: 5,
    },

    adListItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#e6e9f0',
        padding: 5,
        margin: 5,
    },

    listIcon: {
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 15
    },
    senderIcon: {
        width: 30,
        height: 30
    },
    senderContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    senderText: {
        fontSize: 12,
        color: '#ababab'
    },
    dateText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#ababab',
        fontWeight: 'bold'
    }
});
