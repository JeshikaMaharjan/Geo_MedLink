import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useFetchUser = (usernameParam?: string | undefined) => {
  const {username: currentUserName} = useUserContext();

  const username = usernameParam ?? currentUserName!;

  console.log('Print username: ', {username});

  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://${BASEURL}/api/user/${username}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
