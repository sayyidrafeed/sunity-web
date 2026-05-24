import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchAdminCampaignsByIdStatus, deleteAdminCampaignsById } from '@/lib/api/generated/sdk.gen';

type CampaignStatus = 'DRAFT' | 'AKTIF' | 'INSTALASI' | 'SELESAI' | 'ARCHIVED';

export function useUpdateCampaignStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, status }: { campaignId: string; status: CampaignStatus }) => {
      const response = await patchAdminCampaignsByIdStatus({
        throwOnError: true,
        path: { id: campaignId },
        body: { status },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAdminCampaigns'],
      });
    },
  });
}

export function useDeleteCampaignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignId: string) => {
      const response = await deleteAdminCampaignsById({
        throwOnError: true,
        path: { id: campaignId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAdminCampaigns'],
      });
    },
  });
}
