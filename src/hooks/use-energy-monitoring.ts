import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EnergyData, EnergyKPI, EnergyChartData, EnergyDataManualInputPayload } from '@/types/energy-monitoring';

// Mock Data
const MOCK_KPI: EnergyKPI = {
  totalPriceSaved: 750000,
  totalKwhProduced: 120,
  totalCo2Reduced: 9.2,
};

let MOCK_DATA: EnergyData[] = [
  { id: '1', month: 1, year: 2026, kwh: 110, price: 110000, co2: 25 },
  { id: '2', month: 2, year: 2026, kwh: 115, price: 115000, co2: 27 },
  { id: '3', month: 3, year: 2026, kwh: 90, price: 90000, co2: 20 },
  { id: '4', month: 4, year: 2026, kwh: 130, price: 130000, co2: 32 },
  { id: '5', month: 5, year: 2026, kwh: 125, price: 125000, co2: 30 },
  { id: '6', month: 6, year: 2026, kwh: 80, price: 80000, co2: 18 },
  { id: '7', month: 7, year: 2026, kwh: 140, price: 140000, co2: 35 },
  { id: '8', month: 8, year: 2026, kwh: 140, price: 140000, co2: 35 },
  { id: '9', month: 9, year: 2026, kwh: 140, price: 140000, co2: 35 },
  { id: '10', month: 10, year: 2026, kwh: 140, price: 140000, co2: 35 },
  { id: '11', month: 11, year: 2026, kwh: 110, price: 110000, co2: 25 },
  { id: '12', month: 12, year: 2026, kwh: 120, price: 120000, co2: 30 },
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export function useEnergyMonitoring() {
  return useQuery({
    queryKey: ['energy-monitoring'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const chartData: EnergyChartData[] = MOCK_DATA.map((d) => ({
        name: MONTH_NAMES[d.month - 1],
        kwh: d.kwh,
        price: d.price,
        co2: d.co2,
      }));

      return {
        kpi: MOCK_KPI,
        chartData,
        tableData: MOCK_DATA, // Using the same mock data for the table
      };
    },
  });
}

export function useDeleteEnergyData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Remove item locally
      MOCK_DATA = MOCK_DATA.filter((d) => d.id !== id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useUpdateEnergyData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EnergyData) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Update item locally
      MOCK_DATA = MOCK_DATA.map((d) => (d.id === data.id ? data : d));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useCreateEnergyDataManual() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EnergyDataManualInputPayload) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Add item locally
      const newItem = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
      };
      MOCK_DATA = [...MOCK_DATA, newItem];
      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}

export function useCreateEnergyDataCsv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<EnergyData, 'id' | 'year'>[]) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const year = new Date().getFullYear();
      const newItems = data.map((item) => ({
        ...item,
        year,
        id: Math.random().toString(36).substring(2, 9),
      }));
      MOCK_DATA = [...MOCK_DATA, ...newItems];
      return newItems;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-monitoring'] });
    },
  });
}
