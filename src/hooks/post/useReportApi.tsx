import {useMutation} from '@tanstack/react-query';
const BASEURL = process.env.EXPO_PUBLIC_API_URL;
export const useReportPost = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      const data = await fetch(`${BASEURL}/api/post/report/${postId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      });
      const response = await data.json();
      if (data.status !== 200) throw new Error(response.error.message[0]);
      return response;
    },
  });
};
