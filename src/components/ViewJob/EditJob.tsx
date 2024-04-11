import { jobListState } from "../../state/atoms";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import {
    Button,
    Select,
    Group,
    TextInput,
    ActionIcon,
    Box,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Job } from "../../models";

const replaceJobAtIndex = (arr: Job[], index: number, newValue: Job) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

interface EditJobProps {
    specificJob: Job;
    onFormSubmit?: () => void;
}

export const EditJob: FunctionComponent<EditJobProps> = ({
    specificJob,
    onFormSubmit = () => {},
}) => {
    const [jobList, setJobList] = useRecoilState(jobListState);

    const form = useForm({
        initialValues: {
            jobId: specificJob.jobId,
            createdDate: specificJob.createdDate,
            clientName: specificJob.clientName,
            clientEmail: specificJob.clientEmail,
            jobName: specificJob.jobName,
            clientPhoneNumber: specificJob.clientPhoneNumber,
            notes: formList([...specificJob.notes]),
            status: specificJob.status,
        },
    });

    const fields = form.values.notes.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="Write your note"
                label="Add extra notes"
                sx={{ flex: 1 }}
                {...form.getListInputProps("notes", index, "note")}
            />
            <ActionIcon
                color="red"
                variant="hover"
                onClick={() => form.removeListItem("notes", index)}
            >
                <Trash size={23} />
            </ActionIcon>
        </Group>
    ));

    const handleSubmit = (values: Job, jobItem: Job) => {
        const index = jobList.findIndex((item) => item === jobItem);
        const updatedJobList = replaceJobAtIndex(jobList, index, {
            ...values,
        });
        setJobList(updatedJobList);
        onFormSubmit();
    };

    return (
        <form
            onSubmit={form.onSubmit((values) =>
                handleSubmit(values, specificJob)
            )}
        >
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
            />
            <Box sx={{ maxWidth: "100%" }}>
                {fields}
                <Group position="left" mt="md">
                    <Button
                        color="orange"
                        size="xs"
                        onClick={() =>
                            form.addListItem("notes", {
                                note: "",
                                key: randomId(),
                            })
                        }
                    >
                        Add note
                    </Button>
                </Group>
            </Box>
            <Button radius="xl" size="sm" mt="1rem" color="red" type="submit">
                Update job
            </Button>
        </form>
    );
};
