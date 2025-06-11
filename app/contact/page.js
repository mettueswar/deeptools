import ContactPage from "./contact";

export const metadata = {
    title: 'Contact Us - DeepTools.org',
    description: 'Get in touch with the DeepTools.org team for support, suggestions, partnerships, or inquiries.',
    keywords: ['Contact', 'Support', 'DeepTools Help', 'Reach Out', 'Customer Service'],
    alternates: {
        canonical: 'https://deeptools.org/contact',
    },
    openGraph: {
        title: 'Contact Us - DeepTools.org',
        description: 'Have questions or feedback? Contact the DeepTools.org team.',
        url: 'https://deeptools.org/contact',
        siteName: 'DeepTools.org',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Contact DeepTools.org'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact DeepTools.org',
        description: 'We’d love to hear from you. Reach out with your questions or ideas.',
        images: ['/og-image.png']
    }
};
export default function Contact() {
    return (
        <ContactPage />
    );
}