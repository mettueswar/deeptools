import TermsPage from "./terms";

export const metadata = {
    title: 'Terms of Service - DeepTools.org',
    description: 'Review the Terms of Service for using DeepTools.org. Understand the rules, responsibilities, and limitations that apply when accessing our free online tools.',
    alternates: {
        canonical: 'https://deeptools.org/terms-of-service',
    },
    openGraph: {
        title: 'Terms of Service - DeepTools.org',
        description: 'Understand the rules and policies that govern the use of DeepTools.org’s free AI and productivity tools.',
        url: 'https://deeptools.org/terms-of-service',
        siteName: 'DeepTools.org',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Terms of Service - DeepTools.org'
            }
        ],
        type: 'article'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service - DeepTools.org',
        description: 'Read the usage terms and responsibilities when using DeepTools.org.',
        images: ['/og-image.png']
    }
};



export default function Terms() {
    return (<TermsPage />)
}