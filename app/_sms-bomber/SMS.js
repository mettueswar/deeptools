"use client";
import { Send, Smartphone, ShieldAlert, Zap, Info, HelpCircle, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { ChevronRight, AlertTriangle } from 'lucide-react';

export default function SMSBomber() {
    const [phone, setPhone] = useState('');
    const [count, setCount] = useState(10);
    const [speed, setSpeed] = useState('medium');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsRunning(true);
        // Fake processing
        setTimeout(() => setIsRunning(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}


            {/* Main Content */}
            <main className="container mx-auto py-8 px-4 max-w-5xl">
                {/* Home Tab */}
                {activeTab === 'home' && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">SMS Bomber Tool - Send Multiple SMS Quickly</h1>
                        <p className="text-gray-600 mb-6">
                            Our advanced SMS bomber tool allows you to send multiple SMS messages to any phone number quickly and efficiently.
                            Perfect for testing purposes, emergency notifications, or other legitimate uses.
                        </p>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ShieldAlert className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Warning:</strong> This tool should only be used for legal and ethical purposes.
                                        Misuse may violate laws and terms of service. By using this tool, you agree to our terms and conditions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Target Phone Number
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Smartphone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="+1 (123) 456-7890"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of Messages
                                </label>
                                <select
                                    id="count"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={count}
                                    onChange={(e) => setCount(parseInt(e.target.value))}
                                >
                                    <option value="10">10 Messages</option>
                                    <option value="50">50 Messages</option>
                                    <option value="100">100 Messages</option>
                                    <option value="500">500 Messages (Pro)</option>
                                    <option value="1000">1000 Messages (Pro)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sending Speed
                                </label>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            id="speed-low"
                                            name="speed"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={speed === 'low'}
                                            onChange={() => setSpeed('low')}
                                        />
                                        <label htmlFor="speed-low" className="ml-3 block text-sm font-medium text-gray-700">
                                            Slow (1 msg/sec)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="speed-medium"
                                            name="speed"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={speed === 'medium'}
                                            onChange={() => setSpeed('medium')}
                                        />
                                        <label htmlFor="speed-medium" className="ml-3 block text-sm font-medium text-gray-700">
                                            Medium (5 msg/sec)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="speed-high"
                                            name="speed"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            checked={speed === 'high'}
                                            onChange={() => setSpeed('high')}
                                        />
                                        <label htmlFor="speed-high" className="ml-3 block text-sm font-medium text-gray-700">
                                            Fast (10 msg/sec)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms-agree"
                                    name="terms-agree"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    required
                                />
                                <label htmlFor="terms-agree" className="ml-2 block text-sm text-gray-700">
                                    I agree to the Terms and Conditions and confirm I have permission to send these messages
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    disabled={isRunning}
                                >
                                    {isRunning ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Bombing in Progress...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="-ml-1 mr-2 h-5 w-5" />
                                            Start SMS Bombing
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {isRunning && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-indigo-800">
                                            Success! {count} SMS messages are being sent to {phone}.
                                        </p>
                                        <div className="mt-2 text-sm text-indigo-700">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                            <p className="mt-1">Estimated time remaining: 15 seconds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* How to Use Tab */}
                {activeTab === 'how-to-use' && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <BookOpen className="mr-2 h-6 w-6" />
                            How to Use SMS Bomber Tool
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Step 1: Enter Target Phone Number</h3>
                                <p className="text-gray-600">
                                    Input the complete phone number you want to send messages to, including the country code.
                                    Make sure you have permission to send messages to this number.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Step 2: Select Message Count</h3>
                                <p className="text-gray-600">
                                    Choose how many messages you want to send. Free users can send up to 100 messages at a time.
                                    Pro users can send up to 1000 messages per session.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Step 3: Set Sending Speed</h3>
                                <p className="text-gray-600">
                                    Select your preferred sending speed. Faster speeds may be more detectable by carriers.
                                    For testing purposes, medium speed is recommended.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Step 4: Confirm Terms</h3>
                                <p className="text-gray-600">
                                    You must agree to our terms and conditions and confirm you have permission to send messages
                                    to the target number before proceeding.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Step 5: Start Bombing</h3>
                                <p className="text-gray-600">
                                    Click the "Start SMS Bombing" button to begin the process. You'll see real-time updates
                                    on the progress of your message sending.
                                </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-md">
                                <h3 className="text-lg font-medium text-blue-800 mb-2">Pro Tips</h3>
                                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                                    <li>Use during off-peak hours for better delivery rates</li>
                                    <li>Start with smaller message counts to test the service</li>
                                    <li>Monitor the target device to confirm message delivery</li>
                                    <li>Consider using multiple numbers for large-scale testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <HelpCircle className="mr-2 h-6 w-6" />
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Is this service free to use?</h3>
                                <p className="text-gray-600">
                                    Yes, our basic service is free with limitations (up to 100 messages per session).
                                    We offer premium plans with higher limits and additional features.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Will the target know it's me sending the messages?</h3>
                                <p className="text-gray-600">
                                    Our service routes messages through various channels for anonymity, but we strongly discourage
                                    using this service to harass or annoy others. Always get permission before sending messages.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">How long does it take to send all messages?</h3>
                                <p className="text-gray-600">
                                    Delivery time depends on your selected speed and the number of messages. For example,
                                    100 messages at medium speed (5 msg/sec) takes about 20 seconds.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Can I customize the message content?</h3>
                                <p className="text-gray-600">
                                    Currently, our service sends a standard test message. Pro users can upload custom message
                                    templates for their campaigns.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Is this service legal?</h3>
                                <p className="text-gray-600">
                                    The legality depends on your jurisdiction and how you use the service. We only permit
                                    ethical uses like testing your own devices, emergency notifications, or with explicit
                                    recipient consent. Check your local laws before use.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Why are some messages not delivered?</h3>
                                <p className="text-gray-600">
                                    Carrier filters may block rapid message delivery. We optimize our delivery algorithms,
                                    but some messages may still be filtered, especially at high volumes.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Terms Tab */}
                {activeTab === 'terms' && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Info className="mr-2 h-6 w-6" />
                            Terms and Conditions
                        </h2>

                        <div className="prose prose-sm max-w-none text-gray-600">
                            <h3 className="text-lg font-medium text-gray-900">Acceptance of Terms</h3>
                            <p>
                                By accessing and using Short Service Message Bomber ("the Service"), you accept and agree to be bound by the terms
                                and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                            </p>

                            <h3 className="text-lg font-medium text-gray-900 mt-4">Appropriate Use</h3>
                            <p>
                                The Service is intended for legitimate purposes only, including:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Testing your own devices and systems</li>
                                <li>Emergency notification systems testing</li>
                                <li>Educational and research purposes with proper oversight</li>
                                <li>Other uses with explicit recipient consent</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mt-4">Prohibited Activities</h3>
                            <p>
                                You agree NOT to use the Service for:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Harassment, bullying, or stalking</li>
                                <li>Commercial spamming</li>
                                <li>Fraudulent activities</li>
                                <li>Any illegal purposes</li>
                                <li>Disrupting telecommunications services</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-900 mt-4">Limitation of Liability</h3>
                            <p>
                                The Service providers shall not be liable for any damages resulting from the use or inability to use
                                the Service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                            </p>

                            <h3 className="text-lg font-medium text-gray-900 mt-4">User Responsibility</h3>
                            <p>
                                You are solely responsible for ensuring your use of the Service complies with all applicable laws
                                in your jurisdiction. You agree to indemnify and hold harmless the Service providers from any claims
                                resulting from your misuse of the Service.
                            </p>

                            <h3 className="text-lg font-medium text-gray-900 mt-4">Service Modifications</h3>
                            <p>
                                We reserve the right to modify or discontinue the Service at any time without notice. We may also
                                modify these terms at any time, and your continued use constitutes acceptance of the modified terms.
                            </p>

                            <div className="mt-6 p-4 bg-red-50 rounded-md">
                                <h3 className="text-lg font-medium text-red-800">Important Disclaimer</h3>
                                <p className="text-red-700">
                                    This service is provided for educational and testing purposes only. Misuse may violate
                                    telecommunications laws and result in severe penalties. Use at your own risk.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Do's and Don'ts Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Best Practices Guide</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                            <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                                What To Do
                            </h3>
                            <ul className="space-y-2 text-green-700">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Only test on devices you own or have permission to test</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Start with small message counts to verify functionality</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Use for legitimate testing and educational purposes</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Monitor the target device to confirm message delivery</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Check your local laws before using the service</span>
                                </li>
                            </ul>
                        </div>

                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                                <XCircle className="mr-2 h-5 w-5" />
                                What Not To Do
                            </h3>
                            <ul className="space-y-2 text-red-700">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Don't harass or annoy others with unwanted messages</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Don't use for commercial spamming or phishing</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Don't target emergency services or critical infrastructure</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Don't attempt to overload or disrupt networks</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Don't use the service if it's illegal in your area</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>






                {/* How to Use Section */}
                <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Zap className="h-6 w-6 text-yellow-300" />
                            How to Use SMS Bomber Tool?
                        </h2>
                        <p className="text-indigo-100 mt-1">Follow these steps for effective testing</p>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Enter the Target Phone Number</h3>
                                <p className="text-gray-600 mt-1">
                                    Input the <span className="font-medium text-gray-800">full phone number</span>, including the
                                    <span className="bg-yellow-100 px-1 mx-1 rounded">country code</span> (e.g., +1 for the US).
                                    <span className="block mt-2 text-sm bg-red-50 text-red-700 px-3 py-1.5 rounded-md inline-flex items-center">
                                        <AlertTriangle className="h-4 w-4 mr-1" />
                                        Only use numbers you own or have explicit permission to test
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Select the Number of Messages</h3>
                                <p className="text-gray-600 mt-1">
                                    Choose between <span className="font-medium">10-100 messages</span> (free tier) or up to
                                    <span className="font-medium"> 1,000 messages</span> for Pro users.
                                    <span className="block mt-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm">
                                        💡 Start with 10-20 messages to verify the service works before larger tests
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Adjust the Sending Speed</h3>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border">
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                        <span className="font-medium">Slow (1 msg/sec):</span> Best for avoiding carrier filters
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <span className="font-medium">Medium (5 msg/sec):</span> Balanced speed for most tests
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <span className="font-medium">Fast (10 msg/sec):</span> Aggressive testing (may trigger spam filters)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-blue-100 mt-1">Common questions about our service</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {/* FAQ Item 1 */}
                        <details className="group p-6 hover:bg-gray-50 transition-colors duration-200">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h3 className="text-lg font-medium text-gray-800">Is SMS Bomber Tool free?</h3>
                                <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transform transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 text-gray-600 pl-2 space-y-2">
                                <p>
                                    Yes, the <span className="font-medium">basic version</span> allows up to
                                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">100 messages per session</span>.
                                </p>
                                <p>
                                    For heavy testing, upgrade to <span className="font-medium">Pro</span> which includes:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>1,000+ messages per session</li>
                                    <li>Custom message content</li>
                                    <li>Priority delivery</li>
                                    <li>Advanced analytics</li>
                                </ul>
                            </div>
                        </details>

                        {/* FAQ Item 2 */}
                        <details className="group p-6 hover:bg-gray-50 transition-colors duration-200">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h3 className="text-lg font-medium text-gray-800">Can the recipient trace the messages back to me?</h3>
                                <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transform transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 text-gray-600 pl-2 space-y-2">
                                <p>
                                    Messages are routed through <span className="font-medium">multiple gateways</span> for anonymity, but:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Carrier logs may reveal patterns</li>
                                    <li>Legal authorities can request data</li>
                                    <li>Always get permission before testing</li>
                                </ul>
                                <div className="mt-2 px-3 py-2 bg-red-50 text-red-700 rounded-md text-sm flex items-start gap-2">
                                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>Unauthorized testing may violate telecommunications laws in your region</span>
                                </div>
                            </div>
                        </details>

                        {/* FAQ Item 3 */}
                        <details className="group p-6 hover:bg-gray-50 transition-colors duration-200">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h3 className="text-lg font-medium text-gray-800">Why are some messages not delivered?</h3>
                                <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transform transition-transform duration-200" />
                            </summary>
                            <div className="mt-3 text-gray-600 pl-2 space-y-2">
                                <p>Several factors can affect delivery rates:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><span className="font-medium">Carrier spam filters</span> may block rapid-fire SMS</li>
                                    <li><span className="font-medium">Poor signal</span> or network congestion can delay messages</li>
                                    <li><span className="font-medium">Some number types</span> (e.g., VoIP) reject bulk SMS</li>
                                    <li><span className="font-medium">Regional restrictions</span> on mass messaging</li>
                                </ul>
                                <p className="pt-2 text-sm text-blue-600">
                                    💡 Pro tip: Try slower speeds (1-2 msg/sec) for better delivery rates
                                </p>
                            </div>
                        </details>
                    </div>
                </section>



            </main>



        </div>
    );
}