import {createContext, useState} from 'react';
import {firebase} from '@react-native-firebase/database';
import {BASEURL} from '@env';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const useStatesAndActions = () => {
  const baseURL = BASEURL;
  const firebaseURl =
    'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/';
  const [userName, setuserName] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(false);
  const [deviceToken, setDeviceToken] = useState();
  const [isInteractionModalVisible, setIsInteractionModalVisible] =
    useState(false);
  const [mapView, setMapView] = useState('default');
  const [searchCoords, setSearchCoords] = useState();
  const FirebaseDb = firebase.app().database(firebaseURl);
  const [bloodDonorsLocation, setBloodDonorsLocation] = useState();
  const [ambulancesLocation, setAmbulancesLocation] = useState();
  const [confirmedUserLocation, setConfirmedUserLocation] = useState();
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const [eventLocation, setEventLocation] = useState();
  const [distance, setDistance] = useState(10);
  const [timer, setTimer] = useState(false);
  const state = {
    baseURL,
    userName,
    isModalVisible,
    location,
    deviceToken,
    isInteractionModalVisible,
    mapView,
    searchCoords,
    FirebaseDb,
    bloodDonorsLocation,
    ambulancesLocation,
    confirmedUserLocation,
    fetchEnabled,
    isThankYouVisible,
    eventLocation,
    distance,
    timer,
  };
  const actions = {
    setuserName,
    setModalVisible,
    setLocation,
    setDeviceToken,
    setIsInteractionModalVisible,
    setMapView,
    setSearchCoords,
    setBloodDonorsLocation,
    setAmbulancesLocation,
    setConfirmedUserLocation,
    setFetchEnabled,
    setIsThankYouVisible,
    setEventLocation,
    setDistance,
    setTimer,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={useStatesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
