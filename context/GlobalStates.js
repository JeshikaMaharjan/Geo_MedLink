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
  const [isIncoming, setIsIncoming] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState({});
  const [mapView, setMapView] = useState('default');
  const [searchCoords, setSearchCoords] = useState();

  const state = {
    baseURL,
    token,
    userName,
    userId,
    isModalVisible,
    location,
    deviceToken,
    isInteractionModalVisible,
    isIncoming,
    incomingRequest,
    mapView,
    searchCoords,
  };
  const actions = {
    setToken,
    setuserName,
    setUserId,
    setModalVisible,
    setLocation,
    setDeviceToken,
    setIsInteractionModalVisible,
    setIsIncoming,
    setIncomingRequest,
    setMapView,
    setSearchCoords,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={useStatesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
