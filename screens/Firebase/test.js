import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import {GlobalContext} from '../../context/GlobalStates';

const reference = firebase
  .app()
  .database(
    'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('Ambulance');

const Firebase = () => {
  const [state, setState] = useState();
  const [{location}] = useContext(GlobalContext);
  // ambulance le request accept garepaxi eta yoo location firebase ma halnu parxa.
  const currentLocation = {userId: 1, latitude: 27.7053, longitude: 85.39};
  reference.set(currentLocation);

  reference.on('value', snapshot => {
    setState(snapshot.val());
  });

  return (
    <View style={{backgroundColor: 'red', color: 'black'}}>
      <Text>Firebase</Text>
      <Text>{state ? state.longitude : 'null'}</Text>
    </View>
  );
};

export default Firebase;
