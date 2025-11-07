
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
            <p className="text-gray-300 mt-4 text-lg">AI is charting your destiny...</p>
            <p className="text-gray-500 mt-1 text-sm">This may take a moment.</p>
        </div>
    );
};
