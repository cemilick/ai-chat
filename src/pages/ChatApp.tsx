import React, { useState } from "react";
import TypingTitle from "../components/TypingTitle";
import Chatroom from "../components/Chatroom";

const ChatApp: React.FC = () => {
    const [start, setStart] = useState(false);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");

    return start ? (<Chatroom text={message} />) : (
        <div className="h-screen flex flex-col pb-6 dark:bg-gray-900 bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex justify-center items-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full">
                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76a6 6 0 1 1-8.48 8.48"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>
                    </div>
                    {/* End Logo */}

                    <div className="ms-2">

                    </div>
                </div>

                <TypingTitle
                    speed={75}
                    text="Welcome to Wazzi AI Chat App"
                    className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white"
                />
                <p className="mt-3 text-gray-600 dark:text-neutral-400">
                    Your AI-powered chat application, built with the latest LLM technology.
                </p>
                </div>

                {/* Search */}
                <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <input
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" 
                        className="p-3 sm:p-4 block w-full border-gray-200 rounded-full sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                        placeholder="Ask me anything..." 
                        />
                    <div className="absolute top-1/2 end-2 -translate-y-1/2">
                        <button className="p-2 text-white rounded-full focus:outline-none" aria-label="Send message" onClick={() => {
                            setStart(true)
                            setMessage(input);
                        }}>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                </div>
                {/* End Search */}
            </div>

            <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs text-gray-600 dark:text-neutral-500">© 2025 Wazzi Team's.</p>
            </footer>
        </div>
    )
}

export default ChatApp;