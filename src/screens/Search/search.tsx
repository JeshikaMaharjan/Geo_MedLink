import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {Avatar, Searchbar, Text} from 'react-native-paper';
import {RootStackNavigationProps} from '../../navigations/Root/root-stack.types';
import {useSearchFetch} from '../../hooks/search/useSearchApi';
import {useDebounce} from '../../hooks/search/useDebounce';
import {Header, Row} from '../../components';
import Iconll from 'react-native-vector-icons/Entypo';

type Response = {
  user_photo: null;
  id: number;
  userName: string;
  photo: string;
};

export const Search = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const {data: response, error, isLoading} = useSearchFetch(debouncedSearch);
  // console.log(data?.data);
  const data = response?.data;
  // if (isLoading) return <Loader />;

  return (
    <>
      <View>
        <Header style={style.header}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate('BottomTab')}
          />
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
            onPressIn={() => true}
            onChangeText={searchValue => setSearchValue(searchValue)}
            autoFocus
          />
        </Header>
        {isLoading || !data ? (
          <View>
            <ImageBackground
              source={require('../../../assets/img/look.png')}
              style={style.background}
            />
          </View>
        ) : (
          <View style={style.test2}>
            {data.map((item: Response, idx: string) => (
              <Pressable
                key={idx}
                style={style.card}
                onPress={() =>
                  navigation.navigate('Profile', {username: item.userName})
                }>
                <Row style={style.test}>
                  {item.user_photo === '' || item.user_photo === null ? (
                    <View
                      style={{
                        backgroundColor: 'grey',
                        borderRadius: 25,
                        padding: 1,
                      }}>
                      <Avatar.Image size={36} source={require('../mydp.png')} />
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: 'grey',
                        borderRadius: 25,
                        padding: 1,
                      }}>
                      <Avatar.Image
                        size={36}
                        source={{
                          uri: `data:image/png;base64,${item.user_photo}`,
                        }}
                      />
                    </View>
                  )}

                  <Text style={style.search_username}>{item.userName}</Text>
                </Row>

                <Iconll name="chevron-right" size={20} />
              </Pressable>
            ))}
          </View>
        )}
        {error && (
          <View>
            <Text>{error.message}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#d4e2ff',
  },
  test: {
    padding: 10,
    backgroundColor: '#EFECEC',
  },

  test2: {
    height: 'auto',
  },
  search_username: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  background: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFECEC',
    paddingRight: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});
