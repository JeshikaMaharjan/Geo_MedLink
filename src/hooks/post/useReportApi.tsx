import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASEURL} from '@env';

export const useReportPost = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      try {
        const response = await axios.put(
          `${BASEURL}/post/report/${postId}`,

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
  });
};
