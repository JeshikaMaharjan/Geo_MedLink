import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BASEURL} from '@env';

export const useSearchFetch = (value: string) => {
  return useQuery({
    queryKey: ['search', value],
    queryFn: async () => {
      console.log(`i am searching${value}`);
      try {
        const response = await axios.get(
          `http://${BASEURL}/api/search/${value}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        console.log({response: response?.data?.take});
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
