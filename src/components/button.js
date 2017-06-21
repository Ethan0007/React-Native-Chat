import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, } from 'react-native';
import {ButtonStyle , TextStyle} from './styles/helper/buttonStyles';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.style = this.props.style;
  }
  render() {
    
    return (
      <TouchableHighlight
        disabled={this.props.disabled}
        style={ButtonStyle(this.props, this.style)}
        underlayColor={this.style.underlayColor}
        onPress={this.props.onPress}
      >

        {this.props.showProgress ?
          <View>
            <ActivityIndicator
              animating={this.props.showProgress}
              style={styles.loader} />
          </View>
          : <Text style={TextStyle(this.style)}>{this.props.text}</Text>}
      </TouchableHighlight>
    );
  }
}

 