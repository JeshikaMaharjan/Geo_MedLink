import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {NewsViews} from './Component/newsView';
import {useFetchNews} from '../../hooks/news/useNewsApi';
import {Loader} from '../../helper/loader';

export const News = () => {
  const [value, setValue] = useState({});
  const {
    data: response,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isStale,
    refetch,
  } = useFetchNews();
  // console.log(response?.pageParams);
  const data = response?.pages.flatMap(item => item.data.data);
  console.log(hasNextPage);
  if (isLoading) return <Loader />;
  console.log({isStale});
  // if (!data || data.length === 0) return <Text>No Data</Text>;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <NewsViews value={item} />}
        ItemSeparatorComponent={() => <Divider bold />}
        ListEmptyComponent={() => <Text>No Data</Text>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => hasNextPage && <Loader />}
        refreshing={!isStale}
        onRefresh={() => {
          refetch();
        }}
        onEndReached={() => {
          if (!isFetching) {
            // if (!hasNextPage) return <Text>No data available</Text>;
            fetchNextPage();
          }
        }}
        // onEndReachedThreshold={0}
      />
      {!hasNextPage && <Text>nono</Text>}
    </View>
  );
};
