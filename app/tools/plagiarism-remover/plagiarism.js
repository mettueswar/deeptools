// app/tools/plagiarism-remover/page.js
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

// Available models via OpenRouter
const models = [
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus' },
    { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'google/gemini-pro', name: 'Gemini Pro' },
    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
]

const transformationLevels = [
    { id: 'light', name: 'Light (Maintain most structure)' },
    { id: 'moderate', name: 'Moderate (Balance original and new)' },
    { id: 'heavy', name: 'Heavy (Completely transform)' },
]

export default function PlagiarismRemoverPage() {
    const [originalText, setOriginalText] = useState('')
    const [transformedText, setTransformedText] = useState('')
    const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')
    const [transformationLevel, setTransformationLevel] = useState('moderate')
    const [uniquenessScore, setUniquenessScore] = useState(70)
    const [preserveMeaning, setPreserveMeaning] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [wordCount, setWordCount] = useState(0)

    // Update word count as user types
    const handleTextChange = (e) => {
        const text = e.target.value
        setOriginalText(text)
        setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length)
    }

    async function handleTransformSubmit(e) {
        e.preventDefault()

        if (!originalText.trim()) {
            setError('Please enter text to transform')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/remove-plagiarism', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: originalText,
                    model: selectedModel,
                    transformationLevel,
                    uniquenessScore,
                    preserveMeaning,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to transform text')
            }

            const data = await response.json()
            setTransformedText(data.transformedText)

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">AI Plagiarism Remover</h1>
            <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
                Transform your text to remove potential plagiarism while preserving the original meaning.
                Our AI will rewrite your content to make it unique and pass plagiarism checks.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Original Text</CardTitle>
                        <CardDescription>Enter the text you want to make unique</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTransformSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="original-text">Your Text</Label>
                                        <span className="text-sm text-muted-foreground">{wordCount} words</span>
                                    </div>
                                    <Textarea
                                        id="original-text"
                                        placeholder="Paste the text you want to make unique..."
                                        value={originalText}
                                        onChange={handleTextChange}
                                        rows={8}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="space-y-4">
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
                                        <Label htmlFor="transformation">Transformation Level</Label>
                                        <Select value={transformationLevel} onValueChange={setTransformationLevel}>
                                            <SelectTrigger id="transformation">
                                                <SelectValue placeholder="Select transformation level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {transformationLevels.map((level) => (
                                                    <SelectItem key={level.id} value={level.id}>
                                                        {level.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label htmlFor="uniqueness">Uniqueness Score: {uniquenessScore}%</Label>
                                        </div>
                                        <Slider
                                            id="uniqueness"
                                            defaultValue={[70]}
                                            min={50}
                                            max={100}
                                            step={5}
                                            onValueChange={(value) => setUniquenessScore(value[0])}
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>50% (More Similar)</span>
                                            <span>100% (Completely Unique)</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="preserve-meaning"
                                            checked={preserveMeaning}
                                            onChange={(e) => setPreserveMeaning(e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <Label htmlFor="preserve-meaning">Preserve original meaning</Label>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Transforming...
                                        </>
                                    ) : 'Remove Plagiarism'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Transformed Text</CardTitle>
                        <CardDescription>AI-generated unique version of your text</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-md p-4 h-96 overflow-y-auto bg-muted/50">
                            {transformedText ? (
                                <div>
                                    <p className="whitespace-pre-wrap">{transformedText}</p>
                                    {transformedText && (
                                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <p className="text-sm text-green-800">
                                                <span className="font-medium">Plagiarism-free:</span> This text has been transformed to be unique while preserving the original meaning.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center h-full flex items-center justify-center">
                                    {isLoading ? 'Generating unique text...' : 'Your transformed text will appear here'}
                                </p>
                            )}
                        </div>

                        {transformedText && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOriginalText(transformedText);
                                        setTransformedText('');
                                        setWordCount(transformedText.trim() === '' ? 0 : transformedText.trim().split(/\s+/).length);
                                    }}
                                >
                                    Edit Further
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(transformedText);
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