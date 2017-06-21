import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingTop: 20,
    paddingBottom: 2,
  },
  titleLabel: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 18
  },
  leftButton: {
    justifyContent: 'flex-start',
    paddingLeft: 5
  },
  rightButton: {
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  imageButton: {
    width: 30,
    height: 30
  }
});
