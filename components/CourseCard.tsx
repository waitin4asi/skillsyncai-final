
import React from 'react';
import type { RecommendedCourse } from '../types';

interface CourseCardProps {
    course: RecommendedCourse;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 transition-transform transform hover:scale-[1.02] hover:border-purple-500/70 duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-gray-100">{course.title}</h4>
                    <span className="text-xs font-medium text-purple-400 bg-purple-900/50 px-2 py-0.5 rounded-full">{course.platform}</span>
                </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">{course.description}</p>
        </div>
    );
};
