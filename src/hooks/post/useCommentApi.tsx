import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {useState} from 'react';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

type PostCommentParams = {
  comment: string;
  postId: number;
};

export const usePostComment = () => {
  const {username} = useUserContext();
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  console.log('this is posting');
  console.log({username});
  return useMutation({
    mutationFn: async ({comment, postId}: PostCommentParams) => {
      try {
        const response = await axios.post(
          `http://${BASEURL}/api/comment`,
          {
            comment,
            userName: username,
            postId,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        setId(postId);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['comment', id]});
    },
  });
};

export const useFetchComment = (postId: number) => {
  return useInfiniteQuery({
    queryKey: ['comment', postId],
    queryFn: async ({pageParam}) => {
      try {
        const response = await axios.get(
          `http://${BASEURL}/api/comment/${postId}?pageNumber=${pageParam}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        cosole.log(error);
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
