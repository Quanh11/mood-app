
import { Mood } from "@/lib/types";
import { Smile, Frown, Angry, Meh, Star } from "lucide-react";

type MoodOption = {
  mood: Mood;
  icon: React.ReactNode;
  label: string;
};

const moodOptions: MoodOption[] = [
  { mood: "Happy", icon: <Smile className="h-8 w-8" />, label: "Happy 😊" },
  { mood: "Sad", icon: <Frown className="h-8 w-8" />, label: "Sad 😢" },
  { mood: "Stressed", icon: <Angry className="h-8 w-8" />, label: "Stressed 😠" },
  { mood: "Calm", icon: <Meh className="h-8 w-8" />, label: "Calm 😌" },
  { mood: "Excited", icon: <Star className="h-8 w-8" />, label: "Excited 😍" },
];

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {moodOptions.map((option) => (
        <button
          key={option.mood}
          onClick={() => onMoodSelect(option.mood)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all 
            ${
              selectedMood === option.mood
                ? "bg-white/90 shadow-lg scale-105"
                : "bg-white/50 hover:bg-white/70"
            }`}
          aria-label={`Select ${option.mood} mood`}
        >
          <div className="mb-1">{option.icon}</div>
          <span className="text-xs font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
