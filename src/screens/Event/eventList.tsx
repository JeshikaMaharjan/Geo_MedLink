import {FlatList, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useFetchPost} from '../../hooks/post/usePostApi';
import {useFetchEvent} from '../../hooks/event/useEventApi';
import {Loader} from '../../helper/loader';
import DispalyEvents from '../Post/showEvent';

export const EventList = () => {
  const {
    data: eventResponse,
    isLoading: eventIsLoading,
    fetchNextPage,
    isFetching: eventIsFetching,
    hasNextPage: eventHasNextPage,
    isStale: postIsStale,
    refetch: eventRefetch,
  } = useFetchEvent();

  const eventData = eventResponse?.pages?.flatMap(
    (item: any) => item.data.data,
  );
  // console.log({ eventData });

  if (eventIsLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <View>
      <FlatList
        data={eventData}
        renderItem={({item}) => <DispalyEvents value={item} />}
        ItemSeparatorComponent={() => <Divider bold />}
        ListEmptyComponent={() => <Text>No Data</Text>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => eventHasNextPage && <Loader />}
        refreshing={!postIsStale}
        onRefresh={() => {
          eventRefetch();
        }}
        onEndReached={() => {
          if (!eventIsFetching) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
};
