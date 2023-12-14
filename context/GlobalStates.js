import {createContext, useState} from 'react';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const useStatesAndActions = () => {
  const baseURL = '192.168.1.71:3000';
  const [token, setToken] = useState('');
  const [userName, setuserName] = useState('hh');
  const [userId, setUserId] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);
  const [location, setLocation] = useState(false);

  const state = {
    baseURL,
    token,
    userName,
    userId,
    isModalVisible,
    location,
  };
  const actions = {
    setToken,
    setuserName,
    setUserId,
    setModalVisible,
    setLocation,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={useStatesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
