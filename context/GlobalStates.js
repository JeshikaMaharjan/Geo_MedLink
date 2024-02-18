import {createContext, useState} from 'react';
import {firebase} from '@react-native-firebase/database';
import {BASEURL} from '@env';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const useStatesAndActions = () => {
  const baseURL = BASEURL;
  const firebaseURl =
    'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/';
  const [userName, setuserName] = useState();
  const [userId, setUserId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(false);
  const [deviceToken, setDeviceToken] = useState();
  const [isInteractionModalVisible, setIsInteractionModalVisible] =
    useState(false);
  const [mapView, setMapView] = useState('default');
  const [searchCoords, setSearchCoords] = useState();
  const AmbulanceDb = firebase.app().database(firebaseURl).ref('Ambulance');
  const NotificationDb = firebase.app().database(firebaseURl);
  const [bloodDonorsLocation, setBloodDonorsLocation] = useState();
  const [ambulancesLocation, setAmbulancesLocation] = useState();
  const [confirmedUserLocation, setConfirmedUserLocation] = useState();

  const state = {
    baseURL,
    userName,
    userId,
    isModalVisible,
    location,
    deviceToken,
    isInteractionModalVisible,
    mapView,
    searchCoords,
    AmbulanceDb,
    NotificationDb,
    bloodDonorsLocation,
    ambulancesLocation,
    confirmedUserLocation,
  };
  const actions = {
    setuserName,
    setUserId,
    setModalVisible,
    setLocation,
    setDeviceToken,
    setIsInteractionModalVisible,
    setMapView,
    setSearchCoords,
    setBloodDonorsLocation,
    setAmbulancesLocation,
    setConfirmedUserLocation,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={useStatesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
