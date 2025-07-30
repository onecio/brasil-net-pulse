import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface LatencyChartProps {
  data: Array<{ time: string; value: number }>;
}

const LatencyChart: React.FC<LatencyChartProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Histórico de Latência</CardTitle>
      </CardHeader>
      <CardContent className="h-[100px] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value: number) => [`${value} ms`, 'Latência']}
              labelFormatter={(label: string) => `Hora: ${label}`}
            />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LatencyChart;
