import {useMutation, useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
// const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchUser = (usernameParam?: string | undefined) => {
  const {username: currentUserName} = useUserContext();

  const username = usernameParam ?? currentUserName!;

  console.log('Print username: ', {username});

  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      // const data = await fetch(`${BASEURL}/api/user/${username}`, {
      const data = await fetch(`http://192.168.101.11/api/user/${username}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      console.log('fetfaf');
      // console.log(data);
      const response = await data.json();
      // console.log(response);
      return response;
    },
  });
};

type userLoginParams = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({username, password}: userLoginParams) => {
      try {
        const data = {userName: username, password: password};
        console.log({data});
        const res = await axios.post(
          `http://192.168.101.19:5000/api/login`,
          data,
        );
        console.log(res);

        // setContextUsername(res?.data?.data.username);
        // setContextToken(res?.data?.data.token);
        // setImage(res?.data?.data.image);
        return res;
      } catch (error) {
        console.log('err', error);
        // console.log(error?.response?.data?.error?.message);
      }
      // // const data = await fetch(`${BASEURL}/api/login`, {
      // const data = await fetch(`http://192.168.101.19/api/login`, {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({userName: username, password: password}),
      // });
      // console.log({data});
      // const response = await data.json();
      // console.log({response});
      // return response;
    },
  });
};
