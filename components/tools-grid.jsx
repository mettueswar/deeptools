import React from 'react';
import { MessageCircle, PenToolIcon, PenTool, User, Twitter, Facebook, Instagram } from 'lucide-react';

const tools = [
    {
        name: 'SMS Bomber',
        description: 'Send multiple SMS to a number instantly for testing purposes.',
        icon: <MessageCircle className="w-10 h-10 text-blue-500" />,
        link: '/sms-bomber'
    },
    {
        name: 'AI Rewriter',
        description: 'Rewrite the paragraphs / article in your favourite style.',
        icon: <PenToolIcon className="w-10 h-10 text-red-500" />,
        link: '/rewriter'
    },
    {
        name: 'AI Paragraph Writer',
        description: 'Generate high-quality paragraphs using AI.',
        icon: <PenTool className="w-10 h-10 text-green-500" />,
        link: '/ai-paragraph-writer'
    },
    {
        name: 'Instagram Bio Generator',
        description: 'Create a catchy Instagram bio in seconds.',
        icon: <User className="w-10 h-10 text-purple-500" />,
        link: '/instagram-bio-generator'
    },
    {
        name: 'Instagram Username Generator',
        description: 'Generate unlimited Instagram user names with simple tricks.',
        icon: <Instagram className="w-10 h-10 text-purple-500" />,
        link: '/instagram-username-generator'
    },
    {
        name: 'Facebook Bio Generator',
        description: 'Make sure to use Facebook Bio Generator for amazing bio on social media.',
        icon: <Facebook className="w-10 h-10 text-purple-500" />,
        link: '/facebook-bio-generator'
    },
    {
        name: 'Twitter Bio Generator',
        description: 'Generate stunning biography of twitter user based on Inputs.',
        icon: <Twitter className="w-10 h-10 text-purple-500" />,
        link: '/twitter-bio-generator'
    }
];

export default function ToolsGrid() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">🔎 Explore All Tools</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {tools.map((tool, index) => (
                    <a
                        key={index}
                        href={tool.link}
                        className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-start space-x-4 border border-gray-200 hover:border-blue-400"
                    >
                        <div className="shrink-0">
                            {tool.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">{tool.name}</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
