import { format } from "date-fns";

export const formatDate = (date) =>
  format(new Date(date), "iii dd LLL yyyy, HH:m");
