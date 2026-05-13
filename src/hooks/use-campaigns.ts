import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getCampaignsOptions } from '@/lib/api/generated/@tanstack/react-query.gen';
import { useCampaignFilterStore } from '@/stores/campaign-filter-store';
import { useDebounce } from '@/hooks/use-debounce';

export function useCampaigns() {
  const { search, city, type, status, page, limit } = useCampaignFilterStore();
  const debouncedSearch = useDebounce(search, 300);

  const query = useQuery({
    ...getCampaignsOptions({
      query: {
        page,
        limit,
        search: debouncedSearch || undefined,
        city: city || undefined,
        type: type || undefined,
        status: status || undefined,
      },
    }),
    placeholderData: keepPreviousData,
  });

  return {
    campaigns: query.data?.data ?? [],
    pagination: query.data?.pagination,
    filters: query.data?.filters,
    isLoading: query.isLoading,
    isPlaceholderData: query.isPlaceholderData,
    error: query.error,
  };
}
