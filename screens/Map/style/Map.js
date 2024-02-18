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
  mapHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  map: {
    height: '67%',
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
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  modalInnerContainer: {
    gap: 15,
    alignItems: 'center',
  },
});
export {Mapstyles};
