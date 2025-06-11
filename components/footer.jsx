import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-purple-900 text-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4">
                {/* Three-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Column 1: About Website */}
                    <div>
                        <h3 className="text-lg font-semibold  mb-4">About DeepTools.org</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            DeepTools.org offers cutting-edge AI solutions to enhance your productivity and creativity.
                            Our suite of tools helps you create, edit, and optimize content with the power of artificial intelligence.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold  mb-4">Useful Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tools" className="text-sm  text-gray-400 hover:text-white transition-colors duration-200">
                                    All Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm  text-gray-400 hover:text-white transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-sm  text-gray-400 hover:text-white transition-colors duration-200">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm  text-gray-400 hover:text-white transition-colors duration-200">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm  text-gray-400 hover:text-white transition-colors duration-200">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Company Details</h3>
                        <address className="not-italic">

                            <p className="text-sm text-gray-400 mb-2">123 Innovation Street</p>
                            <p className="text-sm text-gray-400 mb-2">San Francisco, CA 94103</p>
                            <p className="text-sm text-gray-400 mb-4">United States</p>
                            <p className="text-sm text-gray-400 mb-1">
                                <span className="font-medium">Email:</span> info@deeptools.org
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">Support:</span> support@deeptools.org
                            </p>
                        </address>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Copyright and links */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} DeepTools.Org. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                            About
                        </Link>
                        <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                            Privacy
                        </Link>
                        <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                            Contact
                        </Link>
                    </div>
                </div>


            </div>
        </footer>
    )
}