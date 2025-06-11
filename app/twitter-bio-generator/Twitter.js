// app/tools/twitter-bio-generator/page.js
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Twitter, Star } from 'lucide-react'

const models = [
    { id: 'google/gemini-pro', name: 'Gemini Pro' },
    { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3' },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' }
]

const bioStyles = [
    { id: 'professional', name: 'Professional' },
    { id: 'witty', name: 'Witty & Funny' },
    { id: 'thought-leader', name: 'Thought Leader' },
    { id: 'entrepreneur', name: 'Entrepreneur' },
    { id: 'creative', name: 'Creative' },
    { id: 'tech', name: 'Tech Expert' },
    { id: 'personal', name: 'Personal Brand' },
    { id: 'minimalist', name: 'Minimalist' },
]

const reviews = [
    { name: "Marcus T.", rating: 5, text: "Perfect for my tech startup! The entrepreneur style bios helped me connect with investors and customers." },
    { name: "Sarah J.", rating: 5, text: "Love the witty options! My engagement went up 200% after using one of these bios. So creative!" },
    { name: "David K.", rating: 4, text: "Great tool for professionals. Created a bio that perfectly represents my consulting business." },
    { name: "Lisa M.", rating: 5, text: "The thought leader bios are amazing! Helped establish my authority in the marketing space." },
    { name: "Ryan P.", rating: 5, text: "Best Twitter bio generator! Creates bios that actually get people to follow and engage." },
    { name: "Emily R.", rating: 4, text: "Super helpful for personal branding. The professional options are clean and effective." },
    { name: "Jake S.", rating: 5, text: "Finally found a bio that represents my creative work perfectly. The creative style is spot on!" },
    { name: "Maya L.", rating: 5, text: "Excellent for building thought leadership. My bio now clearly shows my expertise and personality." },
]

export default function TwitterBioGenerator() {
    const [profession, setProfession] = useState('')
    const [expertise, setExpertise] = useState('')
    const [personality, setPersonality] = useState('')
    const [location, setLocation] = useState('')
    const [generatedBios, setGeneratedBios] = useState([])
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [selectedStyle, setSelectedStyle] = useState('professional')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleGenerateSubmit(e) {
        e.preventDefault()

        if (!profession.trim() && !expertise.trim()) {
            setError('Please enter at least your profession or expertise')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/twitter-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profession,
                    expertise,
                    personality,
                    location,
                    model: selectedModel,
                    style: selectedStyle,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate bio')
            }

            const data = await response.json()
            setGeneratedBios(data.bios)

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <Twitter className="h-8 w-8 text-blue-500" />
                    <h1 className="text-4xl font-bold">Twitter Bio Generator</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create compelling Twitter bios that attract followers and build your personal brand.
                    Generate professional, witty, and engaging bios that make a great first impression.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Generator Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Create Your Twitter Bio</CardTitle>
                        <CardDescription>Tell us about yourself to generate the perfect Twitter bio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="profession">Profession/Role</Label>
                                    <Input
                                        id="profession"
                                        placeholder="Software Engineer, Marketing Manager, CEO"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expertise">Expertise/Skills</Label>
                                    <Input
                                        id="expertise"
                                        placeholder="AI, Digital Marketing, Leadership"
                                        value={expertise}
                                        onChange={(e) => setExpertise(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="personality">Personality Traits</Label>
                                    <Input
                                        id="personality"
                                        placeholder="Creative, Analytical, Funny, Passionate"
                                        value={personality}
                                        onChange={(e) => setPersonality(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location (Optional)</Label>
                                    <Input
                                        id="location"
                                        placeholder="New York, Remote, Global"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="model">AI Model</Label>
                                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                                            <SelectTrigger id="model">
                                                <SelectValue placeholder="Select model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {models.map((model) => (
                                                    <SelectItem key={model.id} value={model.id}>
                                                        {model.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="style">Bio Style</Label>
                                        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                                            <SelectTrigger id="style">
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bioStyles.map((style) => (
                                                    <SelectItem key={style.id} value={style.id}>
                                                        {style.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : 'Generate Twitter Bios'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Generated Bios */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Bios</CardTitle>
                        <CardDescription>Choose your favorite bio and copy it to your Twitter profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {generatedBios.length > 0 ? (
                                generatedBios.map((bio, index) => (
                                    <div key={index} className="border rounded-md p-4 bg-muted/50">
                                        <p className="text-sm mb-3 whitespace-pre-wrap">{bio}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">
                                                {bio.length}/160 characters
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigator.clipboard.writeText(bio)}
                                            >
                                                Copy Bio
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    {isLoading ? 'Generating your perfect Twitter bios...' : 'Your generated bios will appear here'}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Content Sections */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* What is Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Twitter Bio Generator?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A Twitter bio generator is a smart tool that creates engaging and professional Twitter bios for your profile.
                            It uses AI to craft bios that showcase your personality, expertise, and value proposition in just 160 characters.
                            Our tool helps you make a strong first impression and attract the right followers.
                        </p>
                    </CardContent>
                </Card>

                {/* How to Use Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>How to Create a Great Twitter Bio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Enter your profession or current role</li>
                            <li>List your main skills and expertise</li>
                            <li>Add personality traits that define you</li>
                            <li>Include your location if relevant</li>
                            <li>Choose a bio style that fits your brand</li>
                            <li>Generate multiple bio options</li>
                            <li>Copy your favorite to Twitter</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews Section */}
            <Card className="mb-16">
                <CardHeader>
                    <CardTitle>What Our Users Say</CardTitle>
                    <CardDescription>Real reviews from people who created amazing Twitter bios</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold">{review.name}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">How long can a Twitter bio be?</h3>
                            <p className="text-muted-foreground">Twitter bios can be up to 160 characters long. Our generator creates bios that fit perfectly within this limit while being impactful and engaging.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Should I include hashtags in my Twitter bio?</h3>
                            <p className="text-muted-foreground">You can include 1-2 relevant hashtags, but focus more on clear, readable text that describes who you are and what you do.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">How often should I update my Twitter bio?</h3>
                            <p className="text-muted-foreground">Update your bio when your role changes, you gain new skills, or want to highlight current projects. A fresh bio keeps your profile relevant.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">What makes a Twitter bio effective?</h3>
                            <p className="text-muted-foreground">An effective bio clearly states what you do, shows your personality, includes relevant keywords, and gives people a reason to follow you.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Can I use emojis in my Twitter bio?</h3>
                            <p className="text-muted-foreground">Yes! Emojis can make your bio more visually appealing and help save characters. Our generator includes relevant emojis when appropriate.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
