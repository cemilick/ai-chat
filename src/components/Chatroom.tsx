import React, { useEffect, useState } from "react";
import { MessageType } from "../types/message";
import axios from "axios";
import { FormattedText } from "./FormattedText";

interface ChatroomProps {
    text?: string;
}

const Chatroom: React.FC<ChatroomProps> = ({ text = "" }) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    let init = true;

    useEffect(() => {
        if (text.trim() && init) {
            init = false;
            sendMessage()
        }

    }, [text]);

    const stopGenerating = () => {
        setLoading(false);
        setMessages(prev => [...prev, { sender: 'ai', text: "Generation stopped." }]);
    }

    const sendMessage = async () => {
        const msg = !input.trim() ? text.trim() : input.trim();
        console.log(input, text);
        if (!msg){
            alert("Please enter a message.");
            return;

        }

        const newUserMessage: MessageType = { sender: 'user', text: msg };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');

        try {
            setLoading(true);
            const response = await axios.post(
                    `http://ai.wazzi.site/api/generate`,
                    {
                        model: "deepseek-r1",
                        prompt: newUserMessage.text,
                        stream: false
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                // console.log(message?.data?.response);
                const message = response?.data?.response?.replaceAll('null', '') ?? "";
            const aiReply = message?.trim();
            setLoading(false);
            setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
        } catch (error) {
            console.error('API error:', error);
        }
  };

    return (
        <div className="relative h-full dark:bg-gray-900 bg-gray-100">
            <div className="py-10 lg:py-14">
                {/* Title */}
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
                    <div className="mb-4 flex justify-center items-center">
                        {/* Logo */}
                        <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full">
                        <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76a6 6 0 1 1-8.48 8.48"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>
                        </div>
                        {/* End Logo */}

                        <div className="ms-2">

                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                        Welcome to Wazzi AI Chat App
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                        Your AI-powered chat application, built with the latest LLM technology.
                    </p>
                </div>
                {/* End Title */}

                <ul className="mt-16 space-y-5">
                    {/* Chat Bubble */}
                    {messages.length == 0 ? (
                        <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                        {/* SVG omitted for brevity */}
                        <svg className="shrink-0 size-9.5 rounded-full" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* ...SVG paths... */}
                        </svg>
                        <div className="space-y-3">
                            <h2 className="font-medium text-gray-800 dark:text-white">
                                How can we help?
                            </h2>
                            <div className="space-y-1.5">
                                <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                                    You can ask questions like:
                                </p>
                                <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                                    <li className="text-sm text-gray-800 dark:text-white">
                                        What's Wazzi Chat App?
                                    </li>
                                    <li className="text-sm text-gray-800 dark:text-white">
                                        When Wazzi Team's Start Growing?
                                    </li>
                                    <li className="text-sm text-gray-800 dark:text-white">
                                        How many totals product of Wazzi Team's?
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    ) : messages.map((message, index) => (
                        <li key={index} className={`max-w-4xl py-2 px-4 sm:px-6 lg:px-8 items-start mx-auto flex gap-x-2 sm:gap-x-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender == 'ai' && (
                                <svg className={`shrink-0 size-9.5 rounded-full bg-gray-500`} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 0C8.5 0 0 8.5 0 19s8.5 19 19 19 19-8.5 19-19S29.5 0 19 0zm0 36C10.2 36 3 28.8 3 20S10.2 4 19 4s16 7.2 16 16-7.2 16-16 16z" fill="currentColor"/>
                                    <path d="M26.6 11.4c-1.6-1.6-3.7-2.4-6-2.4s-4.4.8-6 2.4c-1.6 1.6-2.4 3.7-2.4 6s.8 4.4 2.4 6c1.6 1.6 3.7 2.4 6 2.4s4.4-.8 6-2.4c1.6-1.6 2.4-3.7 2.4-6s-.8-4.4-2.4-6z" fill="currentColor"/>

                                </svg>
                            )}
                            <div className={`self-center space-y-3 ${message.sender === 'user' ? 'text-right ' : ''}`}>
                                <FormattedText content={message.text} />
                            </div>
                            {
                                message.sender != 'ai' && (
                                    <svg className={`shrink-0 size-9.5 rounded-full bg-blue-600`} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 0C8.5 0 0 8.5 0 19s8.5 19 19 19 19-8.5 19-19S29.5 0 19 0zm0 36C10.2 36 3 28.8 3 20S10.2 4 19 4s16 7.2 16 16-7.2 16-16 16z" fill="currentColor"/>
                                        <path d="M26.6 11.4c-1.6-1.6-3.7-2.4-6-2.4s-4.4.8-6 2.4c-1.6 1.6-2.4 3.7-2.4 6s.8 4.4 2.4 6c1.6 1.6 3.7 2.4 6 2.4s4.4-.8 6-2.4c1.6-1.6 2.4-3.7 2.4-6s-.8-4.4-2.4-6z" fill="currentColor"/>
                                    </svg>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-neutral-900 dark:border-neutral-700">
                {/* Textarea */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="flex justify-between items-center mb-3">
                        <button
                            onClick={() => {
                                setMessages([])
                                stopGenerating();
                            }}
                            type="button"
                            className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-blue-500 dark:focus:text-blue-500"
                        >
                            {/* SVG omitted for brevity */}
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            New chat
                        </button>
                        { loading && (    
                            <button
                                onClick={() => stopGenerating()}
                                type="button"
                                className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            >
                                {/* SVG omitted for brevity */}
                                <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                                </svg>
                                Stop generating
                            </button>
                        )}
                    </div>
                    {/* Input */}
                    <div className="relative">
                        <textarea
                            value={input}
                            disabled={loading}
                            onChange={(e) => setInput(e.target.value)}
                            className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            placeholder="Ask me anything..."
                        />
                        {/* Toolbar */}
                        <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                            <div className="flex flex-wrap justify-end items-center gap-2">
                                <button className="p-2 text-white rounded-full focus:outline-none" disabled={loading}  aria-label="Send message" onClick={() => sendMessage()}>
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* End Toolbar */}
                    </div>
                    {/* End Input */}
                </div>
                {/* End Textarea */}
            </div>
        </div>
    );
};

export default Chatroom;
