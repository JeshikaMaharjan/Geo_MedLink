const {StyleSheet} = require('react-native');

const NotificationStyle = StyleSheet.create({
  container: {
    backgroundColor: '#87CEEB',
    flex: 1,
    overflowY: 'scroll',
  },
  loader: {
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 30,
  },
  surface: {
    display: 'flex',
    alignItems: 'center',
    height: 80,
  },
});
export {NotificationStyle};
