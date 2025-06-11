import AboutPage from "./about";

export const metadata = {
    title: 'About Us - DeepTools.org',
    description: 'Learn about DeepTools.org, our mission to provide free, powerful online tools for creators, developers, and professionals worldwide.',
    alternates: {
        canonical: 'https://deeptools.org/about',
    },
    openGraph: {
        title: 'About DeepTools.org',
        description: 'Discover the story behind DeepTools.org and our goal to empower users with free online tools.',
        url: 'https://deeptools.org/about',
        siteName: 'DeepTools.org',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'About DeepTools.org'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About DeepTools.org',
        description: 'Find out who we are and what drives DeepTools.org to deliver powerful free online tools.',
        images: ['/og-image.png']
    }
};


export default function About() {
    return (<AboutPage />)
}