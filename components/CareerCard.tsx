
import React from 'react';
import type { CareerProfile } from '../types';

interface CareerCardProps {
    profile: CareerProfile;
    isCreative?: boolean;
}

export const CareerCard: React.FC<CareerCardProps> = ({ profile, isCreative = false }) => {
    const borderClass = isCreative 
        ? 'border-teal-500/50 shadow-teal-900/20' 
        : 'border-purple-500/50 shadow-purple-900/20';
    
    const gradientTextClass = isCreative
        ? 'from-teal-400 to-cyan-500'
        : 'from-purple-400 to-pink-500';

    return (
        <div className={`bg-gray-800/30 backdrop-blur-sm border ${borderClass} rounded-xl p-6 shadow-2xl`}>
            {isCreative && (
                 <div className="inline-block bg-teal-500/10 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Creative Path
                </div>
            )}
            <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${gradientTextClass}`}>
                {profile.title}
            </h2>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">{profile.reasoning}</p>

            <div className="mt-5 border-t border-gray-700/50 pt-5">
                <h3 className="font-semibold text-gray-200 mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                    {profile.keyResponsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                            <svg className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-400 text-sm">{resp}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
