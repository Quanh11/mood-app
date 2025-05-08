
import { Badge } from "@/components/ui/badge";

interface MoodStreakProps {
  streak: number;
}

const MoodStreak = ({ streak }: MoodStreakProps) => {
  if (streak === 0) return null;
  
  return (
    <div className="bg-white/80 rounded-xl p-4 text-center">
      <Badge variant="secondary" className="mb-2 animate-pulse-light">
        {streak} day{streak !== 1 ? "s" : ""} streak!
      </Badge>
      <p className="text-gray-700">
        {streak === 1
          ? "You've tracked your mood today. Keep it up!"
          : `You've tracked your mood ${streak} days in a row. Great job!`}
      </p>
    </div>
  );
};

export default MoodStreak;
