
import React from 'react';
import InformationCircleIcon from './icons/InformationCircleIcon';

const ApiKeyInstructions: React.FC = () => {
    return (
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200/50">
            <div className="flex items-start space-x-3 mb-6">
                <InformationCircleIcon className="h-7 w-7 text-red-500 flex-shrink-0" />
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Configuration Error</h2>
                    <p className="text-slate-600 mt-1">This application is not ready to use.</p>
                </div>
            </div>

            <div className="space-y-4 text-slate-700 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900">The Google Gemini API key is missing.</p>
                <p className="text-red-800">
                    To enable this application, the administrator needs to set up the{' '}
                    <code className="bg-red-200 text-red-900 font-mono p-1 rounded">API_KEY</code>
                    {' '}environment variable on the server.
                </p>
            </div>
        </section>
    );
};

export default ApiKeyInstructions;
