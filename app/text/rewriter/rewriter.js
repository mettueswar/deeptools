//app/tools/rewriter/page.js



'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Copy, Download, RefreshCw, Wand2, Settings, History, BookOpen } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Updated models list with best free OpenRouter models
const models = [
    { id: 'deepseek/deepseek-chat:free', name: 'DeepSeek Chat', category: 'DeepSeek', free: true },
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', category: 'Google', free: true },
    { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B', category: 'Alibaba', free: true },
    { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', category: 'Meta', free: true },
    { id: 'microsoft/phi-3-medium-128k-instruct:free', name: 'Phi-3 Medium', category: 'Microsoft', free: true },
    { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', category: 'Mistral', free: true },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', category: 'Anthropic', free: false },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', category: 'Anthropic', free: false }
]

const tones = [
    { id: 'professional', name: 'Professional', description: 'Formal and business-appropriate' },
    { id: 'casual', name: 'Casual', description: 'Friendly and conversational' },
    { id: 'academic', name: 'Academic', description: 'Scholarly and research-oriented' },
    { id: 'creative', name: 'Creative', description: 'Artistic and imaginative' },
    { id: 'persuasive', name: 'Persuasive', description: 'Compelling and convincing' },
    { id: 'technical', name: 'Technical', description: 'Precise and detailed' },
    { id: 'humorous', name: 'Humorous', description: 'Light-hearted and entertaining' },
    { id: 'empathetic', name: 'Empathetic', description: 'Understanding and compassionate' }
]

const rewriteStyles = [
    { id: 'improve', name: 'Improve & Enhance', description: 'Make it better while keeping the meaning' },
    { id: 'simplify', name: 'Simplify', description: 'Make it easier to understand' },
    { id: 'expand', name: 'Expand', description: 'Add more detail and context' },
    { id: 'summarize', name: 'Summarize', description: 'Make it more concise' },
    { id: 'rephrase', name: 'Rephrase', description: 'Say it differently' },
    { id: 'formalize', name: 'Formalize', description: 'Make it more formal' },
    { id: 'modernize', name: 'Modernize', description: 'Update language and style' }
]

export default function RewriterPage() {
    const [originalText, setOriginalText] = useState('')
    const [rewrittenText, setRewrittenText] = useState('')
    const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-chat:free')
    const [selectedTone, setSelectedTone] = useState('professional')
    const [selectedStyle, setSelectedStyle] = useState('improve')
    const [creativity, setCreativity] = useState([0.7])
    const [preserveLength, setPreserveLength] = useState(false)
    const [targetLength, setTargetLength] = useState([100])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [wordCount, setWordCount] = useState(0)
    const [charCount, setCharCount] = useState(0)
    const [history, setHistory] = useState([])
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [customInstructions, setCustomInstructions] = useState('')

    // Fix initial model loading bug
    useEffect(() => {
        // Ensure the initial model is properly set
        if (!selectedModel) {
            setSelectedModel('deepseek/deepseek-chat:free')
        }
    }, [])

    // Update word and character count
    useEffect(() => {
        const words = originalText.trim().split(/\s+/).filter(word => word.length > 0).length
        setWordCount(originalText.trim() === '' ? 0 : words)
        setCharCount(originalText.length)
    }, [originalText])

    async function handleRewriteSubmit(e) {
        e.preventDefault()

        if (!originalText.trim()) {
            setError('Please enter text to rewrite')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const requestBody = {
                text: originalText,
                model: selectedModel,
                tone: selectedTone,
                style: selectedStyle,
                creativity: creativity[0],
                preserveLength,
                targetLength: targetLength[0],
                customInstructions: customInstructions.trim()
            }

            const response = await fetch('/api/rewrite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'Failed to rewrite text')
            }

            const data = await response.json()
            setRewrittenText(data.rewrittenText)

            // Add to history
            const historyItem = {
                id: Date.now(),
                original: originalText,
                rewritten: data.rewrittenText,
                model: selectedModel,
                tone: selectedTone,
                style: selectedStyle,
                timestamp: new Date().toISOString()
            }
            setHistory(prev => [historyItem, ...prev.slice(0, 9)]) // Keep last 10 items

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
    }

    function downloadText(text, filename = 'rewritten-text.txt') {
        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    function loadFromHistory(item) {
        setOriginalText(item.original)
        setRewrittenText(item.rewritten)
        setSelectedModel(item.model)
        setSelectedTone(item.tone)
        setSelectedStyle(item.style)
    }

    function clearHistory() {
        setHistory([])
    }

    function resetForm() {
        setOriginalText('')
        setRewrittenText('')
        setError(null)
        setCreativity([0.7])
        setPreserveLength(false)
        setTargetLength([100])
        setCustomInstructions('')
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI Paragraph Rewriter Pro
                </h1>
                <p className="text-gray-600 text-lg">Transform your text with advanced AI models and customizable settings</p>
            </div>

            <Tabs defaultValue="rewrite" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rewrite" className="flex items-center gap-2">
                        <Wand2 className="h-4 w-4" />
                        Rewrite
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center gap-2">
                        <History className="h-4 w-4" />
                        History
                    </TabsTrigger>
                    <TabsTrigger value="guide" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Guide
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="rewrite" className="mt-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Original Text
                                    <div className="flex gap-2">
                                        <Badge variant="outline">{wordCount} words</Badge>
                                        <Badge variant="outline">{charCount} chars</Badge>
                                    </div>
                                </CardTitle>
                                <CardDescription>Enter the text you want to rewrite</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleRewriteSubmit}>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="original-text">Your Text</Label>
                                            <Textarea
                                                id="original-text"
                                                placeholder="Enter the text you want to rewrite..."
                                                value={originalText}
                                                onChange={(e) => setOriginalText(e.target.value)}
                                                rows={8}
                                                className="resize-none h-40"
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
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span>{model.name}</span>
                                                                    {model.free && <Badge variant="secondary" className="ml-2">Free</Badge>}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="style">Rewrite Style</Label>
                                                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                                                    <SelectTrigger id="style">
                                                        <SelectValue placeholder="Select style" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {rewriteStyles.map((style) => (
                                                            <SelectItem key={style.id} value={style.id}>
                                                                {style.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tone">Writing Tone</Label>
                                            <Select value={selectedTone} onValueChange={setSelectedTone}>
                                                <SelectTrigger id="tone">
                                                    <SelectValue placeholder="Select tone" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tones.map((tone) => (
                                                        <SelectItem key={tone.id} value={tone.id}>
                                                            {tone.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label className="flex items-center gap-2">
                                                <Settings className="h-4 w-4" />
                                                Advanced Settings
                                            </Label>
                                            <Switch
                                                checked={showAdvanced}
                                                onCheckedChange={setShowAdvanced}
                                            />
                                        </div>

                                        {showAdvanced && (
                                            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                                <div className="space-y-2">
                                                    <Label>Creativity Level: {creativity[0]}</Label>
                                                    <Slider
                                                        value={creativity}
                                                        onValueChange={setCreativity}
                                                        max={1}
                                                        min={0}
                                                        step={0.1}
                                                        className="w-full"
                                                    />
                                                    <p className="text-xs text-gray-500">Higher values = more creative output</p>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="preserve-length"
                                                        checked={preserveLength}
                                                        onCheckedChange={setPreserveLength}
                                                    />
                                                    <Label htmlFor="preserve-length">Preserve original length</Label>
                                                </div>

                                                {!preserveLength && (
                                                    <div className="space-y-2">
                                                        <Label>Target Length: ~{targetLength[0]} words</Label>
                                                        <Slider
                                                            value={targetLength}
                                                            onValueChange={setTargetLength}
                                                            max={500}
                                                            min={10}
                                                            step={10}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <Label htmlFor="custom-instructions">Custom Instructions</Label>
                                                    <Textarea
                                                        id="custom-instructions"
                                                        placeholder="Add any specific requirements or instructions..."
                                                        value={customInstructions}
                                                        onChange={(e) => setCustomInstructions(e.target.value)}
                                                        rows={3}
                                                        className="resize-none"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {error && (
                                            <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        )}

                                        <div className="flex gap-2">
                                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Rewriting...
                                                    </>
                                                ) : 'Rewrite Text'}
                                            </Button>
                                            <Button type="button" variant="outline" onClick={resetForm}>
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Rewritten Text</CardTitle>
                                <CardDescription>AI-generated rewrite of your text</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-md p-4 h-64 overflow-y-auto bg-muted/50">
                                    {rewrittenText ? (
                                        <p className="whitespace-pre-wrap">{rewrittenText}</p>
                                    ) : (
                                        <p className="text-muted-foreground text-center h-full flex items-center justify-center">
                                            {isLoading ? 'Generating rewrite...' : 'Your rewritten text will appear here'}
                                        </p>
                                    )}
                                </div>

                                {rewrittenText && (
                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(rewrittenText)}
                                            className="flex-1"
                                        >
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => downloadText(rewrittenText)}
                                            className="flex-1"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Rewrite History</CardTitle>
                                    <CardDescription>Your recent rewriting sessions</CardDescription>
                                </div>
                                {history.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={clearHistory}>
                                        Clear History
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {history.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No history yet. Start rewriting to see your sessions here.</p>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((item) => (
                                        <div key={item.id} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex gap-2">
                                                    <Badge variant="outline">{item.model.split('/')[1] || item.model}</Badge>
                                                    <Badge variant="secondary">{item.tone}</Badge>
                                                    <Badge variant="secondary">{item.style}</Badge>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => loadFromHistory(item)}
                                                >
                                                    Load
                                                </Button>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="font-medium mb-1">Original:</p>
                                                    <p className="text-muted-foreground line-clamp-3">{item.original}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium mb-1">Rewritten:</p>
                                                    <p className="text-muted-foreground line-clamp-3">{item.rewritten}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {new Date(item.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="guide" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>How to Use the AI Rewriter</CardTitle>
                            <CardDescription>Tips and tricks for getting the best results</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Choosing the Right Model</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• <strong>Gemini 2.0 Flash:</strong> Great all-around model, fast and creative</li>
                                    <li>• <strong>DeepSeek Chat:</strong> Excellent for technical and detailed content</li>
                                    <li>• <strong>Qwen 2.5 72B:</strong> Powerful for complex rewriting tasks</li>
                                    <li>• <strong>Claude 3 Sonnet/Opus:</strong> Premium options for highest quality</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Rewrite Styles Explained</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• <strong>Improve & Enhance:</strong> Keeps the same length but improves clarity and flow</li>
                                    <li>• <strong>Simplify:</strong> Uses simpler words and shorter sentences</li>
                                    <li>• <strong>Expand:</strong> Adds more detail and examples</li>
                                    <li>• <strong>Summarize:</strong> Condenses to key points</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Advanced Settings</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• <strong>Creativity Level:</strong> 0.3-0.5 for formal content, 0.7-1.0 for creative writing</li>
                                    <li>• <strong>Custom Instructions:</strong> Add specific requirements like "avoid passive voice" or "use more examples"</li>
                                    <li>• <strong>Target Length:</strong> Specify word count when you need specific length</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}