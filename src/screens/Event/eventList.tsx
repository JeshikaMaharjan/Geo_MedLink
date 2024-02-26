import {FlatList, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useFetchPost} from '../../hooks/post/usePostApi';
import {useFetchEvent} from '../../hooks/event/useEventApi';
import {Loader} from '../../helper/loader';
import DispalyEvents from './showEvent';

export const EventList = () => {
  const {
    data: postResponse,
    isLoading: postIsLoading,
    fetchNextPage,
    isFetching: postIsFetching,
    hasNextPage: postHasNextPage,
    isStale: postIsStale,
    refetch: postRefetch,
  } = useFetchPost();

  const {data: eventResponse, isLoading: eventIsLoading} = useFetchEvent();

  const eventData = eventResponse?.pages?.flatMap(item => item.data.data);
  console.log({eventData});

  if (postIsLoading || eventIsLoading) {
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
        ListFooterComponent={() => postHasNextPage && <Loader />}
        refreshing={!postIsStale}
        onRefresh={() => {
          postRefetch();
        }}
        onEndReached={() => {
          if (!postIsFetching) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
};
