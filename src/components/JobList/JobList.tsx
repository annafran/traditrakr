import { filteredJobListState, jobListState } from "../../state/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { FunctionComponent, useEffect } from "react";
import { Container } from "@mantine/core";
import { JobFilters } from "./JobFilters";
import { JobItem } from "./JobItem";
import { JobSort } from "./JobSort";
import { Text, Group } from "@mantine/core";

interface JobListProps {
  setActive: (link: string) => void;
}

export const JobList: FunctionComponent<JobListProps> = ({ setActive }) => {
  const [jobList, setJobList] = useRecoilState(jobListState);
  const filteredJobList = useRecoilValue(filteredJobListState);
  useEffect(() => {
    setActive("/");
  }, [setActive]);

  const deleteJob = (id) => {
    setJobList([
      ...jobList.filter((job) => {
        return job.jobId !== id;
      }),
    ]);
  };

  return (
    <Container mt="2rem">
      <Group mb="2rem" position="right">
        <JobSort />
        <JobFilters />
      </Group>
      {filteredJobList.length === 0 && <Text>No jobs</Text>}
      {filteredJobList.map((jobItem) => (
        <JobItem key={jobItem.jobId} item={jobItem} onDeleteJob={deleteJob} />
      ))}
    </Container>
  );
};
