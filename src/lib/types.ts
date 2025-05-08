
export type Mood = "Happy" | "Sad" | "Stressed" | "Calm" | "Excited";

export interface MoodEntry {
  date: string;
  mood: Mood;
  note: string;
}
