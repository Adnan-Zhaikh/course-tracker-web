export interface Student {
    id: number;
    name: string;
    email: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    totalLectures: number;
}

export interface Lecture {
    id: number;
    courseId: number;
    title: string;
    order: number;
}

export interface Enrollment {
    id: number;
    studentId: number;
    courseId: number;
    completedLectures: number;
    enrolledAt: string;
}