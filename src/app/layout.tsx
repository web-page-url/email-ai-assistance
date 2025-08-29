import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://email-ai-assistance.vercel.app'), // Update with your actual domain
  title: {
    default: 'Email AI Assistance - Smart Email Writing Assistant',
    template: '%s | Email AI Assistance'
  },
  description: 'Transform your thoughts into polished, professional emails with AI assistance. Generate emails in different tones using advanced Gemini AI integration. Perfect for business communication, personal emails, and professional correspondence.',
  keywords: [
    'email assistant',
    'AI email writer',
    'email generator',
    'professional emails',
    'Gemini AI',
    'email composition',
    'business communication',
    'email automation',
    'smart writing assistant',
    'email templates'
  ],
  authors: [{ name: 'Anubhav Chaudhary' }],
  creator: 'Anubhav Chaudhary',
  publisher: 'Email AI Assistance',
  category: 'Productivity',
  classification: 'Business Application',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://email-ai-assistance.vercel.app',
    siteName: 'Email AI Assistance',
    title: 'Email AI Assistance - Smart Email Writing Assistant',
    description: 'Transform your thoughts into polished, professional emails with AI assistance. Generate emails in different tones using Gemini AI.',
    images: [
      {
        url: '/og-image-facebook.png',
        width: 1200,
        height: 630,
        alt: 'Email AI Assistance - Smart Email Writing Assistant',
        type: 'image/png',
      },
      {
        url: '/og-image-wide.png',
        width: 1200,
        height: 675,
        alt: 'Email AI Assistance - Wide Format',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 1080,
        height: 1080,
        alt: 'Email AI Assistance - Square Format',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@AnubhavChaudhary', // Update with your Twitter handle
    creator: '@AnubhavChaudhary',
    title: 'Email AI Assistance - Smart Email Writing Assistant',
    description: 'Transform your thoughts into polished, professional emails with AI assistance using Gemini AI.',
    images: ['/og-image-twitter.png'],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (add your verification codes)
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  // App links
  alternates: {
    canonical: 'https://email-ai-assistance.vercel.app',
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon-32x32.png', color: '#2563eb' },
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO and Performance Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Email AI Assistant" />
        <meta name="application-name" content="Email AI Assistant" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Email AI Assistance",
              "description": "Smart Email Writing Assistant powered by AI",
              "url": "https://email-ai-assistance.vercel.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Person",
                "name": "Anubhav Chaudhary"
              },
              "featureList": [
                "AI-powered email generation",
                "Multiple email tones",
                "Context-aware responses",
                "Professional email templates",
                "Mobile-responsive design"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
