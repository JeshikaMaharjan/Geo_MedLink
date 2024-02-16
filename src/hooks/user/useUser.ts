import {useState} from 'react';

export type UserData = {
  username?: string | undefined;
  setUsername: (user: string | undefined) => void;
  token?: string | undefined;
  setToken: (user: string | undefined) => void;
  image?: string | undefined;
  setImage: (user: string | undefined) => void;
};

export const useUser = (): UserData => {
  const [username, setUsername] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  return {
    username,
    setUsername,
    token,
    setToken,
    image,
    setImage,
  };
};
