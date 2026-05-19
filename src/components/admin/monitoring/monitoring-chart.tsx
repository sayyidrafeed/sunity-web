import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import type { EnergyChartData } from '@/types/energy-monitoring';

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

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
          style={{
            borderColor: color,
            backgroundColor: checked ? color : 'white',
          }}
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
    kwh: d.kwh,
    price: d.price,
    co2: d.co2,
  }));

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
          <div className="flex-1 h-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 60, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F1EF" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#A3A39E',
                    fontSize: 12,
                    fontFamily: 'Plus Jakarta Sans',
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                {showKwh && (
                  <YAxis
                    yAxisId="kwh"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: 'KwH',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 10,
                      style: {
                        fill: '#F7C85C',
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    }}
                    tick={{
                      fill: '#F7C85C',
                      fontSize: 12,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: 500,
                    }}
                  />
                )}
                {showPrice && (
                  <YAxis
                    yAxisId="price"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: 'IDR',
                      angle: 90,
                      position: 'insideRight',
                      offset: 10,
                      style: {
                        fill: '#2F6B3F',
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    }}
                    tick={{
                      fill: '#2F6B3F',
                      fontSize: 12,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: 500,
                    }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                )}
                {showCo2 && (
                  <YAxis
                    yAxisId="co2"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: 'CO₂ (Kg)',
                      angle: 90,
                      position: 'outside',
                      offset: 10,
                      style: {
                        fill: '#708090',
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                    }}
                    tick={{
                      fill: '#708090',
                      fontSize: 12,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: 500,
                    }}
                  />
                )}
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
                                Produksi: <strong>{dataPoint.kwh} KwH</strong>
                              </span>
                            </div>
                          )}
                          {showPrice && (
                            <div className="flex items-center gap-[8px]">
                              <div className="w-[8px] h-[8px] rounded-full bg-[#2F6B3F]" />
                              <span className="font-jakarta text-[12px] text-[#5A5A57]">
                                Hemat: <strong>{idrFormatter.format(dataPoint.price)}</strong>
                              </span>
                            </div>
                          )}
                          {showCo2 && (
                            <div className="flex items-center gap-[8px]">
                              <div className="w-[8px] h-[8px] rounded-full bg-[#708090]" />
                              <span className="font-jakarta text-[12px] text-[#5A5A57]">
                                CO<sub>2</sub>: <strong>{dataPoint.co2} Kg</strong>
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
                    yAxisId="kwh"
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
                    yAxisId="price"
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
                    yAxisId="co2"
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
