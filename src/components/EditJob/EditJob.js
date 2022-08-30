import { jobListState } from "../../state/atoms";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { JobForm } from "../Common";
import { useRecoilState } from "recoil";

export const EditJob = () => {
  const [jobList, setJobList] = useRecoilState(jobListState);
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    setJobList([...jobList, values]);
    navigate("/");
  };
  return (
    <JobForm
      onJobSave={handleSubmit}
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
