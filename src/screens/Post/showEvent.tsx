import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const DispalyEvents = (_value: any) => {
  const [displayDescription, setDisplayDescription] = useState(false);
  const data = _value.value;
  const incomingHour = parseInt(data.hour);
  const amOrPm = incomingHour >= 12 ? 'PM' : 'AM';
  const displayedHour = incomingHour > 12 ? incomingHour - 12 : incomingHour;
  const displayedMinute = String(data.minute).padStart(2, '0'); // Ensure two digits for minutes

  return (
    <>
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
              <View style={styles.location}>
                <Icon name="location-pin" size={20} />
                <Text>Lalitpur Engineering College</Text>
              </View>
              <View style={styles.dateTime}>
                <Icon name="calendar" size={20} />
                <View>
                  <Text>{new Date(data.date).toLocaleDateString()}</Text>
                  <Text>
                    {displayedHour}:{displayedMinute} {amOrPm}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {!displayDescription && (
            <View>
              <Button
                style={{
                  width: '40%',
                  marginTop: 30,
                  backgroundColor: 'lightblue',
                }}
                onPress={() => setDisplayDescription(true)}>
                <Text>Read more</Text>
              </Button>
            </View>
          )}

          {displayDescription && (
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
                style={{
                  width: '40%',
                  marginTop: 30,
                  backgroundColor: 'lightblue',
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
                onPress={() => setDisplayDescription(false)}>
                <Text>Read less</Text>
              </Button>
            </View>
          )}
        </Card>
      </ScrollView>
    </>
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
