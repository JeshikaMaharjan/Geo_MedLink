import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {GlobalContext} from '../../../context/GlobalStates';
import {useNavigation} from '@react-navigation/native';
import {TabNavigationProps} from '../../navigations/Bottom/bottom-stack.types';

const DispalyEvents = (_value: any) => {
  const [displayDescription, setDisplayDescription] = useState(false);
  const data = _value.value;
  const incomingHour = parseInt(data.hour);
  const amOrPm = incomingHour >= 12 ? 'PM' : 'AM';
  const displayedHour = incomingHour > 12 ? incomingHour - 12 : incomingHour;
  const displayedMinute = String(data.minute).padStart(2, '0'); // Ensure two digits for minutes
  const [, {setMapView, setConfirmedUserLocation}] = useContext(GlobalContext);
  const navigation = useNavigation<TabNavigationProps>();

  const handleViewLocationPress = () => {
    setMapView('confirmedUser');
    setConfirmedUserLocation({
      coords: {
        latitude: data?.latitude,
        longitude: data?.longitude,
      },
    });
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.PostContainer}>
      <Card style={styles.Post}>
        <View style={styles.ImageBox}>
          {data.photo !== null && data.photo !== '' && (
            <Card.Cover
              source={{
                uri: `data:image/png;base64,${data.photo}`,
              }}
              style={{borderRadius: 0}}
            />
          )}
        </View>
        <View style={styles.basicInfo}>
          <View
            style={{
              borderBottomColor: 'grey',
              paddingBottom: 4,
              borderBottomWidth: 0.5,
            }}>
            <Text style={styles.title}> {data.eventName}</Text>
          </View>
          <View style={styles.locationAndDateTime}>
            {data?.longitude && data?.latitude ? (
              <View style={styles.location}>
                <Icon name="location-pin" size={20} color="black" />
                <Button
                  onPress={() => {
                    handleViewLocationPress();
                  }}>
                  View Location on map
                </Button>
              </View>
            ) : (
              <View style={styles.location}>
                <Icon name="location-pin" size={20} color="black" />
                <Text>No Location </Text>
              </View>
            )}
            <View style={styles.dateTime}>
              <Icon name="calendar" size={20} color="black" />
              <View>
                <Text>{new Date(data.date).toLocaleDateString()}</Text>
                <Text>
                  {displayedHour}:{displayedMinute} {amOrPm}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {!data?.description && !displayDescription ? (
          <Text>No Description provided</Text>
        ) : (
          <View>
            {!displayDescription ? (
              <Button
                mode="elevated"
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  width: '100%',
                }}
                onPress={() => setDisplayDescription(true)}>
                <Text variant="bodyMedium">View Details</Text>
              </Button>
            ) : (
              <View style={{marginTop: 12, paddingHorizontal: 8}}>
                <View>
                  <Text
                    // variant="bodyLarge"
                    style={{
                      // backgroundColor:'tan',
                      fontSize: 14,
                      // marginTop: 20,
                      textAlign: 'justify',
                    }}>
                    {data.description}
                  </Text>
                </View>
                <Button
                  mode="elevated"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => setDisplayDescription(false)}>
                  <Text>Hide details</Text>
                </Button>
              </View>
            )}
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

export default DispalyEvents;

const styles = StyleSheet.create({
  PostContainer: {
    width: '100%',
    backgroundColor: '#FBF9F1',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 3,
  },
  Post: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: '#F0FFFF',
    padding: 8,
  },
  ImageBox: {
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    backgroundColor: 'tan',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  basicInfo: {
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationAndDateTime: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },

  location: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTime: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    paddingRight: 8,
  },
});
