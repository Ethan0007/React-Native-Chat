import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  listContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  profileIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b'
  },
  descText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ababab',
    fontWeight: 'bold'
  }
});
