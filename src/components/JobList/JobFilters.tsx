import { useRecoilState } from "recoil";
import { jobListFilterState } from "../../state/atoms";
import { Select, Text, Box, createStyles } from "@mantine/core";
import { FilterState } from "../../models/filterstate";

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
      fontSize: "0.7rem",
    },
  },
}));

export const JobFilters = () => {
  const [{ status, sort }, setFilters] =
    useRecoilState<FilterState>(jobListFilterState);
  const { classes } = useStyles();

  return (
    <Box>
      <Text className={classes.label}>Filter by status:</Text>
      <Select
        classNames={{ input: classes.input }}
        value={status}
        onChange={(value: string) => setFilters({ status: value, sort })}
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
