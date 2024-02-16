import {useInfiniteQuery} from '@tanstack/react-query';
import {useState} from 'react';

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchNews = () => {
  console.log('This is fetching apo');
  const [take, setValue] = useState(5);
  // console.log({ url: `${BASEURL}/api/post/organization1?pageNumber=${page}` });
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: async ({pageParam}) => {
      const data = await fetch(
        `${BASEURL}/api/post/scrap?pageNumber=${pageParam}?take=${take}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      );
      console.log('fetfaf');
      // console.log(data);
      const response = await data.json();
      console.log({response: response?.data?.take});
      setValue(response?.data?.take);
      return response;
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
