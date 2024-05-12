import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const getDayRangeTimestamps = (date) => {
    const startOfDay = moment(date).startOf('day').toDate(); // Start of day
    const endOfDay = moment(date).endOf('day').toDate(); // End of day

    return {
        start: Timestamp.fromDate(startOfDay),
        end: Timestamp.fromDate(endOfDay)
    };
};