import { filteredJobListState, jobListState } from "../../state/atoms";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Text,
    Stack,
    Container,
    Button,
    Badge,
    Modal,
    Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import { formatDate } from "../../utils/formatDate";

const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const ViewJob = () => {
    const { id } = useParams();
    const [jobList, setJobList] = useRecoilState(jobListState);
    const [viewedJob, setViewedJob] = useState({});
    const index = jobList.findIndex(viewedJob);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const findJob = () => {
            const foundJob = jobList.find((obj) => obj.jobId === id);
            setViewedJob(foundJob);
        };
        findJob();
    }, [id, jobList]);

    const form = useForm({
        initialValues: {
            status: viewedJob.status,
        },
    });

    const handleSubmit = (values) => {
        const newList = replaceItemAtIndex(jobList, index, {
            ...viewedJob,
            ...values,
        });

        setJobList(newList);
        // setViewedJob({ ...viewedJob, values });
        // setJobList([...jobList, viewedJob]);
        setOpened(false);
    };

    return (
        <Container mt="2rem">
            <Text>{viewedJob.jobId}</Text>
            <Badge>{viewedJob.status}</Badge>
            <Stack>
                <Text>{viewedJob.jobName}</Text>
                <Text>{viewedJob.clientName}</Text>
                <Text>{viewedJob.clientPhoneNumber}</Text>
                <Text>{viewedJob.clientEmail}</Text>
                {/* {viewedJob.notes.map((obj) => (
                    <Text key={obj.key}>{obj.note}</Text>
                ))} */}
                {/* <Text>{formatDate(viewedJob.createdDate)}</Text> */}
            </Stack>
            <Button color="orange" onClick={() => setOpened(true)}>
                Edit
            </Button>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Update the job"
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Select
                        label="Change job status"
                        placeholder="Select a status"
                        data={[
                            { value: "scheduled", label: "scheduled" },
                            { value: "active", label: "active" },
                            { value: "invoicing", label: "invoicing" },
                            { value: "priced", label: "priced" },
                            { value: "completed", label: "completed" },
                        ]}
                        {...form.getInputProps("status")}
                        // className={classes.input}
                    />{" "}
                    <Button
                        radius="xl"
                        size="md"
                        mt="1rem"
                        type="submit"
                        // className={classes.control}
                    >
                        Update job
                    </Button>
                </form>
            </Modal>
        </Container>
    );
};
