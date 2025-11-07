
export interface UserProfile {
    technicalSkills: string;
    communicationSkills: string;
    interests: string;
    passions: string;
    resume: string;
}

export interface CareerProfile {
    title: string;
    description: string;
    reasoning: string;
    keyResponsibilities: string[];
}

export interface RecommendedCourse {
    title: string;
    platform: string;
    description: string;
}

export interface CareerSuggestion {
    careerProfile: CareerProfile;
    creativeCareerProfile?: CareerProfile;
    recommendedCourses: RecommendedCourse[];
}
