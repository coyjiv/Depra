export interface StatsState {
    entries: string[]; // Just an example
}

export const createStatsSlice = (set, get) => ({
    entries: [],
});
