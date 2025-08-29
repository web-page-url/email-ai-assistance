'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { generateContent } from '@/lib/gemini';
import { InputCard } from './InputCard';
import { ToneSelector } from './ToneSelector';
import { ContextSection } from './ContextSection';
import { GenerateButton } from './GenerateButton';
import { OutputCard } from './OutputCard';

const TRANSLATIONS = {
  "en-US": {
    "emailWritingAssistant": "Email Writing Assistant",
    "transformThoughtsDescription": "Transform your thoughts into polished, professional emails with AI assistance",
    "yourThoughts": "Your Thoughts",
    "thoughtsPlaceholder": "Write what you want to communicate... Don't worry about grammar or structure - just get your ideas down.",
    "tipKeyboardShortcut": "💡 Tip: Press Cmd/Ctrl + Enter to generate your email",
    "emailTone": "Email Tone",
    "professionalTone": "Professional",
    "professionalDescription": "Clear and business-appropriate",
    "warmTone": "Warm",
    "warmDescription": "Friendly and approachable",
    "conciseTone": "Concise",
    "conciseDescription": "Brief and to the point",
    "formalTone": "Formal",
    "formalDescription": "Traditional and respectful",
    "casualTone": "Casual",
    "casualDescription": "Relaxed and conversational",
    "persuasiveTone": "Persuasive",
    "persuasiveDescription": "Compelling and convincing",
    "contextOptional": "Context (Optional)",
    "hide": "Hide",
    "show": "Show",
    "contextDescription": "Paste the email you're responding to for better context",
    "contextPlaceholder": "Paste the original email here...",
    "craftingEmail": "Crafting your email...",
    "generateEmail": "Generate Email",
    "generatedEmail": "Generated Email",
    "copied": "Copied!",
    "copy": "Copy",
    "emailWillAppearHere": "Your polished email will appear here",
    "getStartedPrompt": "Enter your thoughts and select a tone to get started",
    "proTips": "✨ Pro Tips",
    "tipBeSpecific": "• Be specific about what you want to achieve",
    "tipIncludeDetails": "• Include key details even if roughly written",
    "tipTryTones": "• Try different tones to see what works best",
    "tipAddContext": "• Add context for more personalized responses"
  },
  "es-ES": {
    "emailWritingAssistant": "Asistente de Redacción de Correos",
    "transformThoughtsDescription": "Transforma tus ideas en correos electrónicos pulidos y profesionales con asistencia de IA",
    "yourThoughts": "Tus Ideas",
    "thoughtsPlaceholder": "Escribe lo que quieres comunicar... No te preocupes por la gramática o estructura - solo plasma tus ideas.",
    "tipKeyboardShortcut": "💡 Consejo: Presiona Cmd/Ctrl + Enter para generar tu correo",
    "emailTone": "Tono del Correo",
    "professionalTone": "Profesional",
    "professionalDescription": "Claro y apropiado para negocios",
    "warmTone": "Cálido",
    "warmDescription": "Amigable y accesible",
    "conciseTone": "Conciso",
    "conciseDescription": "Breve y directo",
    "formalTone": "Formal",
    "formalDescription": "Tradicional y respetuoso",
    "casualTone": "Casual",
    "casualDescription": "Relajado y conversacional",
    "persuasiveTone": "Persuasivo",
    "persuasiveDescription": "Convincente y persuasivo",
    "contextOptional": "Contexto (Opcional)",
    "hide": "Ocultar",
    "show": "Mostrar",
    "contextDescription": "Pega el correo al que estás respondiendo para mejor contexto",
    "contextPlaceholder": "Pega el correo original aquí...",
    "craftingEmail": "Creando tu correo...",
    "generateEmail": "Generar Correo",
    "generatedEmail": "Correo Generado",
    "copied": "¡Copiado!",
    "copy": "Copiar",
    "emailWillAppearHere": "Tu correo pulido aparecerá aquí",
    "getStartedPrompt": "Ingresa tus ideas y selecciona un tono para comenzar",
    "proTips": "✨ Consejos Pro",
    "tipBeSpecific": "• Sé específico sobre lo que quieres lograr",
    "tipIncludeDetails": "• Incluye detalles clave aunque estén escritos de forma básica",
    "tipTryTones": "• Prueba diferentes tonos para ver cuál funciona mejor",
    "tipAddContext": "• Agrega contexto para respuestas más personalizadas"
  }
};

// Locale detection
const getLocale = () => {
  if (typeof window !== 'undefined') {
    const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
    const findMatchingLocale = (locale: string) => {
      if (TRANSLATIONS[locale as keyof typeof TRANSLATIONS]) return locale;
      const lang = locale.split('-')[0];
      const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
      return match || 'en-US';
    };
    return findMatchingLocale(browserLocale);
  }
  return 'en-US';
};

export default function EmailWriterApp() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('professional');
  const [contextEmail, setContextEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const locale = getLocale();
  const t = (key: string) => {
    const translation = TRANSLATIONS[locale as keyof typeof TRANSLATIONS]?.[key as keyof typeof TRANSLATIONS['en-US']] || 
                       TRANSLATIONS['en-US'][key as keyof typeof TRANSLATIONS['en-US']] || 
                       key;
    return translation;
  };

  const tones = [
    { value: 'professional', label: t('professionalTone'), description: t('professionalDescription') },
    { value: 'warm', label: t('warmTone'), description: t('warmDescription') },
    { value: 'concise', label: t('conciseTone'), description: t('conciseDescription') },
    { value: 'formal', label: t('formalTone'), description: t('formalDescription') },
    { value: 'casual', label: t('casualTone'), description: t('casualDescription') },
    { value: 'persuasive', label: t('persuasiveTone'), description: t('persuasiveDescription') }
  ];

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;

    setIsLoading(true);
    try {
      const contextPart = contextEmail.trim() 
        ? `\n\nContext - I am responding to this email:\n"${contextEmail}"\n\n`
        : '';

      const prompt = `You are an expert email writer. Transform the following raw thoughts into a well-crafted email with a ${tone} tone.

Raw thoughts: "${rawThoughts}"${contextPart}

Instructions:
- Write a complete, professional email body
- Use a ${tone} tone throughout
- Make it clear, engaging, and well-structured
- Ensure proper email etiquette
- Do not include a subject line

Please respond in ${locale} language.

Respond with ONLY the email body content. Do not include any explanations or additional text outside of the email.`;

      const response = await generateContent(prompt);
      setGeneratedEmail(response.trim());
    } catch (error) {
      console.error('Error generating email:', error);
      setGeneratedEmail('Sorry, there was an error generating your email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      generateEmail();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              {t('emailWritingAssistant')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              {t('transformThoughtsDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Input Section */}
          <div className="space-y-6">
            <InputCard
              title={t('yourThoughts')}
              value={rawThoughts}
              onChange={setRawThoughts}
              placeholder={t('thoughtsPlaceholder')}
              tip={t('tipKeyboardShortcut')}
              onKeyDown={handleKeyPress}
              rows={5}
            />

            <ToneSelector
              title={t('emailTone')}
              tones={tones}
              selectedTone={tone}
              onToneSelect={setTone}
            />

            <ContextSection
              title={t('contextOptional')}
              description={t('contextDescription')}
              placeholder={t('contextPlaceholder')}
              value={contextEmail}
              onChange={setContextEmail}
              showContext={showContext}
              onToggle={() => setShowContext(!showContext)}
              hideText={t('hide')}
              showText={t('show')}
            />

            <GenerateButton
              onClick={generateEmail}
              disabled={isLoading || !rawThoughts.trim()}
              isLoading={isLoading}
              loadingText={t('craftingEmail')}
              buttonText={t('generateEmail')}
            />
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <OutputCard
              title={t('generatedEmail')}
              content={generatedEmail}
              onCopy={copyToClipboard}
              copied={copied}
              emptyStateMessage={t('emailWillAppearHere')}
              emptyStateSubMessage={t('getStartedPrompt')}
            />

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-3">{t('proTips')}</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>{t('tipBeSpecific')}</li>
                <li>{t('tipIncludeDetails')}</li>
                <li>{t('tipTryTones')}</li>
                <li>{t('tipAddContext')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}