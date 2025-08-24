
import React, { useState } from 'react';
import InformationCircleIcon from './icons/InformationCircleIcon';

interface ApiKeyInstructionsProps {
    onKeySubmit: (key: string) => void;
}

const ApiKeyInstructions: React.FC<ApiKeyInstructionsProps> = ({ onKeySubmit }) => {
    const [keyValue, setKeyValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onKeySubmit(keyValue);
    };

    return (
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200/50">
            <div className="flex items-start space-x-3 mb-6">
                <InformationCircleIcon className="h-7 w-7 text-blue-500 flex-shrink-0" />
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Welcome! Let's Get Started</h2>
                    <p className="text-slate-600 mt-1">Please enter your Google Gemini API Key to continue.</p>
                </div>
            </div>

            <div className="space-y-4 text-slate-700">
                <p>
                    This application requires a Google Gemini API key to function. You can get a free key from 
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium mx-1">
                        Google AI Studio
                    </a>.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-700">
                            Your Gemini API Key
                        </label>
                        <input
                            id="api-key-input"
                            type="password"
                            value={keyValue}
                            onChange={(e) => setKeyValue(e.target.value)}
                            placeholder="Enter your API key here"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                     <button
                        type="submit"
                        disabled={!keyValue.trim()}
                        className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Save and Continue
                    </button>
                </form>

                <p className="text-xs text-slate-500 mt-4 p-3 bg-slate-50 rounded-md border text-center">
                    Your API key is stored securely in your browser's <strong className="font-semibold">session storage</strong> and is only used to communicate with the Gemini API. It is cleared when you close this tab.
                </p>
            </div>
        </section>
    );
};

export default ApiKeyInstructions;
