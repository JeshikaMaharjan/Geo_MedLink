import {useState} from 'react';

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return {isAuthenticated, setAuthenticated};
};

export default useAuth;
