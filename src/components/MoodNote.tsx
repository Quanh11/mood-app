
import { Textarea } from "@/components/ui/textarea";

interface MoodNoteProps {
  note: string;
  onNoteChange: (note: string) => void;
}

const MoodNote = ({ note, onNoteChange }: MoodNoteProps) => {
  return (
    <div className="mt-6">
      <label
        htmlFor="mood-note"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        How was your day? (Optional)
      </label>
      <Textarea
        id="mood-note"
        placeholder="Write a note about your day..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        className="w-full bg-white/80 border-0 focus-visible:ring-2 focus-visible:ring-offset-1"
      />
    </div>
  );
};

export default MoodNote;
