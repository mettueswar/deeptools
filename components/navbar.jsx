'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [tools, setTools] = useState([]);
    const [filteredTools, setFilteredTools] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
    const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const toolsMenuRef = useRef(null);
    const resourcesMenuRef = useRef(null);
    const searchRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Static navigation items
    const directLinks = [
        { name: 'Home', url: '/' },
        // { name: 'About', url: '/about' },
        // { name: 'Contact', url: '/contact' }
    ];

    const resourcesMenu = [
        {
            category: 'Documentation',
            items: [
                { name: 'API Reference', url: '/docs/api' },
                { name: 'User Guide', url: '/docs/guide' },
                { name: 'Tutorials', url: '/docs/tutorials' }
            ]
        },
        {
            category: 'Community',
            items: [
                { name: 'Blog', url: '/blog' },
                { name: 'Forums', url: '/forums' },
                { name: 'GitHub', url: 'https://github.com' }
            ]
        },
        {
            category: 'Support',
            items: [
                { name: 'Help Center', url: '/help' },
                { name: 'Contact Support', url: '/support' },
                { name: 'Status Page', url: '/status' }
            ]
        }
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Search tools from JSON file
    const searchTools = async (query) => {
        if (!query.trim()) {
            setFilteredTools([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch('tools.json');
            const toolsData = await response.json();

            const filtered = toolsData.filter((tool) =>
                tool.name.toLowerCase().includes(query.toLowerCase()) ||
                (tool.description && tool.description.toLowerCase().includes(query.toLowerCase()))
            );

            setFilteredTools(filtered);
        } catch (error) {
            console.error('Error searching tools:', error);
            setFilteredTools([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            searchTools(searchTerm);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    // Fetch tools for menu display
    useEffect(() => {
        fetch('tools.json')
            .then((res) => res.json())
            .then(setTools)
            .catch(console.error);
    }, []);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
                setToolsMenuOpen(false);
            }
            if (resourcesMenuRef.current && !resourcesMenuRef.current.contains(event.target)) {
                setResourcesMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchTerm('');
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menus on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);
                setToolsMenuOpen(false);
                setResourcesMenuOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredTools([]);
    };

    const handleLinkClick = () => {
        setSearchTerm('');
        setMobileOpen(false);
        setToolsMenuOpen(false);
        setResourcesMenuOpen(false);
    };

    return (
        <nav className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
            ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
                : 'bg-white shadow-md'
            }
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Search */}
                    <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0">
                            <Link
                                href="/"
                                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                📝 DeepTools.org
                            </Link>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:block relative" ref={searchRef}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search tools..."
                                    className="w-80 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            {searchTerm && (
                                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 shadow-xl rounded-xl py-2 w-full max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                                    {isSearching ? (
                                        <div className="px-4 py-3 text-gray-500 text-center">
                                            <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                                            <span className="mt-2 block">Searching...</span>
                                        </div>
                                    ) : filteredTools.length > 0 ? (
                                        <>
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                                {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''}
                                            </div>
                                            {filteredTools.map((tool) => (
                                                <Link
                                                    key={tool.name}
                                                    href={tool.url}
                                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                                                    onClick={handleLinkClick}
                                                >
                                                    <div className="text-gray-900 font-bold">{tool.name}</div>
                                                    {tool.description && (
                                                        <div className="text-sm text-gray-500 mt-1">{tool.description}</div>
                                                    )}
                                                </Link>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.291M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-gray-500 font-medium">No tools found</p>
                                            <p className="text-sm text-gray-400 mt-1">Try searching with different keywords</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Direct Links */}
                        {directLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                className="px-3 py-2 rounded-lg cursor-pointer text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                                onClick={handleLinkClick}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Tools Dropdown */}
                        <div className="relative" ref={toolsMenuRef}>
                            <button
                                onClick={() => {
                                    setToolsMenuOpen(!toolsMenuOpen);
                                    setResourcesMenuOpen(false);
                                }}
                                className="flex items-center space-x-1 px-3 py-2 cursor-pointer rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                                aria-expanded={toolsMenuOpen}
                                aria-haspopup="true"
                            >
                                <span>Tools</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${toolsMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {toolsMenuOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 shadow-xl rounded-xl py-2 w-80 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        Available Tools ({tools.length})
                                    </div>
                                    {tools.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-1 p-2">
                                            {tools.slice(0, 12).map((tool) => (
                                                <Link
                                                    key={tool.name}
                                                    href={tool.url}
                                                    className="block px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                                                    onClick={handleLinkClick}
                                                >
                                                    <div className="font-medium text-gray-900 text-sm">{tool.name}</div>
                                                    {tool.description && (
                                                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{tool.description}</div>
                                                    )}
                                                </Link>
                                            ))}
                                            {tools.length > 12 && (
                                                <Link
                                                    href="/tools"
                                                    className="block px-3 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 border-t border-gray-100 mt-2 pt-3"
                                                    onClick={handleLinkClick}
                                                >
                                                    <span className="text-sm font-medium">View All {tools.length} Tools →</span>
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-3 text-gray-500 text-center">Loading tools...</div>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* 
                        Resources Dropdown
                        <div className="relative" ref={resourcesMenuRef}>
                            <button
                                onClick={() => {
                                    setResourcesMenuOpen(!resourcesMenuOpen);
                                    setToolsMenuOpen(false);
                                }}
                                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                                aria-expanded={resourcesMenuOpen}
                                aria-haspopup="true"
                            >
                                <span>Resources</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${resourcesMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {resourcesMenuOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 shadow-xl rounded-xl py-2 w-72 animate-in slide-in-from-top-2 duration-200">
                                    {resourcesMenu.map((section, index) => (
                                        <div key={section.category} className={index > 0 ? 'border-t border-gray-100 mt-2 pt-2' : ''}>
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {section.category}
                                            </div>
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.url}
                                                    className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-gray-700 hover:text-blue-600"
                                                    onClick={handleLinkClick}
                                                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                                                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : ''}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">{item.name}</span>
                                                        {item.url.startsWith('http') && (
                                                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            aria-expanded={mobileOpen}
                            aria-label="Toggle mobile menu"
                        >
                            <svg
                                className={`w-6 h-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-4 duration-300" ref={mobileMenuRef}>
                    <div className="px-4 py-4 space-y-6">
                        {/* Mobile Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search tools..."
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Search Results in Mobile */}
                        {searchTerm && (
                            <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">Search Results</h3>
                                {isSearching ? (
                                    <div className="px-2 py-4 text-gray-500 text-center">
                                        <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                                        <span className="mt-2 block">Searching...</span>
                                    </div>
                                ) : filteredTools.length > 0 ? (
                                    <div className="space-y-1 max-h-64 overflow-y-auto">
                                        {filteredTools.map((tool) => (
                                            <Link
                                                key={tool.name}
                                                href={tool.url}
                                                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                onClick={handleLinkClick}
                                            >
                                                <div className="font-medium">{tool.name}</div>
                                                {tool.description && (
                                                    <div className="text-sm text-gray-500 mt-1">{tool.description}</div>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-3 py-8 text-center">
                                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.291M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">No tools found</p>
                                        <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Navigation Links */}
                        {!searchTerm && (
                            <>
                                {/* Direct Links */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">Navigation</h3>
                                    {directLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.url}
                                            className="block px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                                            onClick={handleLinkClick}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile Tools */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">Popular Tools</h3>
                                    <div className="max-h-48 overflow-y-auto space-y-1">
                                        {tools.slice(0, 8).map((tool) => (
                                            <Link
                                                key={tool.name}
                                                href={tool.url}
                                                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                onClick={handleLinkClick}
                                            >
                                                <div className="font-medium">{tool.name}</div>
                                                {tool.description && (
                                                    <div className="text-sm text-gray-500 mt-1">{tool.description}</div>
                                                )}
                                            </Link>
                                        ))}
                                        <Link
                                            href="/tools"
                                            className="block px-3 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 border-t border-gray-100 mt-2 pt-3"
                                            onClick={handleLinkClick}
                                        >
                                            <span className="text-sm font-medium">View All Tools →</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Mobile Resources */}
                                {/* <div className="space-y-3">
                                    {resourcesMenu.map((section) => (
                                        <div key={section.category} className="space-y-1">
                                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">{section.category}</h3>
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.url}
                                                    className="block px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                    onClick={handleLinkClick}
                                                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                                                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : ''}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">{item.name}</span>
                                                        {item.url.startsWith('http') && (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div> */}
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}