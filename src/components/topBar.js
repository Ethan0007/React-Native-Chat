import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import ImageButton from './imageButton';
import backIcon from '../img/btn-back.png';
import addIcon from '../img/btn-add.png';
import listIcon from '../img/btn-list.png';
import styles from './styles/topBar';

export default class TopBar extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftButton}>
          <ImageButton
            underlayColor={'#4e4273'}
            onPress={this.props.onBackPress}
            imageStyle={styles.imageButton}
            image={backIcon}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Text style={styles.titleLabel}>{this.props.title}</Text>
        </View>

        <View style={styles.rightButton}>
          {this._renderButton()}
        </View>
      </View>
    );
  }

  _renderButton() {
    if (this.props.onCreateOpenChannel) {
      return (
        <ImageButton
          underlayColor={'#4e4273'}
          onPress={this.props.onCreateOpenChannel}
          imageStyle={[styles.imageButton, {width: 20, height: 20}]}
          image={addIcon}
        />
      )
    } else if (this.props.onOpenMenu) {
        return (
          <ImageButton
            underlayColor={'#4e4273'}
            onPress={this.props.onOpenMenu}
            imageStyle={[styles.imageButton, {width: 30, height: 30}]}
            image={listIcon}
          />
        )
    } else if (this.props.onGroupChannel) {
      return (
        <ImageButton
          underlayColor={'#4e4273'}
          onPress={this.props.onGroupChannel}
          imageStyle={[styles.imageButton, {width: 30, height: 30}]}
          image={listIcon}
        />
      )
    } else if (this.props.onInvite) {
      return (
        <ImageButton
          underlayColor={'#4e4273'}
          onPress={this.props.onInvite}
          imageStyle={[styles.imageButton, {width: 20, height: 20}]}
          image={addIcon}
        />
      )
    }
  }
}

