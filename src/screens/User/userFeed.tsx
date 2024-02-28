import {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Loader} from '../../helper/loader';
import {Post} from '../Post/post';
import {useFetchUserPost} from '../../hooks/post/usePostApi';
import {UserDetail} from './userDetail';

export const UserFeed = (userData: any) => {
  const user = userData.userData;
  console.log({userFeedUser: user});
  const [value, setValue] = useState({});
  const {
    data: response,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isStale,
    refetch,
  } = useFetchUserPost(user.user.userName);
  // console.log(response?.pageParams);
  const data = response?.pages.flatMap(item => item.data.data);
  // console.log(hasNextPage);
  if (isLoading) return <Loader />;
  // console.log({ isStale });
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Post value={item} />}
      ItemSeparatorComponent={() => <Divider bold />}
      ListHeaderComponent={() => <UserDetail userData={userData} />}
      ListEmptyComponent={() => (
        <View style={{height: 550, backgroundColor: 'white'}}>
          <Image
            source={require('../../../assets/img/noData.png')}
            style={style.background}
          />
        </View>
      )}
      keyExtractor={item => item.id}
      ListFooterComponent={() => hasNextPage && <Loader />}
      refreshing={!isStale}
      onRefresh={refetch}
      onEndReached={() => {
        if (!isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
};
const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
});
