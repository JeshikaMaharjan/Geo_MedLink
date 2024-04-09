import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useState} from 'react';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useFetchPost = () => {
  console.log('This is fetching api');
  const {token} = useUserContext();
  console.log({token});

  return useInfiniteQuery({
    queryKey: ['post'],
    queryFn: async ({pageParam}) => {
      try {
        const response = await axios.get(
          `${BASEURL}/post/all?pageNumber=${pageParam}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
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

export const useFetchUserPost = (username: string) => {
  console.log('This is fetching post');
  const [take, setValue] = useState(5);

  return useInfiniteQuery({
    queryKey: ['post', username],
    queryFn: async ({pageParam}) => {
      try {
        const response = await axios.get(
          `${BASEURL}/post/${username}?pageNumber=${pageParam}?take=${take}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
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

export type PostParams = {
  post?: string | undefined | null;
  photo?: string | undefined;
};

export const useAddPost = () => {
  const {username} = useUserContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({post, photo}: PostParams) => {
      try {
        const response = await axios.post(`${BASEURL}/post/create`, {
          post,
          photo,
          userName: username,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['all post']});
      queryClient.invalidateQueries({queryKey: ['post']});
    },
  });
};

export const useFetchPostById = (postId: number) => {
  const {username} = useUserContext();
  const [id] = useState(postId);
  return useQuery({
    queryKey: ['postID', postId],
    queryFn: async () => {
      console.log('getting api');
      try {
        const response = await axios.get(`${BASEURL}/post/get/${id}`, {
          headers: {'Content-Type': 'application/json'},
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
