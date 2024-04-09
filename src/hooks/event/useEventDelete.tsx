import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useDeleteEvent = () => {
  //   const {username} = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: number) => {
      console.log({eventId});
      try {
        const response = await axios.delete(
          `${BASEURL}/event/delete/${eventId}`,
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
      queryClient.invalidateQueries({queryKey: ['event']});
      //   queryClient.invalidateQueries({queryKey: ['post', username]});
    },
  });
};
