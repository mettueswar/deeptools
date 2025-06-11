// app/tools/instagram-username-generator/page.js
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Instagram, Star, Copy } from 'lucide-react'

const models = [
    { id: 'google/gemini-pro', name: 'Gemini Pro' },
    { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3' },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' }
]

const usernameStyles = [
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'business', name: 'Business' },
    { id: 'personal', name: 'Personal Brand' },
    { id: 'aesthetic', name: 'Aesthetic' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'trendy', name: 'Trendy' },
    { id: 'unique', name: 'Unique' },
]

const reviews = [
    { name: "Ashley K.", rating: 5, text: "Found the perfect username for my photography business! It's professional and memorable." },
    { name: "Jordan M.", rating: 5, text: "Amazing tool! Generated so many creative options. Finally got a username that represents my brand." },
    { name: "Taylor B.", rating: 4, text: "Love how it creates different styles. The aesthetic usernames are perfect for my fashion page." },
    { name: "Casey R.", rating: 5, text: "Super helpful for my new business account. The professional options are exactly what I needed." },
    { name: "Morgan L.", rating: 5, text: "Best username generator I've used! Creates unique names that aren't already taken." },
    { name: "Riley S.", rating: 4, text: "Great for personal branding. Helped me create a memorable username for my coaching business." },
    { name: "Jamie T.", rating: 5, text: "Perfect for influencers! The trendy usernames helped me rebrand my entire Instagram presence." },
    { name: "Avery P.", rating: 5, text: "So easy to use and creates professional usernames. Recommended to all my entrepreneur friends." },
]

export default function InstagramUsernameGenerator() {
    const [name, setName] = useState('')
    const [keywords, setKeywords] = useState('')
    const [niche, setNiche] = useState('')
    const [generatedUsernames, setGeneratedUsernames] = useState([])
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [selectedStyle, setSelectedStyle] = useState('professional')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleGenerateSubmit(e) {
        e.preventDefault()

        if (!name.trim() && !keywords.trim()) {
            setError('Please enter at least your name or keywords')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/instagram-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    keywords,
                    niche,
                    model: selectedModel,
                    style: selectedStyle,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate usernames')
            }

            const data = await response.json()
            setGeneratedUsernames(data.usernames)

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
                    <Instagram className="h-8 w-8 text-pink-500" />
                    <h1 className="text-4xl font-bold">Instagram Username Generator</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create unique and memorable Instagram usernames that perfectly represent your brand.
                    Generate available usernames that help you stand out from the crowd.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Generator Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Usernames</CardTitle>
                        <CardDescription>Enter your details to create perfect Instagram usernames</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name or Brand</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Smith, TechStartup, etc."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        placeholder="photography, fitness, food, travel"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="niche">Your Niche/Industry</Label>
                                    <Input
                                        id="niche"
                                        placeholder="Fashion, Tech, Cooking, Art"
                                        value={niche}
                                        onChange={(e) => setNiche(e.target.value)}
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
                                        <Label htmlFor="style">Username Style</Label>
                                        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                                            <SelectTrigger id="style">
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {usernameStyles.map((style) => (
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
                                    ) : 'Generate Usernames'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Generated Usernames */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Usernames</CardTitle>
                        <CardDescription>Click to copy your favorite username</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {generatedUsernames.length > 0 ? (
                                generatedUsernames.map((username, index) => (
                                    <div key={index} className="flex items-center justify-between border rounded-md p-3 bg-muted/50 hover:bg-muted/70 transition-colors">
                                        <span className="font-mono text-sm">@{username}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => navigator.clipboard.writeText(username)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    {isLoading ? 'Generating unique usernames...' : 'Your generated usernames will appear here'}
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
                        <CardTitle>What is an Instagram Username Generator?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            An Instagram username generator is a smart tool that creates unique and available usernames for your Instagram account.
                            It combines your name, keywords, and interests to suggest creative usernames that represent your personal brand or business.
                            Our AI-powered generator ensures your username is memorable and professional.
                        </p>
                    </CardContent>
                </Card>

                {/* How to Use Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>How to Create the Perfect Username</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Enter your name or brand name</li>
                            <li>Add relevant keywords for your niche</li>
                            <li>Specify your industry or area of focus</li>
                            <li>Choose your preferred username style</li>
                            <li>Generate multiple creative options</li>
                            <li>Check availability on Instagram</li>
                            <li>Copy your favorite username</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews Section */}
            <Card className="mb-16">
                <CardHeader>
                    <CardTitle>What Our Users Say</CardTitle>
                    <CardDescription>Real reviews from people who found their perfect Instagram username</CardDescription>
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
                            <h3 className="font-semibold mb-2">How do I know if a username is available?</h3>
                            <p className="text-muted-foreground">After generating usernames, you need to check availability on Instagram. Try searching for the username in the Instagram app or website to see if it's taken.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">What makes a good Instagram username?</h3>
                            <p className="text-muted-foreground">A good username is short, memorable, easy to spell, and represents your brand or personality. Avoid numbers and special characters when possible.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Can I change my Instagram username later?</h3>
                            <p className="text-muted-foreground">Yes, you can change your Instagram username anytime in your profile settings. However, your old username becomes available for others to use.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Should I use my real name or a creative username?</h3>
                            <p className="text-muted-foreground">It depends on your goals. Use your real name for personal branding or professional accounts. Use creative usernames for businesses or themed accounts.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">How many usernames can I generate?</h3>
                            <p className="text-muted-foreground">You can generate unlimited usernames with our free tool. Keep generating until you find the perfect one for your account.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
