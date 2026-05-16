import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface EnergyRingChartProps {
  progressPercent: number;
}

export function EnergyRingChart({ progressPercent }: EnergyRingChartProps) {
  // Data for the outer ring (Orange)
  const outerData = [
    { name: 'Progress', value: progressPercent },
    { name: 'Remaining', value: 100 - progressPercent },
  ];

  // Data for the inner ring (Green) - Static 70% as per previous design
  const innerData = [
    { name: 'Progress', value: 70 },
    { name: 'Remaining', value: 30 },
  ];

  return (
    <div className="relative h-64 w-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Outer Ring */}
          <Pie
            data={outerData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#f59e0b" />
            <Cell fill="#F3F4F6" />
          </Pie>

          {/* Inner Ring */}
          <Pie
            data={innerData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#059669" />
            <Cell fill="#F3F4F6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
