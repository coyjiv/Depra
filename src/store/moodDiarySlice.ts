import moment from "moment";
import { create} from "zustand";

interface MoodState {
    selectedDate: moment.Moment
    setSelectedDate: (date: moment.Moment ) => void
    visibleMonth: moment.Moment
    setVisibleMonth: (month: moment.Moment) => void
  }

export const useMoodStore = create<MoodState>((set) => ({
    selectedDate: moment(),
    setSelectedDate: (date) => set({ selectedDate: date }),
    visibleMonth: moment(),
    setVisibleMonth: (month) => set({ visibleMonth: month }),
}));