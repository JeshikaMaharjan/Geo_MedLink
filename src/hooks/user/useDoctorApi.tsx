import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../context/userContext';
import axios from 'axios';
import {BASEURL} from '@env';

export const useFetchDoctor = () => {
  const {username} = useUserContext();

  return useQuery({
    queryKey: ['doctor', username],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/get/doctor/${username}`, {
          headers: {'Content-Type': 'application/json'},
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
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
      try {
        const response = await axios.put(
          `${BASEURL}/doctor/update`,
          {
            userName: username,
            NMC: parseInt(NMC!),
            degree,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onError: e => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['doctor', username]});
    },
  });
};
