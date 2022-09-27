import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";
import { formList } from "@mantine/form";
import { jobListState } from "../../state/atoms";
import { useNavigate } from "react-router-dom";
import { JobForm } from "./JobForm";
import { FunctionComponent, useEffect } from "react";
import { randomId } from "@mantine/hooks";
import React from "react";

interface CreateJobProps {
  setActive: (link: string) => void;
}

export const CreateJob: FunctionComponent<CreateJobProps> = ({ setActive }) => {
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
        clientPhoneNumber: "",
        notes: formList([{ note: "", key: randomId() }]),
        status: "",
      }}
    />
  );
};
