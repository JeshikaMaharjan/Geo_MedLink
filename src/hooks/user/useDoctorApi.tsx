import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
const BASEURL = process.env.EXPO_PUBLIC_API_URL;
export const useFetchDoctor = () => {
  const {username} = useUserContext();
  return useQuery({
    queryKey: ['doctor', username],
    queryFn: async () => {
      const data = await fetch(`${BASEURL}/api/get/doctor/${username}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const response = await data.json();
      // console.log({ response });
      return response;
    },
  });
};

type DoctorParams = {
  NMC: string | undefined;
  degree: string | undefined;
};
export const useDoctor = () => {
  const {username} = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({NMC, degree}: DoctorParams) => {
      console.log('his this trytdhgc');
      const data = await fetch(`${BASEURL}/api/doctor/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userName: username,
          NMC: parseInt(NMC!),
          degree,
        }),
      });
    },
    onError(e) {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['doctor', username]});
    },
  });
};
