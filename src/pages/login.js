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
  WRN_DISCONNECT, WRN_ENTER_UNAME_PW, WRN_ENTER_UID, CH_GROUP, CH_OPEN,
  WRN_CONNECTING, WRN_CONNECTED, WRN_DISCONNECTING , WRN_DISCONNECTED
} from '../consts';
import styles from './styles/loginStyles';
import Button from '../components/button';
import SendBird from 'sendbird'
import { ButtonStyle, KeyboardView } from './styles/helper/buttonStyles';
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
      disconnectState: false,
      showProgress: false,
      groupChannelBtnDisabled: true,
      openChannelBtnDisabled: true
    };
    this._onPressConnect = this._onPressConnect.bind(this);
    this._onPressOpenChannel = this._onPressOpenChannel.bind(this);
    this._onPressGroupChannel = this._onPressGroupChannel.bind(this)
  }

  _onPressConnect() {

    var self = this;
    sb = SendBird.getInstance();
    Keyboard.dismiss();
    this.setState({ showProgress: true });

    if (self.state.connectLabel === WRN_CONNECTED)
      this._onPressDisconnect();

    if (!self.state.groupChannelBtnDisabled && !self.state.openChannelBtnDisabled)
      this._onPressDisconnect();

    if (self.state.username.trim().length == 0 || self.state.userId.trim().length == 0) {
      setTimeout(() => {
        self.setState({
          userId: '',
          username: '',
          groupChannelBtnDisabled: true,
          openChannelBtnDisabled: true,
          showProgress: false,
          errorMessage: ERR_USERID_NICKNAME_REQUIRED
        });
      }, 1000);
    }

    if (CredsValidtorRegex.test(self.state.username) || CredsValidtorRegex.test(self.state.userId)) {
      self.setState({
        userId: '',
        username: '',
        errorMessage: ERR_ALPHANUMERIC_CHAR,
      });
    }

    sb.connect(self.state.userId, (user, error) => {

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
        if (this.state.connectLabel === MSG_CONNECT) {
          self.setState({
            groupChannelBtnDisabled: false,
            openChannelBtnDisabled: false,
            connectBtnDisabled: false,
            showProgress: false,
            connectLabel: WRN_DISCONNECT
          })
        } else {
           self.setState({
            groupChannelBtnDisabled: false,
            openChannelBtnDisabled: false,
            connectBtnDisabled: false,
            showProgress: false,
            connectLabel: WRN_DISCONNECTED
          })
        }
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
            showProgress: false,
            connectBtnDisabled: true,
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
    this.setState({
      disconnectState: true
    })
    sb.disconnect();
    setTimeout(() => {
      this.setState({
        userId: '',
        username: '',
        errorMessage: '',
        connectBtnDisabled: true,
        groupChannelBtnDisabled: true,
        openChannelBtnDisabled: true,
        showProgress: false,
        connectLabel: MSG_CONNECT
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        disconnectState: false
      });
    }, 2000);
  }

  render() {
    return (
      <KeyboardView behavior='padding' style={styles.container} >
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
            disconnectState={this.state.disconnectState}
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
      </KeyboardView>
    );
  }
}

