

import PrivacyPolicyPage from "./privacy";

export const metadata = {
    title: 'Privacy Policy - DeepTools.org',
    description: 'Read DeepTools.org\'s privacy policy to understand how we collect, use, and protect your data while using our free online tools.',
    alternates: {
        canonical: 'https://deeptools.org/privacy-policy',
    },
    openGraph: {
        title: 'Privacy Policy - DeepTools.org',
        description: 'Learn how DeepTools.org protects your data and privacy while using our online tools.',
        url: 'https://deeptools.org/privacy-policy',
        siteName: 'DeepTools.org',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Privacy Policy - DeepTools.org'
            }
        ],
        type: 'article'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy - DeepTools.org',
        description: 'How we handle your data at DeepTools.org while delivering powerful online tools.',
        images: ['/og-image.png']
    }
};

export default function Privacy() {
    return (

        <PrivacyPolicyPage />

    )
}