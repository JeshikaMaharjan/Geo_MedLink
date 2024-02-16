import {useMutation} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';

const BASEURL = process.env.EXPO_PUBLIC_API_URL;

type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useChangePassword = () => {
  const {username} = useUserContext();
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
      confirmPassword,
    }: ChangePasswordParams) => {
      const data = await fetch(`${BASEURL}/api/change/password`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
          username: 'user1',
        }),
      });

      const response = await data.json();
      if (data.status !== 200) throw new Error(response.error.message[0]);
      console.log({response: response.error.message});
      console.log({response});
      return response;
    },
  });
};
