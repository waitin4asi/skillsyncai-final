
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Skill Sync AI
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Discover your ideal career path. Enter your skills, interests, and passions, and let our AI guide you to your future.
            </p>
        </header>
    );
};
