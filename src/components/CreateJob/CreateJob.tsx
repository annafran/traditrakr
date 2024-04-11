import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";
import { formList } from "@mantine/form";
import { jobListState } from "../../state/atoms";
import { useNavigate } from "react-router-dom";
import { JobForm } from "./JobForm";
import { FunctionComponent } from "react";
import { randomId } from "@mantine/hooks";
import { Job } from "../../models";

export const CreateJob: FunctionComponent = () => {
    const [jobList, setJobList] = useRecoilState<Job[]>(jobListState);
    const navigate = useNavigate();

    const handleSubmit = (values: Job) => {
        setJobList([...jobList, values]);
        navigate("/");
    };

    return (
        <JobForm
            onJobSubmit={handleSubmit}
            job={{
                jobId: uuid(),
                createdDate: new Date(),
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
