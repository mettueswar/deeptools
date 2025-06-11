"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone, Send, AlertCircle } from 'lucide-react'

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [formStatus, setFormStatus] = useState({
        status: null, // 'success', 'error', or null
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setFormStatus({
                status: 'success',
                message: 'Your message has been sent! We\'ll get back to you shortly.'
            })
            setIsSubmitting(false)
            // Reset form
            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
        }, 1500)

        // In a real application, you would send the form data to your API:
        /*
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
          })
          
          const data = await response.json()
          
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong')
          }
          
          setFormStatus({
            status: 'success',
            message: 'Your message has been sent! We\'ll get back to you shortly.'
          })
          
          // Reset form
          setFormState({
            name: '',
            email: '',
            subject: '',
            message: ''
          })
        } catch (error) {
          setFormStatus({
            status: 'error',
            message: error.message
          })
        } finally {
          setIsSubmitting(false)
        }
        */
    }

    return (
        <div className="container mx-auto px-10 py-12">
            {/* Hero Section */}
            <section className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Contact Us
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Info Cards */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Email Us</h3>
                                    <p className="text-muted-foreground text-sm mb-2">For general inquiries:</p>
                                    <a href="mailto:info@aitools.com" className="text-primary hover:underline">
                                        info@deeptools.org
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Call Us</h3>
                                    <p className="text-muted-foreground text-sm mb-2">Monday-Friday, 9am-5pm EST:</p>
                                    <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Visit Us</h3>
                                    <p className="text-muted-foreground text-sm mb-2">Our headquarters:</p>
                                    <address className="not-italic text-primary">
                                        123 AI Street<br />
                                        Tech City, CA 94103<br />
                                        United States
                                    </address>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/30 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <h3 className="font-bold mb-3">Support Hours</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monday - Friday</span>
                                    <span>9:00 AM - 5:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Saturday</span>
                                    <span>10:00 AM - 2:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <Card className="hover:shadow-md transition-all duration-300">
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {formStatus.status && (
                                <div className={`mb-4 p-4 rounded-md ${formStatus.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    <div className="flex items-center">
                                        {formStatus.status === 'success' ? (
                                            <Mail className="h-5 w-5 mr-2" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 mr-2" />
                                        )}
                                        <p>{formStatus.message}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Send className="h-4 w-4 mr-2" />
                                    )}
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            q: "How can I get started with your tools?",
                            a: "You can start by creating an account and exploring our free tier features. Check out our 'Tools' page to see what's available."
                        },
                        {
                            q: "Do you offer support for custom integrations?",
                            a: "Yes, we provide API access and custom integration support for enterprise customers. Please contact our sales team for more information."
                        },
                        {
                            q: "What payment methods do you accept?",
                            a: "We accept all major credit cards, PayPal, and for enterprise customers, we can arrange invoicing terms."
                        },
                        {
                            q: "How do I cancel my subscription?",
                            a: "You can cancel your subscription at any time from your account settings. If you need help, our support team is available to assist you."
                        }
                    ].map((faq, index) => (
                        <Card key={index} className="hover:shadow-md transition-all duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{faq.q}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}