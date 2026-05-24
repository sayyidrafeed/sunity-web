import { useQuery } from '@tanstack/react-query';
import { getAdminCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';

export function useAdminCampaignsQuery() {
  return useQuery(getAdminCampaignsOptions());
}
