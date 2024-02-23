import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {useUserContext} from '../../context/userContext';
import {useFetchUser} from '../../hooks/user/useUserApi';
import {Loader} from '../../helper/loader';

export const EditProfile = () => {
  const {username} = useUserContext();
  const {data: response, isLoading} = useFetchUser(username);
  const data = response?.data;
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
  // console.log({ data });
  if (isLoading) return <Loader />;

  if (!data) return <Text> No data</Text>;
  return (
    <>
      <ScrollView>
        <View style={style.topSection}>
          <View style={style.imageBox}>
            {!selectedImage ? (
              <>
                {!data.user.photo ? (
                  <Avatar.Image size={120} source={require('../mydp.png')} />
                ) : (
                  <Avatar.Image
                    size={120}
                    source={{uri: `data:image/png;base64,${data.user.photo}`}}
                  />
                )}
              </>
            ) : (
              <Avatar.Image
                size={120}
                source={{uri: `data:image/png;base64,${selectedImage}`}}
              />
            )}
          </View>
          <Pressable style={style.changePicture}>
            <Button onPress={pickImage}>Change Picture</Button>
          </Pressable>
        </View>
        <View style={style.inputBox}>
          {data.user.type === 1 ? (
            <>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>First Name</Text>
                <TextInput
                  placeholder={data.firstName}
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>Middle Name</Text>
                <TextInput
                  placeholder={data.middleName === null ? '' : data.middleName}
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>Last Name</Text>
                <TextInput
                  placeholder={data.lastName}
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>Blood Group</Text>
                <TextInput
                  placeholder={
                    data.blood_Group === null ? '' : data.blood_Group
                  }
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>Name</Text>
                <TextInput
                  placeholder={data.name}
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{marginBottom: 8, fontSize: 14}}>Bio</Text>
                <TextInput
                  placeholder={data.bio}
                  mode="outlined"
                  style={style.textInput}
                  value={''}
                />
              </View>
            </>
          )}

          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 8, fontSize: 14}}>Contact Number</Text>
            <TextInput
              placeholder={data.phoneNumber === null ? '' : data.phoneNumber}
              mode="outlined"
              style={style.textInput}
              value={''}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 8, fontSize: 14}}>Address</Text>
            <TextInput
              placeholder={data.user.address}
              mode="outlined"
              style={style.textInput}
              value={''}
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 8, fontSize: 14}}>Email</Text>
            <TextInput
              placeholder={data.user.email}
              mode="outlined"
              style={style.textInput}
              value={''}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Button
              mode="contained"
              style={{
                marginTop: 40,
                marginBottom: 20,
                width: 280,
                borderRadius: 8,
              }}>
              Save Changes
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  topSection: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#DBC0E8',
  },

  imageBox: {
    width: 125,
    height: 125,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 70,
    top: 40,
  },
  changePicture: {
    top: 45,
  },
  inputBox: {
    backgroundColor: '#FFE5E5',
    top: 90,
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 350,
  },
});
