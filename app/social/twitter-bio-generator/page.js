import TwitterBioGenerator from "./Twitter";

export const metadata = {
    title: "Twitter Bio Generator | Create Engaging Twitter Bios",
    description:
        "Craft witty, professional, or creative Twitter bios with our free online Twitter Bio Generator tool at DeepTools.org.",
    keywords:
        "Twitter Bio Generator, X Bio Creator, Create Twitter Bios, Stylish Twitter Bios, Online Bio Maker, DeepTools",
    metadataBase: new URL("https://deeptools.org"),
    alternates: {
        canonical: "/twitter-bio-generator",
    },
    openGraph: {
        title: "Twitter Bio Generator - Create Engaging Bios",
        description: "Generate compelling Twitter bios for personal or professional use with ease.",
        url: "https://deeptools.org/social/twitter-bio-generator",
        images: [
            {
                url: "/assets/social.jpg",
                width: 1200,
                height: 630,
                alt: "Twitter Bio Generator Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Twitter Bio Generator - Create Engaging Bios",
        description: "Quickly create catchy and professional Twitter bios online.",
        images: ["/assets/social.jpg"],
    },
};

export default function TwitterBioGeneratorPage() {
    return (
        <main>
            <TwitterBioGenerator />
        </main>
    );
}
