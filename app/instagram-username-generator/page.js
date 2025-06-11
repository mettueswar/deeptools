import InstagramUsernameGenerator from "./Instagram";

export const metadata = {
    title: "Instagram Username Generator | Unique IG Name Ideas - DeepTools.org",
    description:
        "Generate creative, cool, and unique Instagram usernames with our free online Instagram Username Generator at DeepTools.org.",
    keywords:
        "Instagram Username Generator, IG Username Ideas, Cool Instagram Names, Unique IG Handles, Online Username Generator, DeepTools",
    metadataBase: new URL("https://deeptools.org"),
    alternates: {
        canonical: "/instagram-username-generator",
    },
    openGraph: {
        title: "Instagram Username Generator - Unique IG Name Ideas - DeepTools.org",
        description: "Find the perfect Instagram handle with our powerful username generator.",
        url: "https://deeptools.org/instagram-username-generator",
        images: [
            {
                url: "/assets/social.jpg",
                width: 1200,
                height: 630,
                alt: "Instagram Username Generator Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Instagram Username Generator - Unique IG Name Ideas - DeepTools.org",
        description: "Discover stylish and available Instagram usernames instantly.",
        images: ["/assets/social.jpg"],
    },
};

export default function InstagramUsernameGeneratorPage() {
    return (
        <main>
            <InstagramUsernameGenerator />
        </main>
    );
}
