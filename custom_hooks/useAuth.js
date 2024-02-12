import {useState} from 'react';

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  return {isAuthenticated, setAuthenticated};
};

export default useAuth;
