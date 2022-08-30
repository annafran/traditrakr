import { useRecoilState } from "recoil";
import { jobListSortState } from "../../state/atoms";
import { Select, Text, Box } from "@mantine/core";

export const JobSort = () => {
  const [value, setValue] = useRecoilState(jobListSortState);

  return (
    <Box mb="3rem">
      <Text>Sort by date:</Text>
      <Select
        value={value}
        onChange={setValue}
        data={[
          { value: "Most Recent", label: "Most recent" },
          { value: "Least Recent", label: "Least recent" },
        ]}
      />
    </Box>
  );
};
