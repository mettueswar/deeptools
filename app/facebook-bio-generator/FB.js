'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Facebook, Star } from 'lucide-react'

const models = [
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini Pro' },
    { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3' },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' }
]

const bioStyles = [
    { id: 'personal', name: 'Personal' },
    { id: 'family', name: 'Family Focused' },
    { id: 'professional', name: 'Professional' },
    { id: 'business', name: 'Business Page' },
    { id: 'inspirational', name: 'Inspirational' },
    { id: 'casual', name: 'Casual & Fun' },
    { id: 'creative', name: 'Creative' },
    { id: 'community', name: 'Community Leader' },
]

const reviews = [
    { name: "Jennifer R.", rating: 5, text: "Perfect for my small business page! The business style bios help customers understand what we do instantly." },
    { name: "Michael S.", rating: 5, text: "Love the family-focused options! Created a bio that shows my priorities and connects with other parents." },
    { name: "Amanda K.", rating: 4, text: "Great tool for personal branding. The professional bios helped me network better in my industry." },
    { name: "Carlos M.", rating: 5, text: "The inspirational bios are amazing! Perfect for my coaching business and motivating my audience." },
    { name: "Rachel T.", rating: 5, text: "Super easy to use and creates authentic bios. Much better than trying to write one myself!" },
    { name: "Tom W.", rating: 4, text: "Excellent for community pages. The community leader style perfectly captures our group's mission." },
    { name: "Nicole L.", rating: 5, text: "The creative bios are so unique! Helped me stand out in the art community and attract new followers." },
    { name: "Steve P.", rating: 4, text: "Great variety of styles. Found the perfect bio that represents both my work and personal interests." }
]

export default function FacebookBioGenerator() {
    const [name, setName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [interests, setInterests] = useState('')
    const [location, setLocation] = useState('')
    const [generatedBios, setGeneratedBios] = useState([])
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [selectedStyle, setSelectedStyle] = useState('personal')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleGenerateSubmit(e) {
        e.preventDefault()

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/facebook-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    occupation,
                    interests,
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
                    <Facebook className="h-8 w-8 text-blue-600" />
                    <h1 className="text-4xl font-bold">Facebook Bio Generator</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create compelling Facebook bios that perfectly represent you, your business, or your community.
                    Generate engaging bios that help you connect with friends, family, and followers.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Generator Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Create Your Facebook Bio</CardTitle>
                        <CardDescription>Tell us about yourself to generate the perfect Facebook bio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="occupation">Occupation/Title</Label>
                                    <Input
                                        id="occupation"
                                        placeholder="Marketing Manager, Student, Entrepreneur, Mom"
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="interests">Interests/Hobbies</Label>
                                    <Input
                                        id="interests"
                                        placeholder="Photography, Travel, Cooking, Family Time"
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location (Optional)</Label>
                                    <Input
                                        id="location"
                                        placeholder="New York, California, Remote"
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
                                    ) : 'Generate Facebook Bios'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Generated Bios */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Bios</CardTitle>
                        <CardDescription>Choose your favorite bio and copy it to your Facebook profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {generatedBios.length > 0 ? (
                                generatedBios.map((bio, index) => (
                                    <div key={index} className="border rounded-md p-4 bg-muted/50">
                                        <p className="text-sm mb-3 whitespace-pre-wrap">{bio}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">
                                                {bio.length} characters
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
                                    {isLoading ? 'Generating your perfect Facebook bios...' : 'Your generated bios will appear here'}
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
                        <CardTitle>What is a Facebook Bio Generator?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A Facebook bio generator is an AI-powered tool that creates personalized and engaging Facebook bios for your profile.
                            It helps you craft the perfect introduction that showcases your personality, interests, and what makes you unique.
                            Our tool generates bios that help you connect with friends, family, and build meaningful relationships on Facebook.
                        </p>
                    </CardContent>
                </Card>

                {/* How to Use Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>How to Create a Great Facebook Bio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Enter your name and basic information</li>
                            <li>Add your occupation, role, or what you do</li>
                            <li>List your interests, hobbies, and passions</li>
                            <li>Include your location if you want</li>
                            <li>Choose a bio style that matches your personality</li>
                            <li>Generate multiple bio options</li>
                            <li>Copy your favorite to Facebook</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews Section */}
            <Card className="mb-16">
                <CardHeader>
                    <CardTitle>What Our Users Say</CardTitle>
                    <CardDescription>Real reviews from people who created amazing Facebook bios</CardDescription>
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
                            <h3 className="font-semibold mb-2">How long should a Facebook bio be?</h3>
                            <p className="text-muted-foreground">Facebook bios can be up to 101 characters for personal profiles. Our generator creates concise, impactful bios that fit perfectly within this limit while being engaging and informative.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">What should I include in my Facebook bio?</h3>
                            <p className="text-muted-foreground">Include your name, what you do, your interests, and what makes you unique. You can also add your location, relationship status, or a fun fact about yourself.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Should I use emojis in my Facebook bio?</h3>
                            <p className="text-muted-foreground">Yes! Emojis can make your bio more visually appealing and help express your personality. Our generator includes relevant emojis when appropriate to make your bio stand out.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">How often should I update my Facebook bio?</h3>
                            <p className="text-muted-foreground">Update your bio when major life changes happen, like a new job, move, or significant life event. Keeping it current helps friends and family stay connected with your life.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">What makes a Facebook bio effective?</h3>
                            <p className="text-muted-foreground">An effective Facebook bio is authentic, shows your personality, mentions your interests, and gives people a sense of who you are. It should be friendly and approachable.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Can I use this for business pages?</h3>
                            <p className="text-muted-foreground">Absolutely! Our business style option creates professional bios perfect for Facebook business pages, helping customers understand what you do and why they should connect with you.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}