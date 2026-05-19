import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import type { EnergyChartData } from '@/types/energy-monitoring';

interface LegendCheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  color: string;
}

function LegendCheckbox({ label, checked, onChange, color }: LegendCheckboxProps) {
  return (
    <label className="flex items-center gap-[8px] cursor-pointer select-none">
      <div className="relative flex items-center justify-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div
          style={{ borderColor: color, backgroundColor: checked ? color : 'white' }}
          className="w-[18px] h-[18px] border-2 rounded-[4px] flex items-center justify-center transition-colors"
        >
          {checked && (
            <svg className="w-[12px] h-[12px] text-white fill-current" viewBox="0 0 20 20">
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <span className="font-jakarta font-medium text-[14px] leading-[18px] text-[#5A5A57]">{label}</span>
    </label>
  );
}

interface MonitoringChartProps {
  data: EnergyChartData[];
}

export function MonitoringChart({ data }: MonitoringChartProps) {
  const [showKwh, setShowKwh] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showCo2, setShowCo2] = useState(true);

  const chartData = data.map((d) => ({
    name: d.name,
    rawKwh: d.kwh,
    rawPrice: d.price,
    rawCo2: d.co2,
    kwh: d.kwh * 3.2,
    price: d.price / 240,
    co2: d.co2 * 13,
  }));

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Card className="border border-[#E5E5E3] bg-white rounded-[24px] shadow-none">
      <CardContent className="p-[24px] flex flex-col gap-[24px]">
        <div className="flex items-center gap-[24px]">
          <LegendCheckbox label="Produksi KwH" checked={showKwh} onChange={() => setShowKwh(!showKwh)} color="#F7C85C" />
          <LegendCheckbox label="Hemat Biaya (IDR)" checked={showPrice} onChange={() => setShowPrice(!showPrice)} color="#2F6B3F" />
          <LegendCheckbox
            label={
              <span>
                Pengurangan CO<sub>2</sub>
              </span>
            }
            checked={showCo2}
            onChange={() => setShowCo2(!showCo2)}
            color="#708090"
          />
        </div>

        <div className="flex items-stretch gap-[16px] h-[320px]">
          <div className="flex flex-col justify-between py-[12px] text-[12px] font-semibold text-[#A3A39E] font-jakarta">
            <span>IDR</span>
            <span>KwH</span>
            <span>
              CO<sub>2</sub>
            </span>
          </div>

          <div className="flex-1 h-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F1EF" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A3A39E', fontSize: 12, fontFamily: 'Plus Jakarta Sans', fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  orientation="right"
                  domain={[100, 700]}
                  ticks={[100, 200, 300, 400, 500, 600, 700]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A3A39E', fontSize: 12, fontFamily: 'Plus Jakarta Sans', fontWeight: 500 }}
                  dx={10}
                />
                <Tooltip
                  cursor={{ stroke: '#F1F1EF', strokeWidth: 1 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const dataPoint = payload[0].payload;
                      return (
                        <div className="bg-white border border-[#E5E5E3] p-[12px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-[6px]">
                          <p className="font-jakarta font-semibold text-[14px] text-[#1F1F1D] mb-[2px]">{label}</p>
                          {showKwh && (
                            <div className="flex items-center gap-[8px]">
                              <div className="w-[8px] h-[8px] rounded-full bg-[#F7C85C]" />
                              <span className="font-jakarta text-[12px] text-[#5A5A57]">
                                Produksi: <strong>{dataPoint.rawKwh} KwH</strong>
                              </span>
                            </div>
                          )}
                          {showPrice && (
                            <div className="flex items-center gap-[8px]">
                              <div className="w-[8px] h-[8px] rounded-full bg-[#2F6B3F]" />
                              <span className="font-jakarta text-[12px] text-[#5A5A57]">
                                Hemat: <strong>{formatIDR(dataPoint.rawPrice)}</strong>
                              </span>
                            </div>
                          )}
                          {showCo2 && (
                            <div className="flex items-center gap-[8px]">
                              <div className="w-[8px] h-[8px] rounded-full bg-[#708090]" />
                              <span className="font-jakarta text-[12px] text-[#5A5A57]">
                                CO<sub>2</sub>: <strong>{dataPoint.rawCo2} Kg</strong>
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {showKwh && (
                  <Line
                    type="monotone"
                    dataKey="kwh"
                    stroke="#F7C85C"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#F7C85C' }}
                  />
                )}
                {showPrice && (
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2F6B3F"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2F6B3F' }}
                  />
                )}
                {showCo2 && (
                  <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="#708090"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#708090' }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
