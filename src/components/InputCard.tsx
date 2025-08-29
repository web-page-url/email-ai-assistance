import { MessageSquare } from 'lucide-react';

interface InputCardProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  tip?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  rows?: number;
}

export function InputCard({ 
  title, 
  value, 
  onChange, 
  placeholder, 
  tip, 
  onKeyDown, 
  rows = 5 
}: InputCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">{title}</h2>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400"
      />
      
      {tip && (
        <div className="mt-4 text-sm text-slate-500">
          {tip}
        </div>
      )}
    </div>
  );
}