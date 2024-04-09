import {useInfiniteQuery} from '@tanstack/react-query';
import {useState} from 'react';
import axios from 'axios';
import {BASEURL} from '@env';

export const useFetchNews = () => {
  console.log('This is fetching apo');
  const [take, setValue] = useState(5);
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: async ({pageParam}) => {
      try {
        const response = await axios.get(
          `${BASEURL}/post/scrap?pageNumber=${pageParam}?take=${take}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        console.log({response: response?.data?.take});
        setValue(response?.data?.take);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, res) => {
      return lastPage?.data?.next_page;
    },
    select: data => {
      return data;
    },
  });
};
