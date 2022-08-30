import { jobListState, jobIdQuery } from "../../state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Table } from "@mantine/core";
import {
  Container,
  Button,
  Badge,
  Modal,
  Select,
  Group,
  TextInput,
  ActionIcon,
  Box,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { formatDate } from "../../utils/formatDate";

const replaceJobAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const ViewJob = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useRecoilState(jobListState);
  const [opened, setOpened] = useState(false);
  const specificJob = useRecoilValue(jobIdQuery(id));
  console.log(jobList);

  const tableItems = [
    { title: "Job ID", information: specificJob.jobId },
    { title: "Job Name", information: specificJob.jobName },
    { title: "Client Name", information: specificJob.clientName },
    { title: "Client Mobile", information: specificJob.clientPhoneNumber },
    { title: "Client Email", information: specificJob.clientEmail },
    { title: "Created Date", information: formatDate(specificJob.createdDate) },
    // specificJob.notes.map((obj) => {
    //   return { title: "Notes", information: obj.note };
    // }),
  ];

  const rows = tableItems.map((item) => (
    <tr key={item.title}>
      <td>{item.title}</td>
      <td>{item.information}</td>
    </tr>
  ));

  const form = useForm({
    initialValues: {
      jobId: specificJob.jobId,
      createdDate: specificJob.createdDate,
      clientName: specificJob.clientName,
      clientEmail: specificJob.clientEmail,
      jobName: specificJob.jobName,
      clientPhoneNumber: specificJob.clientPhoneNumber,
      notes: formList([{ note: "", key: randomId() }]),
      status: specificJob.status,
    },
  });

  const handleSubmit = (values, jobItem) => {
    const index = jobList.findIndex((item) => item === jobItem);
    const updatedJobList = replaceJobAtIndex(jobList, index, {
      status: jobItem.status,
      ...values,
    });

    setJobList(updatedJobList);
    setOpened(false);
  };

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

  return (
    <Container mt="2rem" size="xs">
      <Badge
        variant="filled"
        color={specificJob.status === "completed" ? "red" : "gray"}
      >
        {specificJob.status}
      </Badge>
      <Table mt="1rem" mb="1rem">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button color="orange" onClick={() => setOpened(true)}>
        Edit job
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Update job# ${specificJob.jobId}`}
      >
        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmit(values, specificJob)
          )}
        >
          <Select
            label="Change job status"
            placeholder="Select a status"
            value={specificJob.status}
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
      </Modal>
    </Container>
  );
};
