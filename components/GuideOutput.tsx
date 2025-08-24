
import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import Loader from './Loader';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';
import DocumentSparkleIcon from './icons/DocumentSparkleIcon';

interface GuideOutputProps {
    guideContent: string;
    isLoading: boolean;
}

const loadingMessages = [
    "Brewing up some knowledge...",
    "Consulting the digital sages...",
    "Structuring the perfect guide...",
    "Polishing the final draft...",
    "Almost there..."
];

const LoadingState: React.FC = () => {
    const [message, setMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = loadingMessages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-10">
            <Loader className="w-12 h-12 text-indigo-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">Generating Your Guide</h3>
            <p className="mt-1 text-slate-500 transition-opacity duration-500">{message}</p>
        </div>
    );
};

const EmptyState: React.FC = () => (
    <div className="text-center p-10">
        <DocumentSparkleIcon className="mx-auto h-16 w-16 text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-700">Your Study Guide Will Appear Here</h3>
        <p className="mt-1 text-slate-500">Enter your topics above and click "Generate Guide" to start.</p>
    </div>
);

const GuideOutput: React.FC<GuideOutputProps> = ({ guideContent, isLoading }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (guideContent) {
            // Set a short timeout to allow the DOM to update before triggering the transition
            const timer = setTimeout(() => setShowContent(true), 100);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [guideContent]);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleCopy = () => {
        if (guideContent) {
            navigator.clipboard.writeText(guideContent);
            setIsCopied(true);
        }
    };

    const renderContent = () => {
        if (isLoading) return <LoadingState />;
        if (guideContent) {
            return (
                 <div className="relative">
                     <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition z-10"
                        title="Copy to clipboard"
                        aria-label="Copy guide content"
                    >
                        {isCopied ? <CheckIcon className="w-5 h-5 text-green-600" /> : <ClipboardIcon className="w-5 h-5 text-slate-500" />}
                    </button>
                    <div className={`prose max-w-none p-6 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        <MarkdownRenderer content={guideContent} />
                    </div>
                </div>
            );
        }
        return <EmptyState />;
    };
    
    return (
        <section className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200/50 min-h-[20rem] flex items-center justify-center overflow-hidden">
            <div className="w-full">
                {renderContent()}
            </div>
        </section>
    );
};

export default GuideOutput;