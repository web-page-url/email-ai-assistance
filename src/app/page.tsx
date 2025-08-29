import EmailWriterApp from '@/components/EmailWriterApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email AI Assistance - Transform Your Thoughts Into Professional Emails',
  description: 'Generate polished, professional emails instantly with AI. Choose from 6 different tones, add context, and create perfect emails for business, personal, or formal communication.',
  openGraph: {
    title: 'Email AI Assistance - Smart Email Writing Assistant',
    description: 'Transform your thoughts into polished emails with AI assistance',
    url: 'https://email-ai-assistance.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 1200,
        alt: 'Email AI Assistance Interface',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Email AI Assistance",
            "description": "Transform your thoughts into professional emails with AI",
            "url": "https://email-ai-assistance.vercel.app",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Email AI Assistant",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "description": "AI-powered email writing assistant with multiple tone options",
              "featureList": [
                "Professional email generation",
                "Multiple writing tones",
                "Context-aware responses",
                "Real-time AI processing",
                "Mobile-responsive design"
              ]
            }
          })
        }}
      />
      <EmailWriterApp />
    </>
  );
}
