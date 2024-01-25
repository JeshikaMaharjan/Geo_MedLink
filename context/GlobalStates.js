import {createContext, useState} from 'react';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const useStatesAndActions = () => {
  const baseURL = '192.168.1.76:3000';
  const [token, setToken] = useState('');
  const [userName, setuserName] = useState('');
  const [userId, setUserId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(false);
  const [deviceToken, setDeviceToken] = useState();
  const [isInteractionModalVisible, setIsInteractionModalVisible] =
    useState(false);
  const [mapView, setMapView] = useState('default');
  const [searchCoords, setSearchCoords] = useState();
  const [isIncoming, setIsIncoming] = useState(false);

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
