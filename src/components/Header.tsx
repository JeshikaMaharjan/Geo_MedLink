import {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type TopBarProps = {
  children?: ReactNode | undefined;
  style?: ViewStyle;
};

export const Header = ({children, style}: TopBarProps) => {
  return (
    <View>
      <SafeAreaView edges={['top']} style={{backgroundColor: '#FAF7F0'}} />
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundColor: '#FAF7F0',
            paddingVertical: 10,
            paddingHorizontal: 15,
          },
          style,
        ]}>
        {children}
      </View>
    </View>
  );
};
