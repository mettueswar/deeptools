// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://deeptools.org'),
  title: 'Free Online Tools Hub - DeepTools.org',
  description: 'One of the best free online tools hub for AI, Design Tools, image generation, text generation, and more. Explore a wide range of tools to enhance your productivity and creativity.',
  applicationName: 'DeepTools.org',
  keywords: ['AI Tools', 'Free Online Tools', 'Image Generation', 'Text Tools', 'Writing Tools', 'Productivity Tools', 'Design Tools'],
  authors: [{ name: 'DeepTools.org Team', url: 'https://deeptools.org' }],
  creator: 'DeepTools.org',
  publisher: 'DeepTools.org',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://deeptools.org'
  },

  openGraph: {
    title: 'Free Online Tools Hub - DeepTools.org',
    description: 'One of the best free online tools hub for AI, image generation, text generation, and more. Explore a wide range of tools to enhance your productivity and creativity.',
    url: 'https://deeptools.org',
    siteName: 'DeepTools.org',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepTools.org - Free Online Tools Hub'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools Hub - DeepTools.org',
    description: 'One of the best free online tools hub for AI, image generation, text generation, and more. Explore a wide range of tools to enhance your productivity and creativity.',
    images: ['/og-image.png'],
    site: '@deeptools_org'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow mt-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
