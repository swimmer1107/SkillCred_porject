import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-yellow-300 text-white shadow-lg">
            <div className="max-w-4xl mx-auto py-20 md:py-24 px-4 md:px-8 text-center">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-sm">
                    AI-Powered Study Guide Generator
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
                    Transform any syllabus into professional academic content using advanced AI.
                </p>
            </div>
        </header>
    );
};

export default Header;