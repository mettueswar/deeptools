"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Clock, Award, Zap, Code, Users } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
    const teamMembers = [
        {
            name: "Alex Johnson",
            role: "Founder & CEO",
            bio: "AI enthusiast with 10+ years of experience in machine learning and NLP.",
            imageUrl: "/api/placeholder/150/150"
        },
        {
            name: "Samantha Lee",
            role: "CTO",
            bio: "Computer scientist specializing in AI model development and optimization.",
            imageUrl: "/api/placeholder/150/150"
        },
        {
            name: "Marcus Williams",
            role: "Head of Product",
            bio: "Product strategist focused on creating useful AI tools for content creators.",
            imageUrl: "/api/placeholder/150/150"
        }
    ]

    const milestones = [
        {
            year: "2021",
            title: "Company Founded",
            description: "Started with a mission to make AI tools accessible to everyone."
        },
        {
            year: "2022",
            title: "Launch of Core Tools",
            description: "Released our first suite of AI writing assistants."
        },
        {
            year: "2023",
            title: "Expanded Capabilities",
            description: "Added advanced NLP models to improve our AI tools."
        },
        {
            year: "2024",
            title: "User Milestone",
            description: "Reached 100,000 active users across our platform."
        }
    ]

    return (
        <div className="container mx-auto px-10 py-12">
            {/* Hero Section */}
            <section className="mb-16 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    About Our Company
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We're revolutionizing content creation with powerful, accessible AI tools that help you write better, faster, and more effectively.
                </p>
            </section>

            {/* Mission Section */}
            <section className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground mb-4">
                            Our mission is to democratize access to advanced AI technology, making powerful content creation and optimization tools available to everyone, regardless of technical expertise.
                        </p>
                        <p className="text-muted-foreground">
                            We believe that AI should augment human creativity, not replace it. That's why our tools are designed to work alongside you, enhancing your abilities and helping you create your best work.
                        </p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 p-3 rounded-full mb-3">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-1">Powerful</h3>
                                <p className="text-sm text-muted-foreground">State-of-the-art AI models</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 p-3 rounded-full mb-3">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-1">Accessible</h3>
                                <p className="text-sm text-muted-foreground">User-friendly interfaces for everyone</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 p-3 rounded-full mb-3">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-1">Quality</h3>
                                <p className="text-sm text-muted-foreground">Results that exceed expectations</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 p-3 rounded-full mb-3">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-1">Innovative</h3>
                                <p className="text-sm text-muted-foreground">Constantly evolving technology</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="p-4 text-center">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="rounded-full w-24 h-24 mx-auto mb-4"
                                />
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="text-primary text-sm mb-2">{member.role}</p>
                                <p className="text-muted-foreground text-sm">{member.bio}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
                <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                                <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                {index < milestones.length - 1 && (
                                    <div className="w-0.5 bg-primary/30 h-full mt-2"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="bg-secondary/30 rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                                    <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                                        {milestone.year}
                                    </span>
                                    <h3 className="font-bold mt-2">{milestone.title}</h3>
                                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-secondary/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Ready to enhance your content?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Try our AI tools today and experience the difference they can make in your content creation workflow.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/tools/rewriter"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Try Our Tools
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    )
}