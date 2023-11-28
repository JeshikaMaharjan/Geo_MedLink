const {StyleSheet} = require('react-native');

const Registerstyles = StyleSheet.create({
  card: {
    height: '95%',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  container: {
    padding: 10,
  },
  title: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    padding: 10,
  },
  titleHighlight: {
    borderWidth: 2,
    padding: 5,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleNoHighlight: {
    textDecorationLine: 'none',
  },
});
export {Registerstyles};
