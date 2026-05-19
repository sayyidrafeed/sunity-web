export interface EnergyData {
  id: string;
  month: number; // 1-12
  year: number;
  kwh: number;
  price: number;
  co2: number;
}

export interface EnergyKPI {
  totalPriceSaved: number;
  totalKwhProduced: number;
  totalCo2Reduced: number;
}

export interface EnergyChartData {
  name: string; // e.g. "Jan", "Feb"
  kwh: number;
  price: number;
  co2: number;
}
