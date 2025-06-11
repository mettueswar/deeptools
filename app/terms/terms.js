"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, FileText, AlertTriangle, HelpCircle, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
    const sections = [
        {
            title: "User Agreements",
            items: [
                {
                    heading: "Account Registration",
                    content: "Users must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials."
                },
                {
                    heading: "Eligibility",
                    content: "You must be at least 18 years old or have parental consent to use our services. By using our platform, you represent that you meet these eligibility requirements."
                },
                {
                    heading: "User Conduct",
                    content: "Users agree not to use our services for illegal purposes or in violation of these terms. We reserve the right to suspend or terminate accounts that violate our policies."
                }
            ]
        },
        {
            title: "Content and Intellectual Property",
            items: [
                {
                    heading: "Ownership of Content",
                    content: "Users retain ownership of content they create using our tools. However, you grant us a non-exclusive license to use, store, and display your content for service provision purposes."
                },
                {
                    heading: "Restrictions",
                    content: "You may not use our AI tools to create content that is illegal, harmful, abusive, or violates third-party rights. We reserve the right to remove any content that violates these terms."
                },
                {
                    heading: "Copyright Policy",
                    content: "We respect intellectual property rights and expect users to do the same. If you believe your copyright has been violated, please contact our copyright agent with detailed information."
                }
            ]
        },
        {
            title: "Service Terms",
            items: [
                {
                    heading: "Subscription and Billing",
                    content: "Subscription fees are charged according to the plan you select. You can cancel your subscription at any time, but refunds are subject to our refund policy."
                },
                {
                    heading: "Service Modifications",
                    content: "We may modify, suspend, or discontinue any aspect of our services at any time. We will make reasonable efforts to notify users of significant changes."
                },
                {
                    heading: "Termination",
                    content: "We reserve the right to terminate or suspend your account for violations of these terms. You may also terminate your account at any time through your account settings."
                }
            ]
        }
    ]

    return (
        <div className="container mx-auto px-10 py-12">
            {/* Hero Section */}
            <section className="mb-16 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Terms of Service
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Please read these terms carefully before using our AI-powered content creation tools and services.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                    Last Updated: April 17, 2025
                </p>
            </section>

            {/* Introduction Section */}
            <section className="mb-16">
                <Card className="bg-secondary/30">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                                <p className="text-muted-foreground mb-4">
                                    Welcome to our AI content creation platform. These Terms of Service ("Terms") govern your access to and use of our website, applications, tools, and related services (collectively, the "Services").
                                </p>
                                <p className="text-muted-foreground">
                                    By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Main Terms Sections */}
            {sections.map((section, sectionIndex) => (
                <section key={sectionIndex} className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {section.items.map((item, itemIndex) => (
                            <Card key={itemIndex} className="hover:shadow-md transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{item.heading}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{item.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            ))}

            {/* Disclaimers Section */}
            <section className="mb-16">
                <Card className="border-warning/20 bg-warning/10">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-warning" />
                            <CardTitle>Disclaimers and Limitations</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                <span className="font-bold">No Warranties:</span> The services are provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied.
                            </p>
                            <p className="text-muted-foreground">
                                <span className="font-bold">Limitation of Liability:</span> We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the services.
                            </p>
                            <p className="text-muted-foreground">
                                <span className="font-bold">AI-Generated Content:</span> While our AI tools strive for accuracy and quality, we do not guarantee the correctness, appropriateness, or effectiveness of AI-generated content for your specific purposes.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">How can I cancel my subscription?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                You can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Who owns the content I create?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                You retain ownership of all content created using our tools. We only use your content to provide and improve our services.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">How do I report violations?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                If you believe someone is violating these Terms, please contact us through our support page with details of the alleged violation.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">How will I be notified of changes?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                We'll notify users of material changes to these Terms via email or through notices on our platform. Continued use after changes constitutes acceptance.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Contact Section */}
            <section className="text-center bg-secondary/30 rounded-lg p-8 mb-16">
                <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Have Questions About Our Terms?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    If you have any questions or concerns about our Terms of Service, please don't hesitate to reach out to our legal team.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/contact"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Contact Legal Team
                    </Link>
                    <Link
                        href="/privacy"
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </section>


        </div>
    )
}