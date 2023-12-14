const {StyleSheet} = require('react-native');

const Mapstyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    height: 200,
    width: '100%',
    flex: 1,
  },
  map: {
    height: '75%',
    backgroundColor: 'red',
  },
  loader: {
    alignSelf: 'center',
    marginTop: 300,
    gap: 15,
  },
  textInput: {
    width: 50,
  },
  bottomView: {
    padding: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
    gap: 10,
  },
  searchBoxView: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  searchBox: {
    width: 340,
    height: 52,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconContainer: {
    width: 80,
    gap: 15,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  buttonContainer: {
    width: 180,
    gap: 15,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
});
export {Mapstyles};
