import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useState} from 'react';
import {useUserContext} from '../../context/userContext';
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchPost = () => {
  console.log('This is fetching api');
  const {token} = useUserContext();
  console.log({token});
  // console.log({ url: `${BASEURL}/api/post/organization1?pageNumber=${page}` });
  return useInfiniteQuery({
    queryKey: ['post'],
    queryFn: async ({pageParam}) => {
      const data = await fetch(
        `${BASEURL}/api/post/all?pageNumber=${pageParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log('fetfaf');
      // console.log(data);
      const response = await data.json();
      // console.log({ response: response?.data?.take });
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

export const useFetchUserPost = (username: string) => {
  console.log('This is fetching post');
  console.log({username});
  // const { username } = useUserContext();
  const [take, setValue] = useState(5);
  return useInfiniteQuery({
    queryKey: ['post', username],
    queryFn: async ({pageParam}) => {
      const data = await fetch(
        `${BASEURL}/api/post/${username}?pageNumber=${pageParam}?take=${take}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      );
      console.log('fetfaf');
      const response = await data.json();
      // console.log({ response: response?.data?.take });
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

export type PostParams = {
  post?: string | undefined | null;
  photo?: string | undefined;
};

export const useAddPost = () => {
  const {username} = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({post, photo}: PostParams) => {
      const data = await fetch(`${BASEURL}/api/post/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({post, photo, userName: username}),
      });
      const response = await data.json();
      console.log('This is uploaded post');
      return response;
    },
    onSuccess: data => {
      // console.log({ onSucessData: data });
      queryClient.invalidateQueries({queryKey: ['all post']});
      queryClient.invalidateQueries({queryKey: ['post']});
    },
  });
};

export const useFetchPostById = (postId: number) => {
  const {username} = useUserContext();
  const id = useState(postId);
  console.log({id});
  console.log('hihi');
  return useQuery({
    queryKey: ['postID', postId],
    queryFn: async () => {
      console.log('getting api');
      const data = await fetch(`${BASEURL}/api/post/get/${id[0]}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const response = await data.json();
      // console.log({ response });
      return response;
    },
  });
};
