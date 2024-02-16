import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const {username} = useUserContext();
  return useMutation({
    mutationFn: async (postId: number) => {
      const data = await fetch(
        `${BASEURL}/api/post/like/${postId}/${username}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
        },
      );
      const response = await data.json();
      if (data.status !== 200) throw new Error(response.error.message[0]);
      return response;
    },
    onError: e => {
      console.log({e});
    },
    onSuccess: data => {
      // console.log({ response: data.data.id });
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
        // console.log(JSON.stringify({ oldData }, null, 2));
        // console.log(JSON.stringify({ newData }, null, 2));
        // console.log("newdata consoled");
        // console.log(oldData?.pages);
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
        // console.log(JSON.stringify({ oldData }, null, 2));
        // console.log(JSON.stringify({ newData }, null, 2));
        // console.log("newdata consoled");
        // console.log(oldData?.pages);
        return {
          ...oldData,
          pages: newData,
        };
      });
    },
  });
};
