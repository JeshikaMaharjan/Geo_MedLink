import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export const ChangeProfilePicture = () => {
  const [selectedImage, setSelectedImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) setSelectedImage(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {selectedImage && (
          <Image
            source={{uri: `data:image/png;base64,${selectedImage}`}}
            style={styles.selectedImage}
          />
        )}
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
