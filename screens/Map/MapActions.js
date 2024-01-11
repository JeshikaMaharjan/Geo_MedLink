import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Searchbar, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Mapstyles as styles} from './style/Map';
import useHelperFunctions from './utils/helper';
import {GlobalContext} from '../../context/GlobalStates';

const MapActions = () => {
  const [, {setIsInteractionModalVisible}] = useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = query => {
    setSearchText(query);
    console.log(query);
  };
  return (
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
          onPress={getLocation}
          color="#1E3050"
        />
      </View>
      <Text variant="titleMedium" style={{color: '#1E3050'}}>
        Find Nearby
      </Text>
      <View style={{flexDirection: 'row', gap: 15}}>
        <View style={styles.nearbyContainer}>
          <Card style={styles.iconContainer}>
            <MaterialIcons name="bloodtype" size={40} color="#1E3050" />
          </Card>
          <Card style={styles.iconContainer}>
            <FontAwesomeIcon name="ambulance" size={40} color="#1E3050" />
          </Card>
        </View>
        <Card style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setIsInteractionModalVisible(true);
            }}>
            Send Request
          </Button>
        </Card>
      </View>
    </View>
  );
};

export default MapActions;
