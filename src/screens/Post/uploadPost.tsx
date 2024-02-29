import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar, Button, Divider, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {Loader} from '../../helper/loader';
import {Header, Row} from '../../components';
import {useAddPost} from '../../hooks/post/usePostApi';
import {useFetchUser} from '../../hooks/user/useUserApi';
import {TabNavigationProps} from '../../navigations/Bottom/bottom-stack.types';
import {RootStackNavigationProps} from '../../navigations/Root/root-stack.types';
import {MaterialIcons} from '@expo/vector-icons';
import {AddEvent} from '../Event/addEvent';

export const UploadPost = () => {
  // const rootNavigation = useNavigation<RootStackNavigationProps>();
  const [selectedImage, setSelectedImage] = useState('');
  const [postText, setPostText] = useState('');
  const navigation = useNavigation<TabNavigationProps>();
  const {mutate: postApi} = useAddPost();
  const {data: response, isLoading} = useFetchUser();
  const data = response?.data;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) setSelectedImage(result.assets[0].base64);
    }
  };

  const canPost = () => {
    return postText !== '' || selectedImage !== '';
  };

  const upload = () => {
    console.log('post post');
    navigation.navigate('Feed');
    setSelectedImage('');
    setPostText('');
    postApi({post: postText, photo: selectedImage});
  };
  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <View style={styles.container}>
      <Header>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          {!data.user.user_photo ? (
            <Avatar.Image size={40} source={require('../mydp.png')} />
          ) : (
            <Avatar.Image
              size={40}
              source={{uri: `data:image/png;base64,${data.user.user_photo}`}}
            />
          )}

          <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
            {data.user.userName}
          </Text>
        </View>
      </Header>
      <ScrollView>
        <View
          style={{
            padding: 4,
            // borderWidth: 1,
            borderColor: '#000',
            marginHorizontal: 8,
            marginBottom: 8,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 8}}>
              Create Post
            </Text>
          </View>
          <TextInput
            style={styles.secondView}
            multiline={true}
            mode="flat"
            placeholder="What do you want to talk about"
            value={postText}
            onChangeText={text => setPostText(text)}
          />
          <View style={styles.thirdView}>
            <View>
              <Row>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 10,
                  }}>
                  {/* <Text>Upload Attachment </Text> */}
                  <Button mode="elevated" onPress={pickImage}>
                    Upload File
                  </Button>
                  <Button
                    mode="elevated"
                    disabled={!canPost()}
                    onPress={upload}>
                    Post
                  </Button>
                </View>
              </Row>
            </View>
            {selectedImage && (
              <View>
                <Icon
                  style={{display: 'flex', alignSelf: 'flex-end', marginTop: 5}}
                  onPress={() => {
                    setSelectedImage('');
                  }}
                  color="black"
                  name="squared-cross"
                  size={22}
                />
                <Image
                  source={{uri: `data:image/png;base64,${selectedImage}`}}
                  style={styles.selectedImage}
                />
              </View>
            )}
          </View>
        </View>
        <Divider bold="true" />
        <View
          style={{
            marginTop: 5,
            padding: 4,
            // borderWidth: 1,
            borderColor: '#000',
            marginHorizontal: 8,
          }}>
          <AddEvent />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  PostBtn: {
    width: 60,
  },
  PostText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  secondView: {
    minHeight: 190,
    maxHeight: 800,
    borderWidth: 1,
    borderColor: 'black',
  },

  thirdView: {
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 90,
    maxHeight: 900,
    justifyContent: 'center',
  },
  selectedImage: {
    height: 200,
    width: 350,
    marginTop: 12,
  },
  // imageUpload: {
  //   borderRadius: 20,
  //   backgroundColor: "rgb(237, 221, 246)",
  //   padding: 6,
  // },
});
