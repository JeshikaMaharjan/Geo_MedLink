import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useDeletePost = () => {
  const {username} = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: number) => {
      console.log({postId});
      try {
        const response = await axios.delete(
          `${BASEURL}/post/delete/${postId}`,
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
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['post']});
      queryClient.invalidateQueries({queryKey: ['post', username]});
    },
  });
};
