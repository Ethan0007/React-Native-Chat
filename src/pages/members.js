import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import {APP_ID, PULLDOWN_DISTANCE} from '../consts';
import TopBar from '../components/topBar';
import moment from 'moment';
import SendBird from 'sendbird';
import styles from './styles/member';
var sb = null;

export default class Members extends Component {
  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      channel: props.route.channel,
      list: [],
      dataSource: ds.cloneWithRows([]),
      inviteList: []
    };
  }

  componentWillMount() {
    this._getUserList();
  }

  _onlineStyle(online) {
    return {
      textAlign: 'center',
      fontSize: 12,
      color: (online == 'online') ? '#6E5BAA' : '#ababab',
      fontWeight: (online == 'online') ? 'bold' : 'normal'
    }
  }

  _getUserList() {
    var _members = this.state.channel.members;
    var _response = _members.filter((user) => {return user.userId !== sb.currentUser.userId;});
    this.setState({list: this.state.list.concat(_response)}, () => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.list)});
    });
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onBackPress={this._onBackPress.bind(this)}
          title='User List'
           />

        <View style={styles.listContainer}>
          <ListView
            enableEmptySections={true}
            onEndReachedThreshold={PULLDOWN_DISTANCE}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.listItem}>
                <View style={styles.listIcon}>
                  <Image style={styles.profileIcon} source={{uri: rowData.profileUrl.replace('http://', 'https://')}} />
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.titleLabel}>{rowData.nickname}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}}>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Text style={this._onlineStyle(rowData.connectionStatus)}>{rowData.connectionStatus}</Text>
                     <Text style={styles.descText}>{(rowData.lastSeenAt == 0) ? '-' : moment(rowData.lastSeenAt).format('MM/DD HH:mm')}</Text>
                  </View>
                </View>
              </View>
              }
           />
        </View>
      </View>
    )
  }
}
