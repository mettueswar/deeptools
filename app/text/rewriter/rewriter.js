// app/tools/rewriter/page.js
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

// Available models via OpenRouter
const models = [
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0' },

    { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3' },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'qwen/qwen3-14b:free', name: 'Qwen 3' },

    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' }
]

const tones = [
    { id: 'professional', name: 'Professional' },
    { id: 'casual', name: 'Casual' },
    { id: 'academic', name: 'Academic' },
    { id: 'creative', name: 'Creative' },
    { id: 'persuasive', name: 'Persuasive' },
]

export default function RewriterPage() {
    const [originalText, setOriginalText] = useState('')
    const [rewrittenText, setRewrittenText] = useState('')
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [selectedTone, setSelectedTone] = useState('professional')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleRewriteSubmit(e) {
        e.preventDefault()

        if (!originalText.trim()) {
            setError('Please enter text to rewrite')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/rewrite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: originalText,
                    model: selectedModel,
                    tone: selectedTone,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to rewrite text')
            }

            const data = await response.json()
            setRewrittenText(data.rewrittenText)

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">AI Paragraph Rewriter</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Original Text</CardTitle>
                        <CardDescription>Enter the paragraph you want to rewrite</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRewriteSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="original-text">Your Text</Label>
                                    <Textarea
                                        id="original-text"
                                        placeholder="Enter the text you want to rewrite..."
                                        value={originalText}
                                        onChange={(e) => setOriginalText(e.target.value)}
                                        rows={8}
                                        className="resize-none"
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
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Rewriting...
                                        </>
                                    ) : 'Rewrite Text'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rewritten Text</CardTitle>
                        <CardDescription>AI-generated rewrite of your paragraph</CardDescription>
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
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        navigator.clipboard.writeText(rewrittenText);
                                    }}
                                >
                                    Copy to Clipboard
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}