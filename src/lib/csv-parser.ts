import type { EnergyData } from '@/types/energy-monitoring';

export interface ParseResult {
  success: boolean;
  data: Omit<EnergyData, 'id' | 'year'>[];
  errors: ParseError[];
  skippedRows: number[];
}

export interface ParseError {
  line: number;
  message: string;
}

export function parseMonitoringCsv(text: string): ParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '');
  if (lines.length < 2) {
    throw new Error('File CSV kosong atau tidak memiliki data.');
  }

  const headers = lines[0]
    .toLowerCase()
    .split(',')
    .map((h) => h.trim());
  const required = ['month', 'kwh_produced', 'idr_saved', 'kg_co2_reduced'];
  const missing = required.filter((col) => !headers.includes(col));

  if (missing.length > 0) {
    throw new Error(`Kolom wajib tidak ditemukan: ${missing.join(', ')}`);
  }

  const monthIdx = headers.indexOf('month');
  const kwhIdx = headers.indexOf('kwh_produced');
  const priceIdx = headers.indexOf('idr_saved');
  const co2Idx = headers.indexOf('kg_co2_reduced');

  const parsedRows: Omit<EnergyData, 'id' | 'year'>[] = [];
  const errors: ParseError[] = [];
  const skippedRows: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',').map((c) => c.trim());
    if (columns.length < headers.length) {
      skippedRows.push(i + 1);
      errors.push({
        line: i + 1,
        message: `Jumlah kolom kurang dari yang diharapkan (${columns.length}/${headers.length})`,
      });
      continue;
    }

    const month = Number(columns[monthIdx]);
    const kwh = Number(columns[kwhIdx]);
    const price = Number(columns[priceIdx]);
    const co2 = Number(columns[co2Idx]);

    if (isNaN(month) || month < 1 || month > 12) {
      errors.push({
        line: i + 1,
        message: `Bulan harus berupa angka 1-12`,
      });
      continue;
    }
    if (isNaN(kwh) || kwh <= 0) {
      errors.push({
        line: i + 1,
        message: `kwh_produced harus berupa angka positif`,
      });
      continue;
    }
    if (isNaN(price) || price <= 0) {
      errors.push({
        line: i + 1,
        message: `idr_saved harus berupa angka positif`,
      });
      continue;
    }
    if (isNaN(co2) || co2 <= 0) {
      errors.push({
        line: i + 1,
        message: `kg_co2_reduced harus berupa angka positif`,
      });
      continue;
    }

    parsedRows.push({ month, kwh, price, co2 });
  }

  return {
    success: errors.length === 0,
    data: parsedRows,
    errors,
    skippedRows,
  };
}
