import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {DatePickerInput, TimePickerModal} from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/Entypo';
import {useCreateEvent} from '../../hooks/event/useEventApi';
import {TabNavigationProps} from '../../navigations/Bottom/bottom-stack.types';

export const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const navigation = useNavigation<TabNavigationProps>();
  const [descriptionBox, setDescriptionBox] = useState(false);
  const [description, setEventDescription] = useState('');
  const [inputDate, setInputDate] = useState(undefined);
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
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) setSelectedImage(result.assets[0].base64);
    }
  };
  const onCreateEvent = () => {
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
    navigation.navigate('EventList');
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
      setVisible(false);
      setHour(hours);
      setMinutes(minutes);
      console.log({hours, minutes});
    },
    [setVisible],
  );

  return (
    <ScrollView
      style={{paddingRight: 12, paddingLeft: 12, backgroundColor: 'white'}}>
      <View>
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
              style={{backgroundColor: 'transparent'}}
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
              locale="en"
              label=""
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
              flex: 1,
              height: 20,
              padding: 0,
              display: 'flex',
              alignItems: 'baseline',
            }}
            value={eventLocation}
            onChangeText={text => setEventLocation(text)}
          />
          <Button mode="elevated" style={{borderRadius: 8}}>
            Set Location
          </Button>
        </View>
      </View>
      <View>
        <Text>Upload Attachment</Text>
        <View
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            width: '100%',
            borderRadius: 8,
          }}>
          <View
            style={{
              padding: 8,
            }}>
            <Pressable onPress={pickImage}>
              {!selectedImage ? (
                <Button
                  mode="elevated"
                  // style={{
                  //   width: "30%",
                  // }}
                >
                  Select File
                </Button>
              ) : (
                ''
              )}
            </Pressable>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 'auto',
            }}>
            {selectedImage && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 20,
                }}>
                <View>
                  <Icon
                    onPress={() => setSelectedImage('')}
                    name="circle-with-cross"
                    size={18}
                  />
                </View>
              </View>
            )}
            {selectedImage && (
              <Image
                source={{uri: `data:image/png;base64,${selectedImage}`}}
                style={styles.selectedImage}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 12,
          paddingTop: 8,
          marginBottom: 20,
          gap: 20,
        }}>
        <Button mode="elevated" style={{borderRadius: 8}}>
          Cancel
        </Button>
        <Button
          mode="contained"
          style={{borderRadius: 8}}
          onPress={onCreateEvent}>
          Create Event
        </Button>
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

  thirdView: {
    alignItems: 'center',
    marginBottom: 40,
    minHeight: 90,
    maxHeight: 900,
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
    height: 250,
    width: '90%',
    margin: 20,
  },
});
