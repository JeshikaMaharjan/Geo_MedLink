import React, {useContext, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card, List, Searchbar, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Mapstyles as styles} from './style/Map';
import useHelperFunctions from './utils/helper';
import {GlobalContext} from '../../context/GlobalStates';
import axios from 'axios';
import {MAPBOX_TOKEN} from '../../constants/constants';

const MapActions = () => {
  const [, {setIsInteractionModalVisible, setMapView, setSearchCoords}] =
    useContext(GlobalContext);
  const {getLocation, getBloodDonorsLocation, getAmbulanceLocation} =
    useHelperFunctions();
  const [suggestions, setSuggestions] = useState();
  const [timeoutId, setTimeoutId] = useState(null);

  async function getSuggestions(search_text) {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=${MAPBOX_TOKEN}&country=np&autocomplete=true&limit=2&proximity=ip&types=poi&language=en`,
      );

      setSuggestions(res.data?.features);
    } catch (error) {
      console.log(error?.response?.data);
    }
  }
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = query => {
    setSearchText(query);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      getSuggestions(query);
    }, 300);
    setTimeoutId(newTimeoutId);
  };
  function retrieveCoords(val) {
    setSearchCoords(val.center);
    setMapView('search');
    setSuggestions(null);
    setSearchText(null);
  }
  return (
    <ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.searchBoxView}>
          <Searchbar
            placeholder="Search location"
            onChangeText={onChangeSearch}
            value={searchText}
            style={styles.searchBox}
          />
          <FontAwesomeIcon
            name="street-view"
            size={40}
            onPress={() => {
              getLocation();
              setMapView('default');
            }}
            color="#1E3050"
          />
        </View>
        {!!suggestions && (
          <View style={{height: '100px'}}>
            {suggestions.map((value, index) => (
              <List.Item
                key={index}
                title={value.place_name}
                onPress={() => {
                  retrieveCoords(value);
                }}
              />
            ))}
          </View>
        )}
        <Text variant="titleMedium" style={{color: '#1E3050'}}>
          View Nearby Location
        </Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View style={styles.nearbyContainer}>
            <View>
              <Card style={styles.iconContainer}>
                <MaterialIcons
                  name="bloodtype"
                  size={40}
                  color="#1E3050"
                  onPress={() => {
                    getBloodDonorsLocation();
                  }}
                />
              </Card>
              <Text>Blood donors</Text>
            </View>
            <View>
              <Card style={styles.iconContainer}>
                <FontAwesomeIcon
                  name="ambulance"
                  size={40}
                  color="#1E3050"
                  onPress={() => {
                    getAmbulanceLocation();
                  }}
                />
              </Card>
              <Text>Ambulances</Text>
            </View>
          </View>
          <View>
            <Card style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  setMapView('setLocation');
                }}>
                Send Request
              </Button>
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MapActions;
