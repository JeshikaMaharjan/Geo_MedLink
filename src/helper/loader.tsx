import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

export const Loader = () => {
  return (
    <View style={style.loader}>
      <ActivityIndicator animating={true} color={MD2Colors.blue200} />
    </View>
  );
};

const style = StyleSheet.create({
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
