import { Mail, Copy, Check } from 'lucide-react';

interface OutputCardProps {
  title: string;
  content: string;
  onCopy: () => void;
  copied: boolean;
  emptyStateMessage: string;
  emptyStateSubMessage: string;
}

export function OutputCard({ 
  title, 
  content, 
  onCopy, 
  copied, 
  emptyStateMessage, 
  emptyStateSubMessage 
}: OutputCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 min-h-96">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">{title}</h2>
        </div>
        
        {content && (
          <button
            onClick={onCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
      
      {content ? (
        <div className="bg-white/80 rounded-xl p-6 border border-slate-200">
          <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
            {content}
          </pre>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <Mail className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg text-center">{emptyStateMessage}</p>
          <p className="text-sm mt-2 text-center">{emptyStateSubMessage}</p>
        </div>
      )}
    </div>
  );
}