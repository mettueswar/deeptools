
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Search, Server, UserCheck, Clock, Clipboard, AlertTriangle, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
    // Last updated date
    const lastUpdated = "April 15, 2025"

    return (
        <div className="container mx-auto px-10 py-12">
            {/* Header Section */}
            <section className="mb-10 text-center">
                <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Privacy Policy
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Last Updated: {lastUpdated}
                </p>
            </section>

            {/* Table of Contents */}
            <Card className="mb-10 hover:shadow-md transition-all duration-300">
                <CardHeader>
                    <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {[
                            { id: "introduction", title: "Introduction" },
                            { id: "information-collected", title: "Information We Collect" },
                            { id: "use-of-information", title: "How We Use Your Information" },
                            { id: "sharing-information", title: "Sharing Your Information" },
                            { id: "data-security", title: "Data Security" },
                            { id: "your-rights", title: "Your Rights" },
                            { id: "cookies", title: "Cookies and Tracking" },
                            { id: "children", title: "Children's Privacy" },
                            { id: "changes", title: "Changes to This Policy" },
                            { id: "contact", title: "Contact Us" }
                        ].map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className="text-primary hover:underline flex items-center"
                                >
                                    <span className="mr-2">•</span>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Policy Content */}
            <div className="space-y-12">
                {/* Introduction */}
                <section id="introduction">
                    <div className="flex items-center mb-4">
                        <Clipboard className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Introduction</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                Welcome to our Privacy Policy. This policy describes how we collect, use, and handle your personal information when you use our AI tools and services.
                            </p>
                            <p className="mb-4">
                                At DeepTools.org, we are committed to protecting your privacy and ensuring the security of your personal information. We believe in transparency about our practices and want you to understand how we collect, use, and share your data.
                            </p>
                            <p>
                                By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Information We Collect */}
                <section id="information-collected">
                    <div className="flex items-center mb-4">
                        <Search className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Information We Collect</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <h3 className="font-bold mb-2">Information You Provide to Us</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1 text-muted-foreground">
                                <li>Account information: When you create an account, we collect your name, email address, and password.</li>
                                <li>Profile information: Information you add to your profile, such as a profile picture, job title, or company.</li>
                                <li>Content data: The content you input into our AI tools for processing.</li>
                                <li>Payment information: If you subscribe to our premium services, we collect payment details.</li>
                                <li>Communications: When you contact our support team, we collect the information you provide in those communications.</li>
                            </ul>

                            <h3 className="font-bold mb-2">Information Collected Automatically</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1 text-muted-foreground">
                                <li>Usage data: Information about how you use our services, including features accessed and time spent.</li>
                                <li>Device information: Information about the device you use to access our services, including hardware model, operating system, and browser type.</li>
                                <li>Log data: Including IP address, browser type, pages visited, time and date of your visit, time spent on those pages.</li>
                                <li>Cookies and similar technologies: We use cookies and similar tracking technologies to track activity on our service and hold certain information.</li>
                            </ul>

                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-start">
                                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                <p className="text-sm">
                                    Please note that while we collect content you input for processing by our AI tools, we implement strict data handling procedures to protect your privacy and confidentiality.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* How We Use Your Information */}
                <section id="use-of-information">
                    <div className="flex items-center mb-4">
                        <Server className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">We use the information we collect for various purposes, including:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Service Provision</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        <li>Providing and maintaining our services</li>
                                        <li>Processing your transactions</li>
                                        <li>Enabling use of our AI tools and features</li>
                                        <li>Managing your account and preferences</li>
                                    </ul>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Improvement & Development</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        <li>Improving our AI models and algorithms</li>
                                        <li>Developing new products and features</li>
                                        <li>Analyzing usage patterns and trends</li>
                                        <li>Testing and research purposes</li>
                                    </ul>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Communication</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        <li>Responding to your inquiries and requests</li>
                                        <li>Sending service-related notifications</li>
                                        <li>Providing customer support</li>
                                        <li>Sending promotional materials (with consent)</li>
                                    </ul>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Security & Legal</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        <li>Detecting and preventing fraud</li>
                                        <li>Protecting against security breaches</li>
                                        <li>Enforcing our terms of service</li>
                                        <li>Complying with legal obligations</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-muted-foreground">
                                We will not use your information for purposes other than those described in this Privacy Policy without your consent.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Sharing Your Information */}
                <section id="sharing-information">
                    <div className="flex items-center mb-4">
                        <UserCheck className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Sharing Your Information</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                We may share your personal information in the following situations:
                            </p>

                            <h3 className="font-bold mb-2">Third-Party Service Providers</h3>
                            <p className="text-muted-foreground mb-4">
                                We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. These may include payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                            </p>

                            <h3 className="font-bold mb-2">Business Transfers</h3>
                            <p className="text-muted-foreground mb-4">
                                If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.
                            </p>

                            <h3 className="font-bold mb-2">Legal Requirements</h3>
                            <p className="text-muted-foreground mb-4">
                                We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
                            </p>

                            <h3 className="font-bold mb-2">With Your Consent</h3>
                            <p className="text-muted-foreground">
                                We may disclose your personal information for any other purpose with your consent.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Data Security */}
                <section id="data-security">
                    <div className="flex items-center mb-4">
                        <Shield className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Data Security</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <h3 className="font-bold mb-2">Our Security Measures</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        <li>Encryption of sensitive information</li>
                                        <li>Regular security assessments and audits</li>
                                        <li>Access controls and authentication requirements</li>
                                        <li>Secure data storage practices</li>
                                        <li>Employee training on data protection</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">Your Responsibility</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        <li>Choose strong, unique passwords</li>
                                        <li>Keep your login credentials confidential</li>
                                        <li>Log out after using shared computers</li>
                                        <li>Update your software and browsers regularly</li>
                                        <li>Be cautious about the information you share</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="bg-primary/10 p-4 rounded-md text-sm">
                                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. If you have reason to believe that your interaction with us is no longer secure, please immediately notify us.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Your Rights */}
                <section id="your-rights">
                    <div className="flex items-center mb-4">
                        <UserCheck className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Your Rights</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Access & Portability</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have the right to request copies of your personal information. You may also have the right to request that we transfer this information to another party.
                                    </p>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Correction</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have the right to request that we correct any information you believe is inaccurate or incomplete.
                                    </p>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Deletion</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have the right to request that we delete your personal information, subject to certain exceptions.
                                    </p>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Restriction</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have the right to request that we restrict the processing of your personal information.
                                    </p>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Objection</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have the right to object to our processing of your personal information.
                                    </p>
                                </div>

                                <div className="bg-secondary/30 p-4 rounded-md">
                                    <h3 className="font-bold mb-2">Withdrawing Consent</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You can withdraw consent to process your information at any time.
                                    </p>
                                </div>
                            </div>

                            <p className="mb-4">
                                To exercise any of these rights, please contact us using the details provided in the "Contact Us" section. We may need to verify your identity before responding to your request.
                            </p>

                            <div className="bg-primary/10 p-4 rounded-md text-sm">
                                Please note that we may ask you to verify your identity before responding to such requests, and we may not be able to comply with your request in all circumstances.
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Cookies */}
                <section id="cookies">
                    <div className="flex items-center mb-4">
                        <Search className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Cookies and Tracking</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                            </p>

                            <h3 className="font-bold mb-2">Types of Cookies We Use</h3>
                            <div className="space-y-3 mb-4">
                                <div className="flex">
                                    <div className="font-medium min-w-32">Essential Cookies:</div>
                                    <div className="text-muted-foreground">Necessary for the website to function properly</div>
                                </div>
                                <div className="flex">
                                    <div className="font-medium min-w-32">Preference Cookies:</div>
                                    <div className="text-muted-foreground">Remember your preferences and settings</div>
                                </div>
                                <div className="flex">
                                    <div className="font-medium min-w-32">Analytics Cookies:</div>
                                    <div className="text-muted-foreground">Help us understand how visitors interact with our website</div>
                                </div>
                                <div className="flex">
                                    <div className="font-medium min-w-32">Marketing Cookies:</div>
                                    <div className="text-muted-foreground">Track your browsing habits to deliver targeted advertising</div>
                                </div>
                            </div>

                            <h3 className="font-bold mb-2">Your Cookie Choices</h3>
                            <p className="mb-4 text-muted-foreground">
                                Most web browsers allow you to control cookies through their settings. However, if you reject cookies, you might not be able to use some portions of our service.
                            </p>

                            <div className="bg-primary/10 p-4 rounded-md text-sm">
                                For more information about cookies and how to manage them, visit <a href="#" className="text-primary hover:underline">our Cookie Policy</a> or refer to your browser's help section.
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Children's Privacy */}
                <section id="children">
                    <div className="flex items-center mb-4">
                        <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Children's Privacy</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                Our services are not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
                            </p>

                            <p className="mb-4 text-muted-foreground">
                                If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
                            </p>

                            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-start">
                                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                <p className="text-sm">
                                    If you believe we might have any information from or about a child under the age of 13, please contact us immediately at the email address provided in the "Contact Us" section.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Changes to Policy */}
                <section id="changes">
                    <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        <h2 className="text-2xl font-bold">Changes to This Policy</h2>
                    </div>
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                            </p>

                            <p className="mb-4 text-muted-foreground">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>

                            <p className="mb-4 text-muted-foreground">
                                If we make material changes to this policy, we may notify you either through the email address you have provided us or by placing a prominent notice on our website.
                            </p>
                        </CardContent>
                    </Card>
                </section>


            </div>

            {/* Footer */}
            <section className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                    This Privacy Policy was last updated on {lastUpdated}.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/terms"
                        className="text-primary hover:underline"
                    >
                        Terms of Service
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link
                        href="/contact"
                        className="text-primary hover:underline"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    )
}