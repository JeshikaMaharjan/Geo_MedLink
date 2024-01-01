import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/database';

const reference = firebase
  .app()
  .database(
    'https://fir-geomedlink-default-rtdb.asia-southeast1.firebasedatabase.app',
  )
  .ref('Ambulance');
console.log('r', reference);

const Firebase = () => {
  const [state, setState] = useState();

  const intervalId = setInterval(() => {
    const currentLocation = {latitude: 27.7053, longitude: 85.3188};
    reference.set(currentLocation);
  }, 10000);

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
