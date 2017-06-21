import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, } from 'react-native';
import { ButtonStyle, TextStyle } from './styles/helper/buttonStyles';
import {
  WRN_CONNECTING, WRN_DISCONNECTING
} from '../consts';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.style = this.props.style;
  }
  render() {
    var msg;
    switch (this.props.disconnectState) {
      case true:
        msg = WRN_DISCONNECTING;
        break;
      case false:
        msg = WRN_CONNECTING
        break;
      default:
         msg;
    }

    return (
      <TouchableHighlight
        disabled={this.props.disabled}
        style={ButtonStyle(this.props, this.style)}
        underlayColor={this.style.underlayColor}
        onPress={this.props.onPress}
      >
        {this.props.showProgress ?
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.props.disconnectState ?
              <Text style={TextStyle(this.style)}>{msg}</Text>
              : <Text style={TextStyle(this.style)}>{msg}</Text>
            }

            <ActivityIndicator
              animating={this.props.showProgress}
              style={{ alignSelf: 'center' }}
            />
          </View>
          : <Text style={TextStyle(this.style)}>{this.props.text}</Text>}
      </TouchableHighlight>
    );
  }
}

