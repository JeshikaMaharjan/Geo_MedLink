const {StyleSheet} = require('react-native');

const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 290,
  },
  logo: {
    // flex: 1,
    marginTop: 50,
    height: 200,
  },
  formInput: {
    flex: 1,
    gap: 10,

    // backgroundColor: 'red',
  },
  formActions: {
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'red',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
  },
});
export {Loginstyles};
