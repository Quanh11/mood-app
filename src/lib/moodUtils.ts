
import { Mood, MoodEntry } from "./types";

// Convert moods to colors
export const getMoodColor = (mood: Mood): string => {
  switch (mood) {
    case "Happy":
      return "bg-yellow-100";
    case "Sad":
      return "bg-blue-100";
    case "Stressed":
      return "bg-red-100";
    case "Calm":
      return "bg-green-100";
    case "Excited":
      return "bg-purple-100";
    default:
      return "bg-white";
  }
};

// Convert moods to numeric values for the chart
export const getMoodValue = (mood: Mood): number => {
  switch (mood) {
    case "Excited":
      return 5;
    case "Happy":
      return 4;
    case "Calm":
      return 3;
    case "Stressed":
      return 2;
    case "Sad":
      return 1;
    default:
      return 0;
  }
};

// Save today's mood to local storage
export const saveTodayMood = (mood: Mood, note: string): boolean => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing entries
    const entries: MoodEntry[] = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    // Check if we already have an entry for today
    const todayIndex = entries.findIndex((entry) => 
      entry.date.split('T')[0] === today
    );
    
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood,
      note
    };
    
    // Replace today's entry if it exists, otherwise add new entry
    if (todayIndex !== -1) {
      entries[todayIndex] = newEntry;
    } else {
      entries.unshift(newEntry); // Add to beginning of array
    }
    
    // Store sorted by date (newest first)
    localStorage.setItem('moodHistory', JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error("Error saving mood:", error);
    return false;
  }
};

// Get today's mood entry if it exists
export const getTodayMood = (): MoodEntry | null => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const entries: MoodEntry[] = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    return entries.find((entry) => entry.date.split('T')[0] === today) || null;
  } catch (error) {
    console.error("Error getting today's mood:", error);
    return null;
  }
};

// Get mood history for the past 7 days
export const getMoodHistory = (): MoodEntry[] => {
  try {
    const entries: MoodEntry[] = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    // Sort by date (newest first)
    return entries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error getting mood history:", error);
    return [];
  }
};
