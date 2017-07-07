import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'

import {APP_ID, PULLDOWN_DISTANCE} from '../consts';
import SendBird from 'sendbird';
import TopBar from '../components/topBar';
import Button from '../components/button';
import styles from './styles/createChannel';
var sb = null;


export default class CreateChannel extends Component {
  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    this.state = {
      channelName: '',
      disable: true
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._onBackPress = this._onBackPress.bind(this);
    this._onPressCreateChannel = this._onPressCreateChannel.bind(this);
  }

  _onChangeText(channelName) {
    this.setState({
      channelName: channelName,
      disable: (channelName.trim().length > 0) ? false : true
    })
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  _onPressCreateChannel() {
    var _SELF = this;
    sb.OpenChannel.createChannel(_SELF.state.channelName, '', '', [sb.currentUser.userId], function (channel, error) {
      if (error) {
        console.log('Create OpenChannel Fail.', error);
        return;
      }
      channel.enter(function(response, error) {
        if (error) {
          console.log('Enter openChannel Fail.', error);
        }
        _SELF.props.navigator.replace({name: 'chat', channel: channel, refresh: _SELF.props.route.refresh});
      })
    });
  }

  _buttonStyle() {
    return {
      backgroundColor: '#6E5BAA',
      underlayColor: '#51437f',
      borderColor: '#6E5BAA',
      disabledColor: '#ababab',
      textColor: '#ffffff'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onBackPress={this._onBackPress}
          title='Create OpenChannel'
           />
        <View style={styles.createContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.channelName}
            onChangeText={this._onChangeText}
            placeholder={'Open Channel Name'}
            maxLength={12}
            underlineColorAndroid="transparent"
            multiline={false}
            autoFocus={true}
          />
          <Button
            text={'CREATE'}
            style={this._buttonStyle()}
            disabled={this.state.disable}
            onPress={this._onPressCreateChannel}
          />
        </View>
      </View>
    )
  }

}

