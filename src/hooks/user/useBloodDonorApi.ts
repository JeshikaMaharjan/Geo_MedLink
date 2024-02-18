import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

type BloodTypeParam = {
  is_donor: boolean;
  blood_Group: string;
};

export const useUpdateBloodDonor = () => {
  const queryClient = useQueryClient();
  const {username} = useUserContext();

  return useMutation({
    mutationFn: async ({is_donor, blood_Group}: BloodTypeParam) => {
      try {
        const response = await axios.put(
          `${BASEURL}/api/donor/${username}`,
          {
            is_donor,
            blood_Group,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user', username]});
    },
  });
};
