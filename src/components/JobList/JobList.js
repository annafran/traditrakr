import { jobListState } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import JobItem from "./JobItem";
import { useEffect } from "react";
import { Container } from "@mantine/core";

export const JobList = ({ setActive }) => {
  useEffect(() => {
    setActive("/");
  }, [setActive]);

  const jobList = useRecoilValue(jobListState);
  return (
    <Container mt="2rem">
      {jobList.map((jobItem) => (
        <JobItem key={jobItem.jobId} item={jobItem} />
      ))}
    </Container>
  );
};
