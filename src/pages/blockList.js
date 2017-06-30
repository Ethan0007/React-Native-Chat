import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  Alert,
  StyleSheet
} from 'react-native'

import {APP_ID, PULLDOWN_DISTANCE} from '../consts';
import TopBar from '../components/topBar';
import SendBird from 'sendbird';
import styles from './styles/blockList';
var sb = null;

export default class BlockList extends Component {
  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      channel: props.route.channel,
      list: [],
      dataSource: ds.cloneWithRows([]),
      listQuery: sb.createBlockedUserListQuery()
    };
    this._onUserPress = this._onUserPress.bind(this);
    this._onBackPress = this._onBackPress.bind(this);
    this._getBlockList = this._getBlockList.bind(this);
  }

  componentWillMount() {
    this._getBlockList();
  }

  _onUserPress(obj) {
    var self = this;
    Alert.alert(
      'Unblock User',
      null,
      [
        {text: 'Unblock', onPress: () => {
          sb.unblockUser(obj, function(response, error) {
            if(error) {
              return;
            }

            self.setState({list: self.state.list.filter((user) => {
              return user.userId !== obj.userId;
            })}, ()=> {
              self.setState({dataSource: self.state.dataSource.cloneWithRows(self.state.list)});
            });
          });
        }},
        {text: 'Cancel'}
      ]
    )
  }

  _getBlockList() {
    var self = this;
    this.state.listQuery.next(function(response, error) {
      if (error) {
        if (response.length == 0) {
          return;
        }
        return;
      }

      self.setState({list: self.state.list.concat(response)}, () => {
        self.setState({dataSource: self.state.dataSource.cloneWithRows(self.state.list)});
      });
    });
  }

  _onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onBackPress={this._onBackPress}
          title='Blocked Users'
           />

        <View style={styles.listContainer}>
          <ListView
            enableEmptySections={true}
            onEndReached={() => this._getBlockList()}
            onEndReachedThreshold={PULLDOWN_DISTANCE}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableHighlight onPress={() => this._onUserPress(rowData)}>
                <View style={styles.listItem}>
                  <View style={styles.listIcon}>
                    <Image style={styles.profileIcon} source={{uri: rowData.profileUrl.replace('http://', 'https://')}} />
                  </View>
                  <View style={styles.listInfo}>
                    <Text style={styles.memberLabel}>{rowData.nickname}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            }
          />
        </View>
      </View>
    )
  }

}

