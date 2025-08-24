
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SyllabusInputForm from './components/SyllabusInputForm';
import GuideOutput from './components/GuideOutput';
import ApiKeyInstructions from './components/ApiKeyInstructions';
import { generateLearningGuide } from './services/geminiService';

const App: React.FC = () => {
    const [syllabus, setSyllabus] = useState<string>('');
    const [citationStyle, setCitationStyle] = useState<string>('APA');
    const [contentStyle, setContentStyle] = useState<string>('Comprehensive Guide');
    const [learningGuide, setLearningGuide] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        // On initial load, check session storage for a previously entered API key.
        const storedKey = sessionStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
        } else {
            // Fallback to environment variables if no session key is found
            const envApiKey = (typeof process !== 'undefined' && process.env.API_KEY) 
                ? process.env.API_KEY
                : undefined;
            if (envApiKey) {
                setApiKey(envApiKey);
            }
        }
    }, []);

    const handleKeySubmit = (submittedKey: string) => {
        if (submittedKey) {
            sessionStorage.setItem('gemini_api_key', submittedKey);
            setApiKey(submittedKey);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!apiKey) {
            setError('API Key is not set. Please configure it first.');
            return;
        }
        if (!syllabus.trim()) {
            setError('Please enter a syllabus outline or some topic keywords to begin.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setLearningGuide('');
        try {
            const guide = await generateLearningGuide(syllabus, citationStyle, contentStyle, apiKey);
            setLearningGuide(guide);
        } catch (err) {
            console.error('Error generating guide:', err);
            setError('An unexpected error occurred. Please check your API key and connection, then try again. The key might be invalid or have exceeded its quota.');
        } finally {
            setIsLoading(false);
        }
    }, [syllabus, citationStyle, contentStyle, apiKey]);

    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 -mt-20 relative z-10">
                {!apiKey ? (
                    <ApiKeyInstructions onKeySubmit={handleKeySubmit} />
                ) : (
                    <>
                        <SyllabusInputForm 
                            syllabus={syllabus}
                            setSyllabus={setSyllabus}
                            citationStyle={citationStyle}
                            setCitationStyle={setCitationStyle}
                            contentStyle={contentStyle}
                            setContentStyle={setContentStyle}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                        />
                        {error && (
                            <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                                <p className="font-medium">Error</p>
                                <p>{error}</p>
                            </div>
                        )}
                        <GuideOutput 
                            guideContent={learningGuide}
                            isLoading={isLoading}
                        />
                    </>
                )}
            </main>
        </>
    );
};

export default App;