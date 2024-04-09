import {useMutation} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

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
      try {
        const response = await axios.post(
          `${BASEURL}/change/password`,
          {
            currentPassword,
            newPassword,
            confirmPassword,
            username, // You may need to adjust this value based on your requirements
          },
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
