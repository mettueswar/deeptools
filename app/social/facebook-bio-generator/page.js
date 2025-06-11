import FacebookBioGenerator from "./FB";

export const metadata = {
    title: "Facebook Bio Generator | Create Cool Facebook Bios",
    description:
        "Easily create catchy and unique Facebook bios with our free online Facebook Bio Generator tool at DeepTools.org.",
    keywords:
        "Facebook Bio Generator, FB Bio Creator, Create Facebook Bios, Stylish FB Bio Generator, Online Bio Maker, DeepTools",
    metadataBase: new URL("https://deeptools.org"),
    alternates: {
        canonical: "/facebook-bio-generator",
    },
    openGraph: {
        title: "Facebook Bio Generator - Create Cool Facebook Bios",
        description: "Generate custom and creative Facebook bios quickly and easily.",
        url: "https://deeptools.org/social/facebook-bio-generator",
        images: [
            {
                url: "/assets/social.jpg",
                width: 1200,
                height: 630,
                alt: "Facebook Bio Generator Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Facebook Bio Generator - Create Cool Facebook Bios",
        description: "Create catchy Facebook bios online with our free generator.",
        images: ["/assets/social.jpg"],
    },
};

export default function FacebookBioGeneratorPage() {
    return (
        <main>
            <FacebookBioGenerator />
        </main>
    );
}
