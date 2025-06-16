import React from "react";
import Quotes from "../assets/slogan.png";
import Chatbot from "../assets/chatbot-icon.svg";
import Employee from "../assets/employee.svg";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="absolute h-screen bg-gray-900 w-[100vw] opacity-50"></div>
        <div id="main-page" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="flex justify-between w-full bg-gray-900 text-white py-4 shadow-md z-1">
                <div className="container mx-auto px-4 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-2xl font-bold shimmer-effect">WAZZI</h1>
                </div>
            </header> 

            <main className="z-1 flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center">
                <img src={Quotes} alt="WAZZI Slogan" className="w-2/5 mb-2 mt-4" />

                <div className="mt-6 card bg-white shadow-lg rounded-lg p-6 w-full mb-5">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Product</h3>
                    <p className="text-gray-600 mb-4">
                        Discover how WAZZI is transforming businesses with cutting-edge technology and innovative solutions.
                    </p>
                    <div className="flex justify-center space-x-4 mb-10">
                        <div className="product-item bg-gray-900 p-4 rounded-lg shadow-md" onClick={() => navigate('/ai')}>
                            <h4 className="text-lg font-bold text-gray-200 mb-3">AI Chat App</h4>
                            <img src={Chatbot} alt="Chatbot Icon" className="w-25 h-25 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm mt-2 max-w-xs">An chat app demos using Deepsek R1 LLM Models on private server.</p>
                        </div>
                        <div className="product-item bg-gray-900 p-4 rounded-lg shadow-md" onClick={() => navigate('/ai')}>
                            <h4 className="text-lg font-bold text-gray-200 mb-3">AI Chat App</h4>
                            <img src={Chatbot} alt="Chatbot Icon" className="w-25 h-25 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm mt-2 max-w-xs">An chat app demos using Deepsek R1 LLM Models on private server.</p>
                        </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Teams</h3>
                    <p className="text-gray-600">
                        Meet the passionate professionals behind WAZZI, dedicated to delivering excellence and innovation.
                        <div className="flex justify-center gap-5 px-5 mt-5">
                        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-bold text-gray-200 mb-3">Mr. Aaron</h4>
                            <img src={Employee} alt="Chatbot Icon" className="w-25 h-25 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm mt-2 max-w-xs">An expert software developer focusing on AI.</p>
                        </div>
                        <div className="col-md-2 bg-gray-900 p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-bold text-gray-200 mb-3">Mr. Luiz Perotto</h4>
                            <img src={Employee} alt="Chatbot Icon" className="w-25 h-25 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm mt-2 max-w-xs">An expert software developer focusing on AI.</p>
                        </div>
                        <div className="col-md-2 bg-gray-900 p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-bold text-gray-200 mb-3">Mr. Cemilick</h4>
                            <img src={Employee} alt="Chatbot Icon" className="w-25 h-25 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm mt-2 max-w-xs">An expert software developer focusing on AI.</p>
                        </div>
                        
                        </div>
                    </p>
                </div>
            </main>

            <footer className="w-full bg-gray-800 text-white py-4 z-1">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Wazzi Team's. All rights reserved.</p>
                </div>
            </footer>
        </div>
            </>
    );
};

export default LandingPage;