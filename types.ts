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