import {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

type RowParams = {
  children?: ReactNode | undefined;
  style?: ViewStyle;
};

export const Row = ({children, style}: RowParams) => {
  return (
    <View style={[{flexDirection: 'row', gap: 5}, style]}>{children}</View>
  );
};
