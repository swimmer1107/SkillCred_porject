import React from 'react';
import Loader from './Loader';
import SparklesIcon from './icons/SparklesIcon';
import CogIcon from './icons/CogIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';

interface SyllabusInputFormProps {
    syllabus: string;
    setSyllabus: (value: string) => void;
    citationStyle: string;
    setCitationStyle: (value: string) => void;
    contentStyle: string;
    setContentStyle: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const SyllabusInputForm: React.FC<SyllabusInputFormProps> = ({ 
    syllabus, setSyllabus, 
    citationStyle, setCitationStyle, 
    contentStyle, setContentStyle,
    onGenerate, isLoading 
}) => {
    const contentStyleOptions = [
        { id: 'guide', value: 'Comprehensive Guide', label: 'Comprehensive Guide', description: 'Detailed explanations, examples, and analogies.' },
        { id: 'exam', value: 'Exam Study Notes', label: 'Exam Study Notes', description: 'Concise key points, definitions, and formulas.' }
    ];

    return (
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-6">
                <CogIcon className="h-7 w-7 text-slate-500" />
                <h2 className="text-xl font-bold text-slate-800">Study Guide Configuration</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                    To get started, provide your syllabus content, choose your desired style, and let our AI create a custom study guide for you.
                </p>
            </div>

            <div>
                <label htmlFor="syllabus-input" className="block text-base font-semibold text-slate-700">
                    Syllabus Outline or Keywords
                </label>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                    Paste your course syllabus, lecture topics, or just a list of keywords below.
                </p>
                <textarea
                    id="syllabus-input"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    placeholder="e.g., Introduction to Quantum Mechanics, The Wave Function, Schrödinger Equation, Quantum Tunneling..."
                    className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y bg-white"
                    disabled={isLoading}
                    aria-label="Syllabus input"
                />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="citation-style" className="block text-base font-semibold text-slate-700">
                        Citation Style
                    </label>
                    <p className="text-sm text-slate-500 mt-1 mb-3">
                        Choose the citation format for references.
                    </p>
                    <select
                        id="citation-style"
                        value={citationStyle}
                        onChange={(e) => setCitationStyle(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white"
                        disabled={isLoading}
                        aria-label="Citation style"
                    >
                        <option>APA</option>
                        <option>MLA</option>
                        <option>Chicago</option>
                        <option>Harvard</option>
                    </select>
                </div>
                <div>
                    <h3 className="block text-base font-semibold text-slate-700">
                        Content Style
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 mb-3">
                        Select the type of content you want to generate.
                    </p>
                    <fieldset className="space-y-3">
                        <legend className="sr-only">Content Style</legend>
                        {contentStyleOptions.map((option) => (
                            <div key={option.id} className="relative flex items-start">
                                <div className="flex items-center h-5">
                                <input
                                    id={option.id}
                                    aria-describedby={`${option.id}-description`}
                                    name="content-style"
                                    type="radio"
                                    value={option.value}
                                    checked={contentStyle === option.value}
                                    onChange={() => setContentStyle(option.value)}
                                    disabled={isLoading}
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300"
                                />
                                </div>
                                <div className="ml-3 text-sm">
                                <label htmlFor={option.id} className="font-medium text-slate-800">
                                    {option.label}
                                </label>
                                <p id={`${option.id}-description`} className="text-slate-500">
                                    {option.description}
                                </p>
                                </div>
                            </div>
                        ))}
                    </fieldset>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                    onClick={onGenerate}
                    disabled={isLoading || !syllabus.trim()}
                    className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Generate study guide"
                >
                    {isLoading ? (
                        <>
                            <Loader className="w-5 h-5 mr-3" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            <span>Generate Guide</span>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default SyllabusInputForm;