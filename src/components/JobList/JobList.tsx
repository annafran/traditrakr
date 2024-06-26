import { filteredJobListState, jobListState } from "../../state/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import { Container } from "@mantine/core";
import { JobFilters } from "./JobFilters";
import { JobItem } from "./JobItem";
import { JobSort } from "./JobSort";
import { Text, Group } from "@mantine/core";

export const JobList: FunctionComponent = () => {
    const [jobList, setJobList] = useRecoilState(jobListState);
    const filteredJobList = useRecoilValue(filteredJobListState);

    const deleteJob = (id: string) => {
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
                <JobItem
                    key={jobItem.jobId}
                    item={jobItem}
                    onDeleteJob={deleteJob}
                />
            ))}
        </Container>
    );
};
