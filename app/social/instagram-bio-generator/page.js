import InstagramBioGenerator from "./Instagram";

export const metadata = {
    title: "Instagram Bio Generator | Create Unique Bios Online",
    description:
        "Generate creative, stylish, and unique Instagram bios with our online Instagram Bio Generator tool at DeepTools.org.",
    keywords:
        "Instagram Bio Generator, IG Bio Creator, Create Instagram Bios, Stylish Bio Generator, Online Bio Maker, DeepTools",
    metadataBase: new URL("https://deeptools.org"),
    alternates: {
        canonical: "/instagram-bio-generator",
    },
    openGraph: {
        title: "Instagram Bio Generator - Create Stylish Bios Online",
        description: "Craft the perfect Instagram bio with our free online generator.",
        url: "https://deeptools.org/social/instagram-bio-generator",
        images: [
            {
                url: "/assets/social.jpg",
                width: 1200,
                height: 630,
                alt: "Instagram Bio Generator Tool",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Instagram Bio Generator - Create Stylish Bios Online",
        description: "Generate creative and catchy Instagram bios effortlessly.",
        images: ["/assets/social.jpg"],
    },
};

export default function InstagramBioGeneratorPage() {
    return (
        <main>
            <InstagramBioGenerator />
        </main>
    );
}
