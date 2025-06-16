import React from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export const FormattedText: React.FC<Props> = ({ content }) => {
  // Ubah \n menjadi newline asli (karena bisa datang dari JSON)
  const normalizedText = content.replace(/\\n/g, '\n')

  // Bagi menjadi bagian-bagian antara <think> dan lainnya
  const parts = normalizedText.split(/(<think>[\s\S]*?<\/think>)/g)

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith('<think>')) {
          const inner = part.replace(/<\/?think>/g, '')
          return (
            <div
              key={index}
              className="bg-gray-800 border-l-4 border-gray-100 text-yellow-800 p-4 rounded whitespace-pre-wrap font-mono"
            >
              {inner}
            </div>
          )
        } else {
          return (
            <ReactMarkdown
              key={index}
              components={{
                p: ({ children }) => <p className="mb-2">{children}</p>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                li: ({ children }) => <li>{children}</li>
              }}
            >
              {part}
            </ReactMarkdown>
          )
        }
      })}
    </div>
  )
}
