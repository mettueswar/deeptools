import SMSBomber from "./SMS";

export const metadata = {
    title: "SMS Bomber | Send Test Messages for Stress Testing - DeepTools.org",
    description:
        "Use our SMS Bomber tool for educational or testing purposes only. Simulate multiple SMS sends to test system resilience and response handling.",
    keywords:
        "SMS Bomber, Message Bomber, Bulk SMS Testing, SMS Stress Tool, Send Test Messages, DeepTools",
    metadataBase: new URL("https://deeptools.org"),
    alternates: {
        canonical: "/sms-bomber",
    },
    openGraph: {
        title: "SMS Bomber - Bulk SMS Testing Tool - DeepTools.org",
        description: "Simulate multiple SMS requests for testing and educational use only.",
        url: "https://deeptools.org/sms-bomber",
        images: [
            {
                url: "/assets/social.jpg",
                width: 1200,
                height: 630,
                alt: "SMS Bomber Tool for Testing",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SMS Bomber - Bulk SMS Testing Tool - DeepTools.org",
        description: "Test how your systems handle bulk SMS traffic. For responsible use only.",
        images: ["/assets/social.jpg"],
    },
};

export default function SMSBomberPage() {
    return (
        <main>
            <SMSBomber />
        </main>
    );
}
