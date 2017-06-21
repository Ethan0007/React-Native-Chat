import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import {
  CredsValidtorRegex, ERR_ALPHANUMERIC_CHAR,
  ERR_USERID_NICKNAME_REQUIRED, MSG_CONNECT, ERR_LOGIN,
  ERR_DISCONNECT , WRN_ENTER_UNAME_PW , WRN_ENTER_UID, CH_GROUP , CH_OPEN ,
} from '../consts';
import styles from './styles/loginStyles';
import Button from '../components/button';
import SendBird from 'sendbird'
import { ButtonStyle , LoginView } from './styles/helper/buttonStyles';
var sb = null;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      username: '',
      connectLabel: MSG_CONNECT,
      buttonDisabled: true,
      errorMessage: ''
    };
    this._onPressConnect = this._onPressConnect.bind(this);
    this._onPressOpenChannel = this._onPressOpenChannel.bind(this);
    this._onPressGroupChannel = this._onPressGroupChannel.bind(this)
  }

  _onPressConnect() {
    Keyboard.dismiss();

    if (!this.state.buttonDisabled) {
      this._onPressDisconnect();
      return;
    }

    if (this.state.username.trim().length == 0 || this.state.userId.trim().length == 0) {
      this.setState({
        userId: '',
        username: '',
        errorMessage: ERR_USERID_NICKNAME_REQUIRED
      });
      return;
    }


    if (CredsValidtorRegex.test(this.state.username) || CredsValidtorRegex.test(this.state.userId)) {
      this.setState({
        userId: '',
        username: '',
        errorMessage: ERR_ALPHANUMERIC_CHAR,
      });
      return;
    }

    sb = SendBird.getInstance();
    var self = this;
    sb.connect(self.state.userId, function (user, error) {
      if (error) {
        self.setState({
          userId: '',
          username: '',
          errorMessage: ERR_LOGIN
        });
        console.log(error);
        return;
      }

      if (Platform.OS === 'ios') {
        if (sb.getPendingAPNSToken()) {
          sb.registerAPNSPushTokenForCurrentUser(sb.getPendingAPNSToken(), function (result, error) {
            console.log("APNS TOKEN REGISTER AFTER LOGIN");
            console.log(result);
          });
        }
      } else {
        if (sb.getPendingGCMToken()) {
          sb.registerGCMPushTokenForCurrentUser(sb.getPendingGCMToken(), function (result, error) {
            console.log("GCM TOKEN REGISTER AFTER LOGIN");
            console.log(result);
          });
        }
      }

      sb.updateCurrentUserInfo(self.state.username, '', function (response, error) {
        self.setState({
          buttonDisabled: false,
          connectLabel: ERR_DISCONNECT,
          errorMessage: ''
        });
      });
    });
  }

  _onPressOpenChannel() {
    this.props.navigator.push({ name: 'openChannel' });
  }

  _onPressGroupChannel() {
    this.props.navigator.push({ name: 'groupChannel' });
  }

  _onPressDisconnect() {
    sb.disconnect();
    this.setState({
      userId: '',
      username: '',
      errorMessage: '',
      buttonDisabled: true,
      connectLabel: MSG_CONNECT
    });
  }

 

  render() {
    return (
      <LoginView behavior='padding' style={styles.container} >
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.userId}
            onChangeText={(text) => this.setState({ userId: text })}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={WRN_ENTER_UID}
            underlineColorAndroid="transparent"
            maxLength={12}
            multiline={false}
          />
          <TextInput
            style={[styles.input, { marginTop: 10 }]}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            onSubmitEditing={Keyboard.dismiss}
            underlineColorAndroid="transparent"
            placeholder={WRN_ENTER_UNAME_PW}
            maxLength={12}
            multiline={false}
          />

          <Button
            text={this.state.connectLabel}
            style={ButtonStyle()}
            onPress={this._onPressConnect}
          />

          <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
          <Button
            text={CH_GROUP}
            style={ButtonStyle()}
            disabled={this.state.buttonDisabled}
            onPress={this._onPressGroupChannel}
          />
          <Button
            text={CH_OPEN}
            style={ButtonStyle()}
            disabled={this.state.buttonDisabled}
            onPress={this._onPressOpenChannel}
          />

        </View>
      </LoginView>
    );
  }
}

