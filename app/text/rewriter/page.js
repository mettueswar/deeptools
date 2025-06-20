import RewriterPage from './rewriter'

export const metadata = {
    title: 'AI Paragraph Rewriter | DeepTools.org',
    description:
        'Rewrite any paragraph instantly with DeepTools.org’s AI Paragraph Rewriter. Choose your tone, select a model, and generate professional, creative, or persuasive rewrites in seconds.',

    alternates: {
        canonical: 'https://deeptools.org/rewriter',
    },
    authors: [{ name: 'DeepTools Team', url: 'https://deeptools.org' }],
    creator: 'DeepTools',
    publisher: 'DeepTools.org',

    openGraph: {
        title: 'AI Paragraph Rewriter | DeepTools.org',
        description:
            'Instantly rewrite paragraphs with AI using your preferred tone and model. Try our free paragraph rewriter on DeepTools.org!',
        url: 'https://deeptools.org/text/rewriter',
        siteName: 'DeepTools.org',
        images: [
            {
                url: 'https://deeptools.org/og-image.png', // Replace with actual OG image
                width: 1200,
                height: 630,
                alt: 'AI Paragraph Rewriter Screenshot',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Paragraph Rewriter | DeepTools.org',
        description:
            'Rewrite any paragraph with AI in seconds. Select your tone and model, and generate improved versions instantly.',
        images: ['https://deeptools.org/og-image.png'],
        creator: '@deeptools_ai',
    },
}

export default function Page() {
    return <RewriterPage />
}
