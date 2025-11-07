
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateCareerSuggestion } from './services/geminiService';
import type { UserProfile, CareerSuggestion } from './types';

const App: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        technicalSkills: '',
        communicationSkills: '',
        interests: '',
        passions: '',
        resume: '',
    });
    const [suggestion, setSuggestion] = useState<CareerSuggestion | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [resumeFileName, setResumeFileName] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('text/') || file.name.endsWith('.md')) {
                 setResumeFileName(file.name);
                 const reader = new FileReader();
                 reader.onload = (event) => {
                    const text = event.target?.result as string;
                    setUserProfile(prev => ({ ...prev, resume: text }));
                 };
                 reader.onerror = () => {
                     setError("Failed to read the resume file.");
                     setResumeFileName('');
                     setUserProfile(prev => ({ ...prev, resume: '' }));
                 }
                 reader.readAsText(file);
            } else {
                alert('Invalid file type. Please upload a plain text file (e.g., .txt, .md).');
            }
        }
        // Allow re-uploading the same file name
        e.target.value = '';
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setSuggestion(null);

        try {
            const result = await generateCareerSuggestion(userProfile);
            setSuggestion(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 antialiased selection:bg-purple-500 selection:text-white">
            <div className="relative isolate min-h-screen">
                <div 
                    className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-600 opacity-20 blur-[100px]"></div>
                </div>

                <main className="container mx-auto px-4 py-8 md:py-12">
                    <Header />
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <InputForm
                            userProfile={userProfile}
                            onInputChange={handleInputChange}
                            onFileChange={handleFileChange}
                            resumeFileName={resumeFileName}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                        <ResultsDisplay
                            suggestion={suggestion}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
