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
      fontSize: "0.7rem",
    },
  },
}));

export const JobSort = () => {
  const [{ status, sort }, setFilters] = useRecoilState(jobListFilterState);
  const { classes } = useStyles();

  return (
    <Box>
      <Text className={classes.label}>Sort by date:</Text>
      <Select
        classNames={{ input: classes.input }}
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
