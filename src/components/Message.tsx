import { marked } from 'marked';
import { MessageType } from '../types/message';

export default function Message({ message }: { message: MessageType }) {
  const isUser = message.sender === 'user';
  const html = marked(message.text);

  return (
    <div className={`my-2 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg max-w-xl whitespace-pre-wrap text-sm ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
