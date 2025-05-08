
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MoodEntry } from "@/lib/types";
import { getMoodValue } from "@/lib/moodUtils";

interface MoodChartProps {
  moodHistory: MoodEntry[];
}

const MoodChart = ({ moodHistory }: MoodChartProps) => {
  const chartData = useMemo(() => {
    // Create array of last 7 days
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Format as YYYY-MM-DD for comparison
      const formattedDate = date.toISOString().split('T')[0];
      
      // Find mood entry for this day
      const entry = moodHistory.find(
        (e) => e.date.split('T')[0] === formattedDate
      );
      
      days.push({
        name: new Date(formattedDate).toLocaleDateString(undefined, {weekday: 'short'}),
        moodValue: entry ? getMoodValue(entry.mood) : null,
        mood: entry ? entry.mood : null,
        formattedDate,
      });
    }
    
    return days;
  }, [moodHistory]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow text-sm">
          <p>{data.formattedDate}</p>
          <p className="font-bold">{data.mood || "No entry"}</p>
        </div>
      );
    }
    return null;
  };

  // Empty state
  if (moodHistory.length === 0) {
    return (
      <div className="bg-white/80 rounded-xl p-6 text-center">
        <p className="text-gray-500">No mood data yet. Start tracking today!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-xl p-4 h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[1, 5]}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => {
              const moods = ["Sad", "Stressed", "Calm", "Happy", "Excited"];
              return moods[value - 1] || "";
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="moodValue"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 4, fill: "#6366F1" }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
