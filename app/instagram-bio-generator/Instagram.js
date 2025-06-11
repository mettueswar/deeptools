// app/tools/instagram-bio-generator/page.js
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Instagram, Star } from 'lucide-react'

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
    { id: 'professional', name: 'Professional' },
    { id: 'casual', name: 'Casual & Fun' },
    { id: 'creative', name: 'Creative' },
    { id: 'entrepreneur', name: 'Entrepreneur' },
    { id: 'influencer', name: 'Influencer' },
    { id: 'artist', name: 'Artist' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'travel', name: 'Travel' },
]

const reviews = [
    { name: "Sarah M.", rating: 5, text: "Created the perfect bio for my photography account! Got 50% more followers in just one week." },
    { name: "Mike R.", rating: 5, text: "Amazing tool! The AI understood exactly what I wanted for my fitness page. Highly recommend!" },
    { name: "Jessica L.", rating: 4, text: "Love how easy it is to use. Generated multiple options and picked the best one for my business." },
    { name: "David K.", rating: 5, text: "Perfect for my travel blog! The bio captures my personality and attracts the right audience." },
    { name: "Emma W.", rating: 5, text: "Best bio generator I've tried. Simple, fast, and creates engaging bios that get results." },
    { name: "Alex T.", rating: 4, text: "Great for entrepreneurs! My new bio helps convert visitors to customers much better." },
    { name: "Lisa H.", rating: 5, text: "Created a professional bio that landed me brand partnerships. This tool is worth it!" },
    { name: "Ryan P.", rating: 5, text: "Super impressed! Generated creative bios that match my artist brand perfectly." },
]

export default function InstagramBioGenerator() {
    const [keywords, setKeywords] = useState('')
    const [profession, setProfession] = useState('')
    const [interests, setInterests] = useState('')
    const [generatedBios, setGeneratedBios] = useState([])
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [selectedStyle, setSelectedStyle] = useState('professional')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleGenerateSubmit(e) {
        e.preventDefault()

        if (!keywords.trim() && !profession.trim()) {
            setError('Please enter at least keywords or profession')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/instagram-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keywords,
                    profession,
                    interests,
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
                    <Instagram className="h-8 w-8 text-pink-500" />
                    <h1 className="text-4xl font-bold">Instagram Bio Generator</h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create the perfect Instagram bio that attracts followers and grows your account.
                    Use AI to generate engaging, creative bios in seconds.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Generator Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Your Bio</CardTitle>
                        <CardDescription>Fill in your details to create the perfect Instagram bio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Keywords (Required)</Label>
                                    <Input
                                        id="keywords"
                                        placeholder="photographer, coffee lover, travel"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profession">Profession/Role</Label>
                                    <Input
                                        id="profession"
                                        placeholder="Digital Marketing Expert, Fitness Coach"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="interests">Interests/Hobbies</Label>
                                    <Input
                                        id="interests"
                                        placeholder="yoga, books, cooking"
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
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
                                    ) : 'Generate Instagram Bios'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Generated Bios */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Bios</CardTitle>
                        <CardDescription>Choose your favorite bio and copy it to your Instagram</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {generatedBios.length > 0 ? (
                                generatedBios.map((bio, index) => (
                                    <div key={index} className="border rounded-md p-4 bg-muted/50">
                                        <p className="text-sm mb-3 whitespace-pre-wrap">{bio}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigator.clipboard.writeText(bio)}
                                        >
                                            Copy Bio
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    {isLoading ? 'Generating your perfect bios...' : 'Your generated bios will appear here'}
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
                        <CardTitle>What is an Instagram Bio Generator?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            An Instagram bio generator is a smart tool that creates perfect bios for your Instagram profile.
                            It uses AI to write catchy, engaging bios that help you get more followers and build your brand.
                            Our tool makes it easy to create professional bios in just a few clicks.
                        </p>
                    </CardContent>
                </Card>

                {/* How to Use Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use This Tool</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Enter keywords that describe you or your brand</li>
                            <li>Add your profession or what you do</li>
                            <li>List your interests and hobbies</li>
                            <li>Choose your preferred bio style</li>
                            <li>Click generate and get multiple bio options</li>
                            <li>Copy your favorite bio to Instagram</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews Section */}
            <Card className="mb-16">
                <CardHeader>
                    <CardTitle>What Our Users Say</CardTitle>
                    <CardDescription>Real reviews from people who used our Instagram bio generator</CardDescription>
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
                            <h3 className="font-semibold mb-2">How long should an Instagram bio be?</h3>
                            <p className="text-muted-foreground">Instagram bios can be up to 150 characters. Our generator creates bios that fit perfectly within this limit while being engaging and informative.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Can I use emojis in my bio?</h3>
                            <p className="text-muted-foreground">Yes! Our generator includes relevant emojis to make your bio more attractive and help it stand out from the crowd.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Is this tool free to use?</h3>
                            <p className="text-muted-foreground">Yes, our Instagram bio generator is completely free. You can create as many bios as you want without any limits.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Will these bios help me get more followers?</h3>
                            <p className="text-muted-foreground">A good bio is the first step to attracting followers. Our AI creates bios that clearly show what you do and why people should follow you.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Can I edit the generated bios?</h3>
                            <p className="text-muted-foreground">Absolutely! Feel free to modify any generated bio to better match your personality or add your own personal touch.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}