import { useRecoilState } from "recoil";
import { jobListFilterState } from "../../state/atoms";
import { Select, Text, Box } from "@mantine/core";

export const JobSort = () => {
  const [{ status, sort }, setFilters] = useRecoilState(jobListFilterState);

  return (
    <Box>
      <Text>Sort by date:</Text>
      <Select
        value={sort}
        onChange={(value) => setFilters({ status, sort: value })}
        data={[
          { value: "Most Recent", label: "Most recent" },
          { value: "Least Recent", label: "Least recent" },
        ]}
      />
    </Box>
  );
};
