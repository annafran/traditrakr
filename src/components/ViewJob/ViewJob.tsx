import { jobListState, jobIdQuery } from "../../state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { FunctionComponent, useState } from "react";
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
  Table,
  createStyles,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { formatDate } from "../../utils/formatDate";
import React from "react";
import { Job } from "../../models";

const useStyles = createStyles(() => ({
  tableTitle: {
    fontWeight: "bold",
  },
}));

const replaceJobAtIndex = (arr: Job[], index: number, newValue: Job) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const ViewJob: FunctionComponent = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useRecoilState(jobListState);
  const [opened, setOpened] = useState(false);
  const specificJob = useRecoilValue<Job>(jobIdQuery(id));
  const { classes } = useStyles();

  const tableItems = [
    { title: "Job ID", information: specificJob.jobId },
    { title: "Job Name", information: specificJob.jobName },
    { title: "Client Name", information: specificJob.clientName },
    { title: "Client Mobile", information: specificJob.clientPhoneNumber },
    { title: "Client Email", information: specificJob.clientEmail },
    { title: "Created Date", information: formatDate(specificJob.createdDate) },
    ...specificJob.notes.map((obj) => {
      return { title: "Notes", information: obj.note };
    }),
  ];

  const rows = tableItems.map((item, index) => (
    <tr key={`${index}-${item.title}`}>
      <td className={classes.tableTitle}>{item.title}</td>
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
      notes: formList([...specificJob.notes]),
      status: specificJob.status,
    },
  });

  const handleSubmit = (values: Job, jobItem: Job) => {
    const index = jobList.findIndex((item) => item === jobItem);
    const updatedJobList = replaceJobAtIndex(jobList, index, {
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

  const handleColor = (status: string) => {
    let color;
    switch (status) {
      case "completed":
        color = "red";
        break;
      case "scheduled":
        color = "gray";
        break;
      case "invoicing":
        color = "blue";
        break;
      case "priced":
        color = "yellow";
        break;
      case "active":
        color = "green";
        break;
      default:
        color = "gray";
    }
    return color;
  };

  return (
    <Container mt="2rem" size="xs">
      <Badge variant="filled" color={handleColor(specificJob.status)}>
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
