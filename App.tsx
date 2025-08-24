
import React, { useState, useCallback } from 'react';
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

    // The API key is now expected to be in the environment variables.
    // We check for its presence to determine which UI to show.
    const apiKeyIsSet = process.env.API_KEY && process.env.API_KEY.length > 0;

    const handleGenerate = useCallback(async () => {
        if (!syllabus.trim()) {
            setError('Please enter a syllabus outline or some topic keywords to begin.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setLearningGuide('');
        try {
            const guide = await generateLearningGuide(syllabus, citationStyle, contentStyle);
            setLearningGuide(guide);
        } catch (err) {
            console.error('Error generating guide:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
            setError(`Failed to generate guide: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [syllabus, citationStyle, contentStyle]);

    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 -mt-20 relative z-10">
                {!apiKeyIsSet ? (
                    <ApiKeyInstructions />
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
