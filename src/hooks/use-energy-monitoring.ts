import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import {
  getAdminCampaignsByIdEnergyOptions,
  postAdminCampaignsByIdEnergyMutation,
  patchAdminCampaignsByIdEnergyByMonthMutation,
  deleteAdminCampaignsByIdEnergyByMonthMutation,
  postAdminCampaignsByIdEnergyBulkMutation,
} from '@/lib/api/generated/@tanstack/react-query.gen';
import type { EnergyData, EnergyChartData, EnergyDataManualInputPayload } from '@/types/energy-monitoring';
import type { GetAdminCampaignsByIdEnergyResponse } from '@/lib/api/generated/types.gen';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

type MutateOptions = {
  onSuccess?: (...args: unknown[]) => void;
  onError?: (err: unknown) => void;
};

function parseMonthYear(monthStr: string) {
  if (monthStr.includes('-')) {
    const parts = monthStr.split('-');
    return {
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
    };
  }
  if (monthStr.includes('/')) {
    const parts = monthStr.split('/');
    return {
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
    };
  }
  return {
    year: new Date().getFullYear(),
    month: parseInt(monthStr, 10) || 1,
  };
}

export function useEnergyMonitoring() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') || '';

  return useQuery({
    ...getAdminCampaignsByIdEnergyOptions({ path: { id: campaignId } }),
    enabled: !!campaignId,
    select: (data) => {
      const chartData: EnergyChartData[] = data.data.map((d) => {
        const { month } = parseMonthYear(d.month);
        return {
          name: MONTH_NAMES[month - 1] || month.toString(),
          kwh: d.kwhProduced,
          price: d.idrSaved,
          co2: d.kgCo2Reduced,
        };
      });

      const tableData: EnergyData[] = data.data.map((d) => {
        const { month, year } = parseMonthYear(d.month);
        return {
          id: d.id,
          month,
          year,
          kwh: d.kwhProduced,
          price: d.idrSaved,
          co2: d.kgCo2Reduced,
        };
      });

      return {
        kpi: {
          totalPriceSaved: data.summary.totalIdrSaved,
          totalKwhProduced: data.summary.totalKwhProduced,
          totalCo2Reduced: data.summary.totalKgCo2Reduced,
        },
        chartData,
        tableData,
      };
    },
  });
}

export function useDeleteEnergyData() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') || '';

  const deleteMutation = useMutation(deleteAdminCampaignsByIdEnergyByMonthMutation());

  return {
    ...deleteMutation,
    mutate: (id: string, options?: MutateOptions) => {
      const queryKey = ['getAdminCampaignsByIdEnergy', { path: { id: campaignId } }];
      const cachedData = queryClient.getQueryData<GetAdminCampaignsByIdEnergyResponse>(queryKey);
      const record = cachedData?.data?.find((d) => d.id === id);

      if (!record) {
        options?.onError?.(new Error('Record not found'));
        return;
      }

      deleteMutation.mutate(
        {
          path: {
            id: campaignId,
            month: record.month,
          },
        },
        {
          ...options,
          onSuccess: (...args: unknown[]) => {
            queryClient.invalidateQueries({ queryKey });
            options?.onSuccess?.(...args);
          },
        }
      );
    },
  };
}

export function useUpdateEnergyData() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') || '';

  const updateMutation = useMutation(patchAdminCampaignsByIdEnergyByMonthMutation());

  return {
    ...updateMutation,
    mutate: (data: EnergyData, options?: MutateOptions) => {
      const queryKey = ['getAdminCampaignsByIdEnergy', { path: { id: campaignId } }];
      const cachedData = queryClient.getQueryData<GetAdminCampaignsByIdEnergyResponse>(queryKey);
      const originalRecord = cachedData?.data?.find((d) => d.id === data.id);

      if (!originalRecord) {
        options?.onError?.(new Error('Record not found'));
        return;
      }

      const newMonthStr = `${data.year}-${data.month.toString().padStart(2, '0')}`;

      updateMutation.mutate(
        {
          path: {
            id: campaignId,
            month: originalRecord.month,
          },
          body: {
            month: newMonthStr,
            kwhProduced: data.kwh,
            idrSaved: data.price,
            kgCo2Reduced: data.co2,
          },
        },
        {
          ...options,
          onSuccess: (...args: unknown[]) => {
            queryClient.invalidateQueries({ queryKey });
            options?.onSuccess?.(...args);
          },
        }
      );
    },
  };
}

export function useCreateEnergyDataManual() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') || '';

  const createMutation = useMutation(postAdminCampaignsByIdEnergyMutation());

  return {
    ...createMutation,
    mutate: (data: EnergyDataManualInputPayload, options?: MutateOptions) => {
      const queryKey = ['getAdminCampaignsByIdEnergy', { path: { id: campaignId } }];
      const monthStr = `${data.year}-${data.month.toString().padStart(2, '0')}`;

      createMutation.mutate(
        {
          path: {
            id: campaignId,
          },
          body: {
            month: monthStr,
            kwhProduced: data.kwh,
            idrSaved: data.price,
            kgCo2Reduced: data.co2,
          },
        },
        {
          ...options,
          onSuccess: (...args: unknown[]) => {
            queryClient.invalidateQueries({ queryKey });
            options?.onSuccess?.(...args);
          },
        }
      );
    },
  };
}

export function useCreateEnergyDataCsv() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaignId') || '';

  const bulkMutation = useMutation(postAdminCampaignsByIdEnergyBulkMutation());

  return {
    ...bulkMutation,
    mutate: (data: Omit<EnergyData, 'id' | 'year'>[], options?: MutateOptions) => {
      const queryKey = ['getAdminCampaignsByIdEnergy', { path: { id: campaignId } }];
      const year = new Date().getFullYear();
      const records = data.map((d) => {
        const monthStr = `${year}-${d.month.toString().padStart(2, '0')}`;
        return {
          month: monthStr,
          kwhProduced: d.kwh,
          idrSaved: d.price,
          kgCo2Reduced: d.co2,
        };
      });

      bulkMutation.mutate(
        {
          path: {
            id: campaignId,
          },
          body: {
            records,
          },
        },
        {
          ...options,
          onSuccess: (...args: unknown[]) => {
            queryClient.invalidateQueries({ queryKey });
            options?.onSuccess?.(...args);
          },
        }
      );
    },
  };
}
