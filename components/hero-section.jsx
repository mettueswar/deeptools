"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HeroSection() {
    const words = ["Productivity", "Creativity", "Writing", "Content", "Workflow"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const word = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(word.substring(0, currentText.length - 1));
                setTypingSpeed(80);
            } else {
                setCurrentText(word.substring(0, currentText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && currentText === word) {
                setTimeout(() => setIsDeleting(true), 1500);
            }
            else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((currentWordIndex + 1) % words.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

    return (
        <div className="w-full bg-gradient-to-b from-white to-gray-100 py-10 md:py-14 text-center relative overflow-hidden">
            {/* Background shape decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-70 translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">


                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Enhance Your <span className="relative">
                        <span className="inline-block min-w-24 text-left text-blue-800">{currentText}</span>
                        <span className="absolute -right-2 top-0 h-full w-1 bg-purple-600 animate-blink"></span>
                    </span> with AI
                </h1>

                <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">
                    Access powerful AI tools to boost your workflow, creativity, and efficiency.
                </p>



                {/* Compact stats section */}
                <div className="mt-6 flex justify-center space-x-8 border-t border-gray-200 pt-4 max-w-lg mx-auto">
                    <div>
                        <p className="text-xl font-bold text-indigo-600">10+</p>
                        <p className="text-xs text-gray-600">AI Tools</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold text-indigo-600">24/7</p>
                        <p className="text-xs text-gray-600">Availability</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold text-indigo-600">100K+</p>
                        <p className="text-xs text-gray-600">Users</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


