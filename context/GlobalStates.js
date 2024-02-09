import {createContext, useState} from 'react';
import {firebase} from '@react-native-firebase/database';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const useStatesAndActions = () => {
  const baseURL = '192.168.1.76:3000';
  const firebaseURl =
    'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/';
  const [token, setToken] = useState('');
  const [userName, setuserName] = useState('Jess');
  const [userId, setUserId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(false);
  const [deviceToken, setDeviceToken] = useState();
  const [isInteractionModalVisible, setIsInteractionModalVisible] =
    useState(false);
  const [mapView, setMapView] = useState('default');
  const [searchCoords, setSearchCoords] = useState();
  const [isIncoming, setIsIncoming] = useState(true);
  const AmbulanceDb = firebase.app().database(firebaseURl).ref('Ambulance');
  const NotificationDb = firebase.app().database(firebaseURl);

  const state = {
    baseURL,
    token,
    userName,
    userId,
    isModalVisible,
    location,
    deviceToken,
    isInteractionModalVisible,
    mapView,
    searchCoords,
    isIncoming,
    AmbulanceDb,
    NotificationDb,
  };
  const actions = {
    setToken,
    setuserName,
    setUserId,
    setModalVisible,
    setLocation,
    setDeviceToken,
    setIsInteractionModalVisible,
    setMapView,
    setSearchCoords,
    setIsIncoming,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={useStatesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
