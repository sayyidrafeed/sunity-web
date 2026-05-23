import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EnergyData, EnergyKPI, EnergyChartData, EnergyDataManualInputPayload } from '@/types/energy-monitoring';
import {
  postAdminCampaignsByIdEnergy,
  putAdminCampaignsByIdEnergy,
  deleteAdminCampaignsByIdEnergyByMonth,
  postAdminCampaignsByIdEnergyBulk,
} from '@/lib/api/generated/sdk.gen';
import { getAdminCampaignsOptions, getAdminCampaignsByIdEnergyOptions } from '@/lib/api/generated/@tanstack/react-query.gen';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export function useAdminCampaignId() {
  return useQuery({
    ...getAdminCampaignsOptions({ query: { limit: 1 } }),
    select: (res) => res.data?.[0]?.id,
  });
}

export function useEnergyMonitoring() {
  const { data: campaignId, isLoading: isLoadingCampaignId, isError: isErrorCampaignId } = useAdminCampaignId();

  const energyQuery = useQuery({
    ...getAdminCampaignsByIdEnergyOptions({ path: { id: campaignId || '' } }),
    enabled: !!campaignId,
  });

  const isLoading = isLoadingCampaignId || energyQuery.isLoading;
  const isError = isErrorCampaignId || energyQuery.isError;

  const data = energyQuery.data
    ? (() => {
        const apiData = energyQuery.data;
        const kpi: EnergyKPI = {
          totalPriceSaved: apiData.summary?.totalIdrSaved || 0,
          totalKwhProduced: apiData.summary?.totalKwhProduced || 0,
          totalCo2Reduced: apiData.summary?.totalKgCo2Reduced || 0,
        };

        const tableData: EnergyData[] = (apiData.data || []).map((d) => {
          const [yearStr, monthStr] = d.month.split('-');
          return {
            id: d.id,
            month: parseInt(monthStr, 10),
            year: parseInt(yearStr, 10),
            kwh: d.kwhProduced,
            price: d.idrSaved,
            co2: d.kgCo2Reduced,
          };
        });

        // Sort tableData ascending by year and month for consistent chronological order
        tableData.sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return a.month - b.month;
        });

        const chartData: EnergyChartData[] = tableData.map((d) => ({
          name: MONTH_NAMES[d.month - 1] || '',
          kwh: d.kwh,
          price: d.price,
          co2: d.co2,
        }));

        return {
          kpi,
          chartData,
          tableData,
        };
      })()
    : undefined;

  return {
    data,
    isLoading,
    isError,
  };
}

export function useDeleteEnergyData() {
  const queryClient = useQueryClient();
  const { data: campaignId } = useAdminCampaignId();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!campaignId) throw new Error('Campaign ID is required');
      const cached = queryClient.getQueryData<{ tableData: EnergyData[] }>(['energy-monitoring']);
      const item = cached?.tableData.find((d) => d.id === id);
      if (!item) throw new Error('Item not found in cache');
      const monthStr = `${item.year}-${String(item.month).padStart(2, '0')}`;

      await deleteAdminCampaignsByIdEnergyByMonth({
        path: { id: campaignId, month: monthStr },
        throwOnError: true,
      });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useUpdateEnergyData() {
  const queryClient = useQueryClient();
  const { data: campaignId } = useAdminCampaignId();

  return useMutation({
    mutationFn: async (payload: EnergyData) => {
      if (!campaignId) throw new Error('Campaign ID is required');
      const monthStr = `${payload.year}-${String(payload.month).padStart(2, '0')}`;

      await putAdminCampaignsByIdEnergy({
        path: { id: campaignId },
        body: {
          month: monthStr,
          kwhProduced: payload.kwh,
          idrSaved: payload.price,
          kgCo2Reduced: payload.co2,
        },
        throwOnError: true,
      });
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useCreateEnergyDataManual() {
  const queryClient = useQueryClient();
  const { data: campaignId } = useAdminCampaignId();

  return useMutation({
    mutationFn: async (payload: EnergyDataManualInputPayload) => {
      if (!campaignId) throw new Error('Campaign ID is required');
      const monthStr = `${payload.year}-${String(payload.month).padStart(2, '0')}`;

      const { data } = await postAdminCampaignsByIdEnergy({
        path: { id: campaignId },
        body: {
          month: monthStr,
          kwhProduced: payload.kwh,
          idrSaved: payload.price,
          kgCo2Reduced: payload.co2,
        },
        throwOnError: true,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useCreateEnergyDataCsv() {
  const queryClient = useQueryClient();
  const { data: campaignId } = useAdminCampaignId();

  return useMutation({
    mutationFn: async (data: Omit<EnergyData, 'id' | 'year'>[]) => {
      if (!campaignId) throw new Error('Campaign ID is required');
      const year = new Date().getFullYear();
      const records = data.map((item) => {
        const monthStr = `${year}-${String(item.month).padStart(2, '0')}`;
        return {
          month: monthStr,
          kwhProduced: item.kwh,
          idrSaved: item.price,
          kgCo2Reduced: item.co2,
        };
      });

      const { data: responseData } = await postAdminCampaignsByIdEnergyBulk({
        path: { id: campaignId },
        body: { records },
        throwOnError: true,
      });
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}
