import { User } from 'lucide-react';

interface ContextSectionProps {
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showContext: boolean;
  onToggle: () => void;
  hideText: string;
  showText: string;
}

export function ContextSection({ 
  title, 
  description, 
  placeholder, 
  value, 
  onChange, 
  showContext, 
  onToggle, 
  hideText, 
  showText 
}: ContextSectionProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-slate-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">{title}</h2>
        </div>
        <button
          onClick={onToggle}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          {showContext ? hideText : showText}
        </button>
      </div>
      
      {showContext && (
        <>
          <p className="text-slate-600 mb-4">
            {description}
          </p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400"
          />
        </>
      )}
    </div>
  );
}