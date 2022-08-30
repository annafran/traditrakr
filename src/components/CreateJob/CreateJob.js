import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";
import { jobListState } from "../../state/atoms";
import { useNavigate } from "react-router-dom";
import { JobForm } from "../Common/JobForm";
import { useEffect } from "react";

export const CreateJob = ({ setActive }) => {
  useEffect(() => {
    setActive("/createjob");
  }, [setActive]);

  const [jobList, setJobList] = useRecoilState(jobListState);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setJobList([...jobList, values]);
    navigate("/");
  };

  return (
    <JobForm
      onJobSubmit={handleSubmit}
      job={{
        jobId: uuid(),
        createdDate: Date.now(),
        clientName: "",
        clientEmail: "",
        jobName: "",
        clientPhoneNumber: null,
        notes: "",
        status: "",
      }}
    />
  );
};
