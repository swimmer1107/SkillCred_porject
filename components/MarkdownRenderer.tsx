
import React from 'react';

const parseInlineMarkdown = (line: string): React.ReactNode[] => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = line.split(boldRegex);

    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return <strong key={index} className="font-semibold text-slate-800">{part}</strong>;
        }
        return part;
    });
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={key} className="list-disc pl-6 space-y-2 my-4 text-slate-700">
                    {listItems.map((item, i) => (
                        <li key={`${key}-li-${i}`}>{parseInlineMarkdown(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const key = `line-${index}`;
        
        if (line.trim().startsWith('## ')) {
            flushList(`ul-before-h2-${index}`);
            elements.push(<h2 key={key} className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-slate-200 text-slate-800">{parseInlineMarkdown(line.substring(3))}</h2>);
        } else if (line.trim().startsWith('# ')) {
            flushList(`ul-before-h1-${index}`);
            elements.push(<h1 key={key} className="text-3xl font-bold mt-4 mb-6 text-slate-900">{parseInlineMarkdown(line.substring(2))}</h1>);
        } else if (line.trim().startsWith('* ')) {
            listItems.push(line.substring(2).trim());
        } else {
            flushList(`ul-before-p-${index}`);
            if (line.trim() !== '') {
                elements.push(<p key={key} className="my-4 text-slate-700 leading-relaxed">{parseInlineMarkdown(line)}</p>);
            }
        }
    });

    flushList('ul-final');

    return <>{elements}</>;
};

export default MarkdownRenderer;
