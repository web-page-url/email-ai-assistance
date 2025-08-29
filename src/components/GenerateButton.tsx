import { Send } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  loadingText: string;
  buttonText: string;
}

export function GenerateButton({ 
  onClick, 
  disabled, 
  isLoading, 
  loadingText, 
  buttonText 
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          {loadingText}
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          {buttonText}
        </>
      )}
    </button>
  );
}