import { useRecoilState } from "recoil";
import { jobListFilterState } from "../../state/atoms";
import { Select, Text, Box } from "@mantine/core";

export const JobFilters = () => {
  const [{ status, sort }, setFilters] = useRecoilState(jobListFilterState);

  return (
    <Box>
      <Text>Filter by status:</Text>
      <Select
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
