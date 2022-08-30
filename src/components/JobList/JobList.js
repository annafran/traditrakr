import { jobListState } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import JobItem from "./JobItem";
import { useEffect } from "react";

export const JobList = ({ setActive }) => {
  useEffect(() => {
    setActive("/");
  }, [setActive]);

  const jobList = useRecoilValue(jobListState);
  return (
    <div>
      {jobList.map((jobItem) => (
        <JobItem key={jobItem.jobId} item={jobItem} />
      ))}
    </div>
  );
};
