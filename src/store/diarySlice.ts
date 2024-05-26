export interface DiaryState {
    entries: string[]; // Just an example
}

export const createDiarySlice = (set, get) => ({
    entries: [],
});
