import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
const BASEURL = process.env.EXPO_PUBLIC_API_URL;

type BloodTypeParam = {
  is_donor: boolean;
  blood_Group: string;
};

export const useUpdateBloodDonor = () => {
  const queryClient = useQueryClient();
  const {username} = useUserContext();
  return useMutation({
    mutationFn: async ({is_donor, blood_Group}: BloodTypeParam) => {
      const data = await fetch(`${BASEURL}/api/donor/${username}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          is_donor,
          blood_Group,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user', username]});
    },
  });
};
