import { Timestamp } from "firebase/firestore";

export type Navigation = {
    navigation: any
};

export enum DAY {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
};

export type MoodData = {
    cognitiveDistortions: string[],
    rationalResponse: string,
    emotionsBefore: string[],
    emotionsAfter: string[],
    automaticThoughts: string,
}

export type MoodDoc = {
    id: string;
    data: MoodData,
    createdDate: Timestamp,
    modifiedDate: Timestamp,
    userId: string
}

export interface TestRecord {
    id: string;
    type: string;
    score: number;
    createdDate: Timestamp;
    userId: string;
}

export interface TestStats {
    totalTests: number;
    testProgress: {
        monthly: TestRecord[];
        yearly: TestRecord[];
        allTime: TestRecord[];
    }
}

export interface DiaryPeriodStats {
    totalDiaryEntries: number;
    emotionCounts: Map<string, number>;
    distortionCounts: Map<string, number>;
    positiveEmotionCount: number;
    negativeEmotionCount: number;
    neutralEmotionCount: number;
    emotionImprovementRatio: {
        positive: number;
        negative: number;
        neutral: number
    };
    emotionChangeDetails: Array<{ timestamp: Timestamp; emotion: string; before: number; after: number }>;
    distortionFrequency: Array<{
        timestamp: Timestamp;
    } & {
        [ distortion: string ]: number;
    }>;
    mostCommonDistortions: Array<{ timestamp: Timestamp; distortions: string[] }>;
    [ key: string ]: any;
    mostCommonEmotions: Array<{ emotion: string; count: number }>;

}

export interface DiaryStats {
    allTime: DiaryPeriodStats;
    yearly: DiaryPeriodStats;
    monthly: DiaryPeriodStats;
    weekly: DiaryPeriodStats;
}


export interface Statistics {
    userId: string;

    testProgress: TestStats;
    diaryStats: FirestoreDiaryStats;
}

export interface FirestoreDiaryPeriodStats {
    totalDiaryEntries: number;
    emotionCounts: { [ key: string ]: number };
    distortionCounts: { [ key: string ]: number };
    positiveEmotionCount: number;
    negativeEmotionCount: number;
    neutralEmotionCount: number;
    emotionImprovementRatio: {
        positive: number;
        negative: number;
        neutral: number;
    };
    emotionChangeDetails: Array<{ timestamp: Timestamp; emotion: string; before: number; after: number }>;
    distortionFrequency: Array<{
        timestamp: Timestamp;
    } & {
        [ distortion: string ]: number;
    }>;
    mostCommonDistortions: Array<{ timestamp: Timestamp; distortions: string[] }>;
    mostCommonEmotions: Array<{ emotion: string; count: number }>;
}

export interface FirestoreDiaryStats {
    allTime: FirestoreDiaryPeriodStats;
    yearly: FirestoreDiaryPeriodStats;
    monthly: FirestoreDiaryPeriodStats;
    weekly: FirestoreDiaryPeriodStats;
}

export interface User {
    confirmedEmail: boolean,
    createdAt: Timestamp,
    displayName: string,
    userId: string,
    email: string,
    nextTestDate: Timestamp,
    provider: string,
}