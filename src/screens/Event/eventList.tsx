import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useFetchEvent} from '../../hooks/event/useEventApi';

export const EventList = () => {
  const {data: response, isLoading} = useFetchEvent();
  const data = response?.pages?.flatMap(item => item.data.data);
  console.log({data});
  if (isLoading)
    return (
      <>
        <Text>Is loading</Text>
      </>
    );
  return (
    <View>
      <Text>This is Event List</Text>
    </View>
  );
};
