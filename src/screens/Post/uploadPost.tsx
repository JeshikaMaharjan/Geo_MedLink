import React, {useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Loader} from '../../helper/loader';
import {Header} from '../../components';
import {useAddPost} from '../../hooks/post/usePostApi';
import {useFetchUser} from '../../hooks/user/useUserApi';
import {TabNavigationProps} from '../../navigations/Bottom/bottom-stack.types';

export const UploadPost = () => {
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
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    // console.log(result);

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

        <Button mode="elevated" disabled={!canPost()} onPress={upload}>
          Post
        </Button>
      </Header>
      {/* <Row style={styles.firstView}>
        <Avatar.Image size={32} source={require("../mydp.png")} />
        <Pressable style={styles.PostBtn} onPress={upload}>
          <Text style={styles.PostText}>Post</Text>
        </Pressable>
      </Row> */}
      <ScrollView>
        <TextInput
          style={styles.secondView}
          multiline={true}
          mode="flat"
          placeholder="What do you want to talk about"
          value={postText}
          onChangeText={text => setPostText(text)}
        />
        <View style={styles.thirdView}>
          {selectedImage && (
            <Image
              source={{uri: `data:image/png;base64,${selectedImage}`}}
              style={styles.selectedImage}
            />
          )}
          <Pressable onPress={pickImage}>
            <View style={styles.imageUpload}>
              <Icon name="image" size={30} color="rgb(124, 117, 126)"></Icon>
              {!selectedImage ? (
                <Text variant="bodyMedium"> Add Photo</Text>
              ) : (
                <Text variant="bodyMedium">Change Photo</Text>
              )}
            </View>
          </Pressable>
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
    paddingBottom: 10,
    // marginTop: 20,
  },

  thirdView: {
    alignItems: 'center',
    marginBottom: 40,
    minHeight: 90,
    maxHeight: 900,
    // backgroundColor: "#5FBDFF",
    justifyContent: 'center',
  },
  imageUpload: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(237, 221, 246)',
    padding: 10,
  },
  selectedImage: {
    height: 150,
    width: 150,
    margin: 20,
  },
});
