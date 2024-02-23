import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Avatar, Divider, Searchbar, Text, useTheme} from 'react-native-paper';
import {Loader} from '../../../helper/loader';
import {useFetchPost} from '../../../hooks/post/usePostApi';
import {Post} from '../post';
import {Header} from '../../../components';
import {useUserContext} from '../../../context/userContext';
import {RootStackNavigationProps} from '../../../navigations/Root/root-stack.types';

export const NewsFeed = () => {
  const theme = useTheme();
  const {
    data: response,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isStale,
    refetch,
  } = useFetchPost();
  const navigation = useNavigation<RootStackNavigationProps>();
  const {image} = useUserContext();
  const data = response?.pages?.flatMap(item => item.data.data);
  const [searchValue, setSearchValue] = useState('');

  if (isLoading) return <Loader />;

  return (
    <>
      <Header
        style={{
          backgroundColor: theme.colors.secondary,
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          {!image ? (
            <Avatar.Image size={40} source={require('../../mydp.png')} />
          ) : (
            <Avatar.Image
              size={40}
              source={{uri: `data:image/png;base64,${image}`}}
            />
          )}
          <Pressable
            onPress={() => navigation.navigate('Search')}
            style={{flex: 1}}>
            <Searchbar
              placeholder="Search"
              value={searchValue}
              style={{
                flexShrink: 1,
                maxHeight: 35,
              }}
              inputStyle={{
                maxHeight: 25,
                bottom: 12,
                right: 10,
                color: '#607274',
              }}
              editable={false}
            />
          </Pressable>
        </View>
      </Header>
      <FlatList
        data={data}
        renderItem={({item}) => <Post value={item} />}
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
    </>
  );
};
