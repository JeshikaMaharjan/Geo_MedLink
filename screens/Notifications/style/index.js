const {StyleSheet} = require('react-native');

const NotificationStyle = StyleSheet.create({
  container: {
    backgroundColor: '#87CEEB',
    flex: 1,
    overflowY: 'scroll',
  },
  loader: {
    alignItems: 'center',
    height: '600px',
    padding: 20,
  },
  surface: {
    display: 'flex',
    padding: 10,
    // alignItems: 'center',
    // height: 80,
  },
  notificationInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  detailBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginTop: 2,
  },
  userDetail: {
    fontSize: 18,
    color: '#3f9192',
  },
  locationBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionBox: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userDetailBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  activeStatusBox: {
    backgroundColor: '#75cf30',
    borderColor: 'black',
  },
  closedStatusBox: {
    backgroundColor: '#d74e33',
    borderColor: 'black',
  },
});
export {NotificationStyle};
