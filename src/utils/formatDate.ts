import { format } from "date-fns";

export const formatDate = (date: Date) =>
  format(date, "iii dd LLL yyyy, HH:mm");
