import { useQuery, useInfiniteQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { picklesRequests } from '@/apis/pickle.api';
import { Coordinates, CreatePickleData, CreateReviewData } from '@/apis/types/pickles.type';
import toast from 'react-hot-toast';

interface PICKLE_DATA {

}

// Domain: MOST_IMPORTANT
export const useCreatePickleMutation = (pickleData: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await picklesRequests.createPickle(pickleData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pickles'] }),
    onError: error => {
      console.error(error);
      toast.error('피클 생성에 실패했습니다.');
    },
  });
};

export const useGetInfinitePickles = () => {
  return useQuery({
    queryKey: ['pickles'],
    queryFn: async () => await picklesRequests.get(),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
  });
};

export const useGetNearbyPickles = (location: Coordinates | null) => {
  return useQuery({
    queryKey: ['pickles', 'nearby'],

    queryFn: async () => await picklesRequests.getNearby(location),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
  });
};

export const useGetSpecialPickles = (type: 'hotTime' | 'popular') => {
  if (type === 'hotTime') {
    return useSuspenseQuery({
      queryKey: ['pickles', 'hotTime'],
      queryFn: async () => await picklesRequests.getHotTime(),
      select: data => data.data,

      refetchOnWindowFocus: true, // 포커스 될 때 재요청
      refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
      refetchInterval: 5 * 60 * 1000,
    });
  } else {
    return useSuspenseQuery({
      queryKey: ['pickles', 'popular'],
      queryFn: async () => await picklesRequests.getPopular(),
      select: data => data.data,
    });
  }
};

export const useGetPickelDetail = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', pickleId],
    queryFn: async () => {
      const { data } = await picklesRequests.getPickleDetail(pickleId);
      return data;
    },
  });
};

export const useCreateReviewMutation = (pickleId: string, handleSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: CreateReviewData) => {
      console.log('리뷰데이터', reviewData);
      return picklesRequests.createReview(pickleId, reviewData);
    },
    onSuccess: () => {
      toast('리뷰 작성이 완료되었어요!');
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }, //쿼리키를 어떻게 할까요~
    onError: error => {
      console.error(error);
      toast.error('리뷰 작성에 실패했습니다.');
    },
  });
};
