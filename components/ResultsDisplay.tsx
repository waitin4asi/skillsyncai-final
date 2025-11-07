
import React from 'react';
import type { CareerSuggestion } from '../types';
import { Loader } from './Loader';
import { CareerCard } from './CareerCard';
import { CourseCard } from './CourseCard';

interface ResultsDisplayProps {
    suggestion: CareerSuggestion | null;
    isLoading: boolean;
    error: string | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ suggestion, isLoading, error }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-800/30 backdrop-blur-sm border border-red-500/50 rounded-xl p-8">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-red-300">An Error Occurred</h3>
                    <p className="mt-1 text-sm text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    if (!suggestion) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
                <div className="text-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.665-2.664l-1.938-.648 1.938-.648a3.375 3.375 0 002.665-2.664l.648-1.938.648 1.938a3.375 3.375 0 002.665 2.664l1.938.648-1.938.648a3.375 3.375 0 00-2.665 2.664z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-300">Your Future Awaits</h3>
                    <p className="mt-1 text-sm text-gray-500">Fill out the form to discover your personalized career path.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-8 h-full max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
            <CareerCard profile={suggestion.careerProfile} />

            {suggestion.creativeCareerProfile && (
                <CareerCard profile={suggestion.creativeCareerProfile} isCreative={true} />
            )}

            <div>
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Recommended Courses</h2>
                <div className="space-y-4">
                    {suggestion.recommendedCourses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
            {/* Fix: Replaced non-standard `<style jsx>` with a standard `<style>` tag for CSS-in-JS. The `jsx` attribute is specific to frameworks like Next.js and is not supported in this React setup. */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937; /* gray-800 */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563; /* gray-600 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280; /* gray-500 */
                }
            `}</style>
        </div>
    );
};
