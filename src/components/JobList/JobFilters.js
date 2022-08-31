import { useRecoilState } from "recoil";
import { jobListFilterState } from "../../state/atoms";
import { Select, Text, Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: "0.9rem",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "0.7rem",
    },
  },
  input: {
    [theme.fn.smallerThan("xs")]: {
      width: "8rem",
    },
  },
}));

export const JobFilters = () => {
  const [{ status, sort }, setFilters] = useRecoilState(jobListFilterState);
  const { classes } = useStyles();

  return (
    <Box>
      <Text className={classes.label}>Filter by status:</Text>
      <Select
        className={classes.input}
        value={status}
        onChange={(value) => setFilters({ status: value, sort })}
        data={[
          { value: "Show All", label: "All jobs" },
          { value: "Show Uncompleted", label: "Uncompleted jobs" },
          { value: "Show Completed", label: "Completed jobs" },
          { value: "Show Invoicing", label: "Invoiced jobs" },
          { value: "Show Priced", label: "Priced jobs" },
          { value: "Show Scheduled", label: "Scheduled jobs" },
          { value: "Show Active", label: "Active jobs" },
        ]}
      />
    </Box>
  );
};
