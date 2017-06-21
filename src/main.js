import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AppState,
  Platform
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Login from './pages/login';
import OpenChannel from './pages/openChannel';
import CreateChannel from './pages/createChannel';
import Chat from './pages/chat';
import Participants from './pages/participants';
import BlockList from './pages/blockList';
import GroupChannel from './pages/groupChannel';
import InviteUser from './pages/inviteUser';
import Members from './pages/members'
import Notifications from 'react-native-push-notification';
import { APP_ID } from './consts'
import SendBird from 'sendbird'
var sb = null;
var ROUTES = {
  login: Login,
  openChannel: OpenChannel,
  createChannel: CreateChannel,
  chat: Chat,
  participants: Participants,
  blockList: BlockList,
  groupChannel: GroupChannel,
  inviteUser: InviteUser,
  members: Members
};

export default class Main extends Component {

  _handleAppStateChange = (currentAppState) => {
    if (currentAppState === 'active') {
      if (sb) {
        sb.setForegroundState();
      }
    } else if (currentAppState === 'background') {
      if (sb) {
        sb.setBackgroundState();
      }
    }
  }

  componentDidMount() {

    sb = new SendBird({ appId: APP_ID });
    AppState.addEventListener('change', this._handleAppStateChange);
    Notifications.configure({
      onRegister: function (token) {
        if (Platform.OS === 'ios') {
          sb.registerAPNSPushTokenForCurrentUser(token['token'], function (result, error) {
            console.log(result);
          });
        } else {
          sb.registerGCMPushTokenForCurrentUser(token['token'], function (result, error) {
            console.log(result);
          });
        }
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      senderID: "984140644677",

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
 
      popInitialNotification: true,
      requestPermissions: true,
    });

  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        initialRoute={{ name: 'login' }}
        renderScene={this._renderScene}
        configureScene={() => { return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight; }}
        style={styles.container}
      />
    )
  }

  _renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
