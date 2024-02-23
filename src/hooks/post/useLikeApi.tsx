import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const {username} = useUserContext();
  return useMutation({
    mutationFn: async (postId: number) => {
      try {
        const response = await axios.put(
          `http://${BASEURL}/api/post/like/${postId}/${username}`,
          null,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        if (response.status !== 200)
          throw new Error(response.data.error.message[0]);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onError: e => {
      console.log({e});
    },
    onSuccess: data => {
      queryClient.setQueryData(['post'], (oldData: any) => {
        console.log('i have entered set query');
        const newData = oldData?.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.map((item: any) => {
              if (item.id === data.data.id)
                return {
                  ...item,
                  isLiked: item.isLiked === '0' ? '1' : '0',
                };
              return item;
            }),
          },
        }));
        return {
          ...oldData,
          pages: newData,
        };
      });
      queryClient.setQueryData(['post', username], (oldData: any) => {
        console.log('i have entered set query');
        const newData = oldData?.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.map((item: any) => {
              if (item.id === data.data.id)
                return {
                  ...item,
                  isLiked: item.isLiked === '0' ? '1' : '0',
                };
              return item;
            }),
          },
        }));
        return {
          ...oldData,
          pages: newData,
        };
      });
    },
  });
};
