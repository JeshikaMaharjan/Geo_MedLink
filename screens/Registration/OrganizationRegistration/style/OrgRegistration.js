const {StyleSheet} = require('react-native');

const OrgRegisterstyles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    paddingTop: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  modalInnerContainer: {
    gap: 5,
    alignItems: 'center',
  },
  ChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  },
  chip: {
    margin: 4,
  },
});
export {OrgRegisterstyles};
