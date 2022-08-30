import { filteredJobListState } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Container } from "@mantine/core";
import { JobFilters } from "./JobFilters";
import { JobItem } from "./JobItem";
import { JobSort } from "./JobSort";
import { Text, Group } from "@mantine/core";

export const JobList = ({ setActive }) => {
  useEffect(() => {
    setActive("/");
  }, [setActive]);

  const jobList = useRecoilValue(filteredJobListState);
  console.log(jobList);
  return (
    <Container mt="2rem">
      <Group mb="2rem" position="right">
        <JobSort />
        <JobFilters />
      </Group>

      {jobList.length === 0 && <Text>No jobs</Text>}
      {jobList.map((jobItem) => (
        <JobItem key={jobItem.jobId} item={jobItem} />
      ))}
    </Container>
  );
};
