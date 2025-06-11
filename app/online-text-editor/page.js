"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Link, Image, Code, Palette, Type, Save, FileText,
    Undo, Redo, Copy, Scissors, Clipboard, Search, Download, Upload, Eye, EyeOff,
    ZoomIn, ZoomOut, Maximize, Minimize, Settings, Moon, Sun, ChevronDown
} from 'lucide-react';

const TextEditor = () => {
    const [content, setContent] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Inter');
    const [lineHeight, setLineHeight] = useState(1.6);
    const [autoSave, setAutoSave] = useState(true);
    const [history, setHistory] = useState(['']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [findText, setFindText] = useState('');
    const [showFind, setShowFind] = useState(false);

    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    // Auto-save functionality
    useEffect(() => {
        if (autoSave && content) {
            const timer = setTimeout(() => {
                console.log('Auto-saved'); // In production, implement actual save
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [content, autoSave]);

    // Update word and character count
    useEffect(() => {
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        setWordCount(words);
        setCharCount(content.length);
    }, [content]);

    // Handle history for undo/redo
    const addToHistory = useCallback((newContent) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newContent);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setContent(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setContent(history[historyIndex + 1]);
        }
    };

    // Text formatting functions
    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
            addToHistory(editorRef.current.innerHTML);
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            formatText('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            formatText('insertImage', url);
        }
    };

    const changeTextColor = (color) => {
        formatText('foreColor', color);
    };

    const changeBackgroundColor = (color) => {
        formatText('backColor', color);
    };

    // File operations
    const saveFile = () => {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newContent = e.target.result;
                setContent(newContent);
                if (editorRef.current) {
                    editorRef.current.innerHTML = newContent;
                }
                addToHistory(newContent);
            };
            reader.readAsText(file);
        }
    };

    // Find and replace
    const findAndHighlight = () => {
        if (!findText) return;

        const content = editorRef.current.innerHTML;
        const highlighted = content.replace(
            new RegExp(findText, 'gi'),
            `<mark style="background: yellow;">$&</mark>`
        );
        editorRef.current.innerHTML = highlighted;
    };

    // Zoom functions
    const zoomIn = () => setZoom(Math.min(zoom + 10, 200));
    const zoomOut = () => setZoom(Math.max(zoom - 10, 50));

    // Clipboard operations
    const copyText = () => {
        if (selectedText) {
            navigator.clipboard.writeText(selectedText);
        }
    };

    const cutText = () => {
        if (selectedText) {
            navigator.clipboard.writeText(selectedText);
            formatText('delete');
        }
    };

    const pasteText = async () => {
        try {
            const text = await navigator.clipboard.readText();
            formatText('insertText', text);
        } catch (err) {
            console.error('Failed to paste:', err);
        }
    };

    const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'];
    const fonts = ['Inter', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Helvetica', 'Verdana'];

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Header */}
            <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <FileText size={24} />
                        Advanced Text Editor
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm opacity-70">
                            {wordCount} words, {charCount} chars
                        </span>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-2`}>
                <div className="flex flex-wrap items-center gap-1">
                    {/* File Operations */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Open File"
                        >
                            <Upload size={16} />
                        </button>
                        <button
                            onClick={saveFile}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Save File"
                        >
                            <Download size={16} />
                        </button>
                    </div>

                    {/* Undo/Redo */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={undo}
                            disabled={historyIndex === 0}
                            className={`p-2 rounded ${historyIndex === 0 ? 'opacity-50' : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Undo"
                        >
                            <Undo size={16} />
                        </button>
                        <button
                            onClick={redo}
                            disabled={historyIndex === history.length - 1}
                            className={`p-2 rounded ${historyIndex === history.length - 1 ? 'opacity-50' : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Redo"
                        >
                            <Redo size={16} />
                        </button>
                    </div>

                    {/* Clipboard */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={copyText}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Copy"
                        >
                            <Copy size={16} />
                        </button>
                        <button
                            onClick={cutText}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Cut"
                        >
                            <Scissors size={16} />
                        </button>
                        <button
                            onClick={pasteText}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Paste"
                        >
                            <Clipboard size={16} />
                        </button>
                    </div>

                    {/* Text Formatting */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={() => formatText('bold')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Bold"
                        >
                            <Bold size={16} />
                        </button>
                        <button
                            onClick={() => formatText('italic')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Italic"
                        >
                            <Italic size={16} />
                        </button>
                        <button
                            onClick={() => formatText('underline')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Underline"
                        >
                            <Underline size={16} />
                        </button>
                    </div>

                    {/* Alignment */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={() => formatText('justifyLeft')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Align Left"
                        >
                            <AlignLeft size={16} />
                        </button>
                        <button
                            onClick={() => formatText('justifyCenter')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Align Center"
                        >
                            <AlignCenter size={16} />
                        </button>
                        <button
                            onClick={() => formatText('justifyRight')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Align Right"
                        >
                            <AlignRight size={16} />
                        </button>
                        <button
                            onClick={() => formatText('justifyFull')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Justify"
                        >
                            <AlignJustify size={16} />
                        </button>
                    </div>

                    {/* Lists */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={() => formatText('insertUnorderedList')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Bullet List"
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => formatText('insertOrderedList')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Numbered List"
                        >
                            <ListOrdered size={16} />
                        </button>
                    </div>

                    {/* Insert */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <button
                            onClick={insertLink}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Insert Link"
                        >
                            <Link size={16} />
                        </button>
                        <button
                            onClick={insertImage}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Insert Image"
                        >
                            <Image size={16} />
                        </button>
                        <button
                            onClick={() => formatText('formatBlock', 'pre')}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Code Block"
                        >
                            <Code size={16} />
                        </button>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-1 border-r pr-2 mr-2">
                        <div className="relative">
                            <Palette size={16} className="m-2" />
                            <div className="absolute top-8 left-0 bg-white dark:bg-gray-800 border rounded-lg p-2 shadow-lg hidden group-hover:block">
                                <div className="grid grid-cols-5 gap-1">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => changeTextColor(color)}
                                            className="w-6 h-6 rounded border"
                                            style={{ backgroundColor: color }}
                                            title={`Text Color: ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Controls */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setShowFind(!showFind)}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Find"
                        >
                            <Search size={16} />
                        </button>
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Toggle Preview"
                        >
                            {isPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                            onClick={zoomOut}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Zoom Out"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-sm px-2">{zoom}%</span>
                        <button
                            onClick={zoomIn}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Zoom In"
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Toggle Fullscreen"
                        >
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Settings"
                        >
                            <Settings size={16} />
                        </button>
                    </div>
                </div>

                {/* Find Bar */}
                {showFind && (
                    <div className={`mt-2 p-2 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Find text..."
                                value={findText}
                                onChange={(e) => setFindText(e.target.value)}
                                className={`flex-1 px-3 py-1 border rounded ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'}`}
                                onKeyPress={(e) => e.key === 'Enter' && findAndHighlight()}
                            />
                            <button
                                onClick={findAndHighlight}
                                className={`px-3 py-1 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            >
                                Find
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Font Family</label>
                            <select
                                value={fontFamily}
                                onChange={(e) => setFontFamily(e.target.value)}
                                className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'}`}
                            >
                                {fonts.map((font) => (
                                    <option key={font} value={font}>{font}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Font Size</label>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-sm opacity-70">{fontSize}px</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Line Height</label>
                            <input
                                type="range"
                                min="1.2"
                                max="2.0"
                                step="0.1"
                                value={lineHeight}
                                onChange={(e) => setLineHeight(Number(e.target.value))}
                                className="w-full"
                            />
                            <span className="text-sm opacity-70">{lineHeight}</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={autoSave}
                                onChange={(e) => setAutoSave(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm">Auto-save</span>
                        </label>
                    </div>
                </div>
            )}

            {/* Main Editor Area */}
            <div className="flex-1 flex">
                <div className="flex-1 p-4">
                    {isPreview ? (
                        <div
                            className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}
                            style={{
                                zoom: `${zoom}%`,
                                fontFamily: fontFamily,
                                fontSize: `${fontSize}px`,
                                lineHeight: lineHeight
                            }}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <div
                            ref={editorRef}
                            contentEditable
                            className={`min-h-96 w-full p-4 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode
                                ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500'
                                : 'border-gray-300 bg-white focus:ring-blue-500'
                                }`}
                            style={{
                                zoom: `${zoom}%`,
                                fontFamily: fontFamily,
                                fontSize: `${fontSize}px`,
                                lineHeight: lineHeight
                            }}
                            onInput={(e) => {
                                const newContent = e.target.innerHTML;
                                setContent(newContent);
                                addToHistory(newContent);
                            }}
                            onSelect={() => {
                                const selection = window.getSelection();
                                setSelectedText(selection?.toString() || '');
                            }}
                            placeholder="Start typing your document..."
                        />
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} px-4 py-2`}>
                <div className="flex items-center justify-between text-sm opacity-70">
                    <div className="flex items-center gap-4">
                        <span>Ready</span>
                        {autoSave && <span>Auto-save enabled</span>}
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Zoom: {zoom}%</span>
                        <span>Words: {wordCount}</span>
                        <span>Characters: {charCount}</span>
                    </div>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.html,.md"
                onChange={loadFile}
                className="hidden"
            />
        </div>
    );
};

export default TextEditor;