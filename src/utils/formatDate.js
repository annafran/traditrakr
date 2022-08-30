import { format } from "date-fns";

export const formatDate = (date) => format(date, "iii dd LLL yyyy, HH:m");
