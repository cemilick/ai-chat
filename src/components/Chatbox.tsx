import { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import { MessageType } from '../types/message';

export default function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: MessageType = { sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    try {
        setLoading(true);
      const response = await axios.post(
              `http://localhost:5134/api/generate`,
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
    <div className="flex flex-col justify-between h-[100vh] w-full mx-auto bg-gray-800">
        <div className="flex-1 overflow-y-auto min-h-full rounded shadow mb-20 h-[400px] p-10">
            {messages.map((msg, idx) => (
            <Message key={idx} message={msg} />
            ))}
        </div>
        <div className="fixed bottom-0 gap-2 bg-gray-700 p-5 min-w-full">
            <div className='flex justify-center items-center gap-2'>
                {loading && (
                    <div className="flex items-center justify-center w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
                <input
                    type="text"
                    value={input}
                    disabled={loading}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    className="border bg-white border-gray-300 p-2 rounded text-black w-4/5"
                    placeholder="Type your message..."
                    />
                <button disabled={loading} onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
                    Send
                </button>
            </div>
        </div>
    </div>
  );
}
