
import { useState, useEffect } from "react";
import MoodSelector from "@/components/MoodSelector";
import MoodNote from "@/components/MoodNote";
import MoodChart from "@/components/MoodChart";
import MoodStreak from "@/components/MoodStreak";
import { getMoodColor, getMoodValue, getTodayMood, saveTodayMood, getMoodHistory } from "@/lib/moodUtils";
import { Mood, MoodEntry } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [bgColor, setBgColor] = useState("bg-white");

  // Load today's mood and note if already set
  useEffect(() => {
    const todayMood = getTodayMood();
    if (todayMood) {
      setSelectedMood(todayMood.mood);
      setNote(todayMood.note || "");
      setBgColor(getMoodColor(todayMood.mood));
    }
  }, []);

  // Load mood history for the chart
  useEffect(() => {
    const history = getMoodHistory();
    setMoodHistory(history);
    
    // Calculate streak
    const currentStreak = calculateStreak(history);
    setStreak(currentStreak);
  }, [selectedMood]);

  const calculateStreak = (history: MoodEntry[]): number => {
    let count = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < history.length; i++) {
      const entryDate = new Date(history[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      const dayDifference = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDifference === i) {
        count++;
      } else {
        break;
      }
    }
    
    return count;
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setBgColor(getMoodColor(mood));
    
    // Auto-save when mood is selected
    const success = saveTodayMood(mood, note);
    if (success) {
      toast({
        title: "Mood saved!",
        description: `You're feeling ${mood.toLowerCase()} today.`
      });
      // Refresh history to update chart
      setMoodHistory(getMoodHistory());
    }
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
    // Save if mood is already selected
    if (selectedMood) {
      saveTodayMood(selectedMood, newNote);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgColor} p-4 sm:p-6`}>
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Moodify</h1>
          <p className="text-lg text-gray-700">How are you feeling today?</p>
        </header>

        <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
        
        <MoodNote note={note} onNoteChange={handleNoteChange} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Your week in moods</h2>
          <MoodChart moodHistory={moodHistory} />
        </div>
        
        <div className="mt-6">
          <MoodStreak streak={streak} />
        </div>
      </div>
    </div>
  );
};

export default Index;
