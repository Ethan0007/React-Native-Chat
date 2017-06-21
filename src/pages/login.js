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
  CredsValidtorRegex, ERR_ALPHANUMERIC_CHAR, CH_NAME_OPENCHANNEL,
  CH_NAME_GROUPCHANNEL, ERR_USERID_NICKNAME_REQUIRED, MSG_CONNECT, ERR_LOGIN,
  ERR_DISCONNECT, WRN_ENTER_UNAME_PW, WRN_ENTER_UID, CH_GROUP, CH_OPEN,
  WRN_CONNECTING
} from '../consts';
import styles from './styles/loginStyles';
import Button from '../components/button';
import SendBird from 'sendbird'
import { ButtonStyle, LoginView } from './styles/helper/buttonStyles';
var sb = null;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      username: '',
      connectLabel: MSG_CONNECT,
      buttonDisabled: true,
      errorMessage: '',
      showProgress: false,
      groupChannelBtnDisabled: true,
      openChannelBtnDisabled: true
    };
    this._onPressConnect = this._onPressConnect.bind(this);
    this._onPressOpenChannel = this._onPressOpenChannel.bind(this);
    this._onPressGroupChannel = this._onPressGroupChannel.bind(this)
  }

  _onPressConnect() {

    Keyboard.dismiss();
    this.setState({ showProgress: true, connectLabel: WRN_CONNECTING});


    if (!this.state.groupChannelBtnDisabled && !this.state.openChannelBtnDisabled)
      this._onPressDisconnect();

    if (this.state.username.trim().length == 0 || this.state.userId.trim().length == 0) {
      setTimeout(() => {
        this.setState({
          userId: '',
          username: '',
          groupChannelBtnDisabled: true,
          openChannelBtnDisabled: true,
          showProgress: false,
          errorMessage: ERR_USERID_NICKNAME_REQUIRED
        });
      }, 1000);

    }

    if (CredsValidtorRegex.test(this.state.username) || CredsValidtorRegex.test(this.state.userId)) {
      this.setState({
        userId: '',
        username: '',
        errorMessage: ERR_ALPHANUMERIC_CHAR,
      });
    }

    sb = SendBird.getInstance();
    var self = this;
    sb.connect(self.state.userId, function (user, error) {

      if (error) {
        self.setState({
          userId: '',
          username: '',
          groupChannelBtnDisabled: true,
          openChannelBtnDisabled: true,
          showProgress: false,
          errorMessage: ERR_LOGIN
        });
      } else {
        self.setState({
          groupChannelBtnDisabled: false,
          openChannelBtnDisabled: false,
          buttonDisabled: false,
          showProgress: false
        })
      }

      if (Platform.OS === 'ios') {
        if (sb.getPendingAPNSToken()) {
          sb.registerAPNSPushTokenForCurrentUser(sb.getPendingAPNSToken(), function (result, error) { });
        }
      } else {
        if (sb.getPendingGCMToken()) {
          sb.registerGCMPushTokenForCurrentUser(sb.getPendingGCMToken(), function (result, error) { });
        }
      }

      sb.updateCurrentUserInfo(self.state.username, '', function (response, error) {
        if (error) {
          self.setState({
            groupChannelBtnDisabled: true,
            openChannelBtnDisabled: true,
            showProgress: false
          });
        } else {
          self.setState({
            groupChannelBtnDisabled: false,
            openChannelBtnDisabled: false,
            buttonDisabled: false,
            showProgress: false,
            connectLabel: ERR_DISCONNECT,
            errorMessage: ''
          });
        }
      });
    });
  }

  _onPressOpenChannel() {
    this.props.navigator.push({ name: CH_NAME_OPENCHANNEL });
  }

  _onPressGroupChannel() {
    this.props.navigator.push({ name: CH_NAME_GROUPCHANNEL });
  }


  shouldComponentUpdate(nextProps, nextState) {

    if (nextState.userId.trim() === '' || nextState.username.trim() === '') {
      setTimeout(() => {
        this.setState({ buttonDisabled: true });
      }, 100)
    }
    if (nextState.userId.trim() !== '' && nextState.username.trim() !== '') {
      setTimeout(() => {
        this.setState({ buttonDisabled: false });
      }, 100)
    }


    return true;
  }

  _onPressDisconnect() {
    sb.disconnect();
    this.setState({
      userId: '',
      username: '',
      errorMessage: '',
      groupChannelBtnDisabled: true,
      openChannelBtnDisabled: true,
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
            onChangeText={(text) =>
              this.setState({ username: text })}
            onSubmitEditing={Keyboard.dismiss}
            underlineColorAndroid="transparent"
            placeholder={WRN_ENTER_UNAME_PW}
            maxLength={12}
            multiline={false}
          />

          <Button
            showProgress={this.state.showProgress}
            text={this.state.connectLabel}
            style={ButtonStyle()}
            disabled={this.state.buttonDisabled}
            onPress={this._onPressConnect}
          />

          <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
          <Button
            text={CH_GROUP}
            style={ButtonStyle()}
            disabled={this.state.groupChannelBtnDisabled}
            onPress={this._onPressGroupChannel}
          />
          <Button
            text={CH_OPEN}
            style={ButtonStyle()}
            disabled={this.state.openChannelBtnDisabled}
            onPress={this._onPressOpenChannel}
          />

        </View>
      </LoginView>
    );
  }
}

