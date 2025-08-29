import { Sparkles } from 'lucide-react';

interface Tone {
  value: string;
  label: string;
  description: string;
}

interface ToneSelectorProps {
  title: string;
  tones: Tone[];
  selectedTone: string;
  onToneSelect: (tone: string) => void;
}

export function ToneSelector({ title, tones, selectedTone, onToneSelect }: ToneSelectorProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onToneSelect(tone.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedTone === tone.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 bg-white/50 hover:border-slate-300 hover:bg-white/70'
            }`}
          >
            <div className="font-medium text-slate-800">{tone.label}</div>
            <div className="text-sm text-slate-600 mt-1">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}