import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {BASEURL} from '@env';
import axios from 'axios';

export type CreateEvent = {
  eventName: string;
  description: string;
  hour: string;
  minute: string;
  selectedImage: string;
  date: string | undefined;
  longitude: string;
  latitude: string;
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventName,
      description,
      hour,
      minute,
      selectedImage,
      date,
      longitude,
      latitude,
    }: CreateEvent) => {
      try {
        const response = await axios.post(
          `http://${BASEURL}/api/event/create`,
          {
            eventName,
            description,
            hour,
            minute,
            photo: selectedImage,
            date,
            longitude,
            latitude,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['event']});
    },
  });
};

export const useFetchEvent = () => {
  console.log('This is fetching events');
  return useInfiniteQuery({
    queryKey: ['event'],
    queryFn: async ({pageParam}) => {
      try {
        const response = await axios.get(
          `http://${BASEURL}/api/event/all?pageNumber=${pageParam}`,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, res) => {
      return lastPage?.data?.next_page;
    },
    select: data => {
      return data;
    },
  });
};
