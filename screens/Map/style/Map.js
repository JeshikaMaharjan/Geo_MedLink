const {StyleSheet, Dimensions} = require('react-native');

const Mapstyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    // height: 200,
    display: 'flex',
    width: '100%',
    height: '100%',
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
    flex: 1,
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
    justifyContent: 'space-between',
    height: 50,
  },
  searchBox: {
    display: 'flex',
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 15,
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
    // width: 180,
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
  routeMapContainer: {
    flex: 1,
  },
  routeMap: {
    flex: 1,
  },

  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    // left: Dimensions.get('window').width / 2 - 30,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  buttonView: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: '#FA9E14',
  },
  routeProfileButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: 'white',
  },
  setLocationContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
  },
});
export {Mapstyles};
