import React from 'react';
import { Link } from 'react-router-dom';
import Quotes from "../assets/slogan.png";
import Chatbot from "../assets/chatbot-icon.svg";

// Sample data
const products = [
    { id: 1, name: 'AI Chat App', description: 'A powerful AI chatbot solution', image: Chatbot },
    { id: 2, name: 'Product 2', description: 'Advanced data analytics platform', image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Product 3', description: 'Secure messaging application', image: 'https://via.placeholder.com/300' },
];

const teamMembers = [
    { id: 1, name: 'Jane Doe', role: 'CEO', image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'John Smith', role: 'CTO', image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Alex Johnson', role: 'Lead Developer', image: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Sara Wilson', role: 'UX Designer', image: 'https://via.placeholder.com/200' },
];

const LandingPageNew: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-indigo-600 shimmer-effect">WAZZI</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">Home</Link>
                            <Link to="#products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">Products</Link>
                            <Link to="#team" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">Team</Link>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-600 hover:text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Banner */}
            
            <div className="relative bg-indigo-800 text-white">
                {/* Background layer */}
                <div className="absolute inset-0 bg-indigo-800 w-full opacity-50 z-0"></div>
                
                {/* Content layer */}
                <div id="main-page">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-15 pb-7 md:pb-15 z-10">
                        <div className="md:w-2/3">
                            <img src={Quotes} alt="WAZZI Slogan" className="w-2/5 mb-2 mt-4" />
                            <p className="text-lg md:text-xl mb-8">
                                Discover how WAZZI is transforming businesses with cutting-edge technology and innovative solutions.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 z-10">
                            <button className="primary px-6 py-3 rounded-md font-medium text-2xl">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent"></div>
                </div>
            </div>

            {/* Our Products */}
            <section id="products" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Products</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Discover our innovative solutions designed to meet your needs
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img src={product.image} alt={product.name} className="w-full h-48" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600">{product.description}</p>
                                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section id="team" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Meet the talented people behind our success
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-indigo-600">{member.role}</p>
                                <div className="flex justify-center mt-4 space-x-3">
                                    <a href="#" className="text-gray-400 hover:text-gray-700">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-gray-700">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1.005-.018-2.298-1.399-2.298-1.4 0-1.612 1.093-1.612 2.223v4.252H8.077V7.5h2.568v1.176h.037c.36-.685 1.24-1.4 2.55-1.4 2.72 0 3.23 1.79 3.23 4.12v4.942zM5.5 6.325a1.563 1.563 0 11-.001-3.125A1.563 1.563 0 015.5 6.325zm1.333 10.013H4.166V7.5h2.667v8.838z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">AI Chat App</h3>
                            <p className="text-gray-300">
                                Transforming communication with
                                intelligent AI solutions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Products</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">Product 1</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Product 2</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Product 3</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                        <p>© 2023 AI Chat App. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPageNew;