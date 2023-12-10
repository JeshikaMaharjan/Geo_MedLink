import {createContext, useState} from 'react';

export const GlobalContext = createContext([{state: {}, actions: {}}]);

const statesAndActions = () => {
  const baseURL = '192.168.1.71:3000';
  const [token, setToken] = useState('');
  const [userName, setuserName] = useState('hh');
  const [userId, setUserId] = useState('');
  const state = {
    baseURL,
    token,
    userName,
    userId,
  };
  const actions = {
    setToken,
    setuserName,
    setUserId,
  };
  return [state, actions];
};

const GlobalContextProvider = ({children}) => (
  <GlobalContext.Provider value={statesAndActions()}>
    {children}
  </GlobalContext.Provider>
);
export default GlobalContextProvider;
