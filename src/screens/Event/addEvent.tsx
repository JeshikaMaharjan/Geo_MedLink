import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {DatePickerInput, TimePickerModal} from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/Entypo';
import {useCreateEvent} from '../../hooks/event/useEventApi';
import {TabNavigationProps} from '../../navigations/Bottom/bottom-stack.types';
import {Row} from '../../components';

export const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const navigation = useNavigation<TabNavigationProps>();
  const [descriptionBox, setDescriptionBox] = useState(false);
  const [description, setEventDescription] = useState('');
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState('12');
  const [minute, setMinutes] = useState('00');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const {mutate: CreateEvent} = useCreateEvent();
  const theme = useTheme();

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

  const areAllFieldsFilled = () => {
    return (
      eventName.trim() !== '' &&
      selectedImage.trim() !== '' &&
      inputDate !== undefined
    );
  };

  const onCreateEvent = () => {
    if (!areAllFieldsFilled()) {
      Alert.alert('Error', 'Please fill in all the required fields.');
    } else {
      CreateEvent({
        eventName,
        description,
        hour,
        minute,
        selectedImage,
        date: inputDate,
        longitude: '',
        latitude: '',
      });
      setEventName('');
      setEventDescription('');
      setDescriptionBox(false);
      setEventDescription('');
      setInputDate(undefined);
      setHour('12');
      setMinutes('00');
      setEventLocation('');
      setSelectedImage('');
      navigation.navigate('EventList');
    }
  };

  const isCreateButtonEnabled = () => {
    // Check if all required fields are not empty
    return (
      eventName.trim() !== '' &&
      description.trim() !== '' &&
      inputDate !== undefined &&
      eventLocation.trim() !== ''
    );
  };

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const formatTime = (hours: any, minutes: any) => {
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
  };

  const onConfirm = useCallback(
    ({hours, minutes}: any) => {
      setHour(hours);
      setMinutes(minutes);
      setVisible(false);
    },
    [setVisible],
  );

  return (
    <ScrollView style={{paddingHorizontal: 4, backgroundColor: 'white'}}>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 8}}>
            Create Event
          </Text>
          <Button
            mode="contained"
            style={{borderRadius: 8}}
            onPress={onCreateEvent}
            disabled={!areAllFieldsFilled()} // Disable the button if not all fields are filled
          >
            Create Event
          </Button>
        </View>
        <Text style={{fontSize: 14, padding: 4}}>Event Name</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 4,
            gap: 4,
            backgroundColor: theme.colors.secondaryContainer,
            borderRadius: 4,
          }}>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              minHeight: 20,
              maxHeight: 40,
              justifyContent: 'center',
            }}
            underlineColor="transparent"
            placeholder="Enter event name"
            value={eventName}
            onChangeText={text => setEventName(text)}
          />
          {!descriptionBox && (
            <Button
              mode="elevated"
              style={{borderRadius: 8}}
              onPress={() => setDescriptionBox(true)}>
              Add description
            </Button>
          )}
        </View>
      </View>
      {descriptionBox ? (
        <>
          <Text style={{fontSize: 14, padding: 4}}>Event Description</Text>
          <View
            style={{
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 8,
            }}>
            <TextInput
              multiline={true}
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                minHeight: 20,
                // maxHeight: 40,
                justifyContent: 'center',
              }}
              placeholder="Enter description for event"
              underlineColor="transparent"
              value={description}
              onChangeText={text => setEventDescription(text)}
            />
          </View>
        </>
      ) : (
        ''
      )}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}>
          <View style={{width: '45%'}}>
            <Text>Date</Text>
            <DatePickerInput
              locale="en-ES"
              label={inputDate ? inputDate.toDateString() : ''}
              onChange={(d: any) => setInputDate(d)}
              inputMode={'end'}
              value={undefined}
              style={{
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 8,
              }}
              underlineColor="transparent"
            />
          </View>
          <View style={{width: '45%'}}>
            <Text>Time</Text>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: theme.colors.secondaryContainer,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}>
              <TextInput
                editable={false}
                placeholder={formatTime(parseInt(hour), parseInt(minute))}
                underlineColor="transparent"
                style={{backgroundColor: 'transparent', width: '80%'}}
              />
              <Icon
                onPress={() => {
                  setVisible(true), setSelectedImage('');
                }}
                name="clock"
                size={22}
              />
            </View>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12}
              minutes={14}
              clockIcon="mdiClockTimeFiveOutline"
            />
          </View>
        </View>
      </View>
      <View>
        <Text>Event Location</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 4,
            backgroundColor: theme.colors.secondaryContainer,
            borderRadius: 4,
            gap: 8,
          }}>
          <TextInput
            underlineColor="transparent"
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              minHeight: 20,
              maxHeight: 40,
              justifyContent: 'center',
            }}
            value={eventLocation}
            onChangeText={text => setEventLocation(text)}
          />
          <Button mode="elevated" style={{borderRadius: 8}}>
            Set Location
          </Button>
        </View>
      </View>
      <View style={styles.thirdView}>
        {selectedImage && (
          <View>
            <Icon
              style={{display: 'flex', alignSelf: 'flex-end'}}
              onPress={() => {
                setSelectedImage('');
              }}
              name="cross"
              size={22}
            />
            <Image
              source={{uri: `data:image/png;base64,${selectedImage}`}}
              style={styles.selectedImage}
            />
          </View>
        )}
        <View>
          {!selectedImage ? (
            <Row>
              <View
                style={{
                  width: '100%',
                  gap: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text>Upload Attachment </Text>
                <Button mode="elevated" onPress={pickImage}>
                  Select File
                </Button>
              </View>
            </Row>
          ) : (
            ''
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  },
  // thirdView: {
  //   alignItems: "center",
  //   marginBottom: 40,
  //   minHeight: 90,
  //   maxHeight: 900,
  //   justifyContent: "center",
  // },
  imageUpload: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(237, 221, 246)',
    padding: 10,
  },
  // selectedImage: {
  //   height: 220,
  //   width: 300,
  //   margin: 20,
  // },
  //  thirdView: {
  //   paddingVertical:12,
  //   minHeight: 90,
  //   maxHeight: 900,
  //   justifyContent: "center",
  // },
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
});
