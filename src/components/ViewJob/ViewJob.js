import { jobListState } from "../../state/atoms";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { Container, Button, Badge, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { formatDate } from "../../utils/formatDate";

const replaceJobAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const ViewJob = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useRecoilState(jobListState);
  const [viewedJob, setViewedJob] = useState({});
  const [opened, setOpened] = useState(false);

  const tableItems = [
    { title: "Job ID", information: viewedJob.jobId },
    { title: "Job Name", information: viewedJob.jobName },
    { title: "Client Name", information: viewedJob.clientName },
    { title: "Client Mobile", information: viewedJob.clientPhoneNumber },
    { title: "Client Email", information: viewedJob.clientEmail },
    // { title: "Created Date", information: formatDate(viewedJob.createdDate) },
    // viewedJob.notes.map((obj) => {
    //   return { title: "Notes", information: obj.note };
    // }),
  ];

  const rows = tableItems.map((item) => (
    <tr key={item.name}>
      <td>{item.title}</td>
      <td>{item.information}</td>
    </tr>
  ));

  useEffect(() => {
    const findJob = () => {
      const foundJob = jobList.find((obj) => obj.jobId === id);
      setViewedJob(foundJob);
    };
    findJob();
  }, [id, jobList]);

  const form = useForm({
    initialValues: {
      jobId: viewedJob.jobId,
      createdDate: viewedJob.createdDate,
      clientName: viewedJob.clientName,
      clientEmail: viewedJob.clientEmail,
      jobName: viewedJob.jobName,
      clientPhoneNumber: viewedJob.clientPhoneNumber,
      notes: viewedJob.notes,
      status: viewedJob.status,
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

  return (
    <Container mt="2rem" size="xs">
      <Badge
        variant="filled"
        color={viewedJob.status === "completed" ? "red" : "gray"}
      >
        {viewedJob.status}
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
        title="Update the job"
      >
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values, viewedJob))}
        >
          <Select
            label="Change job status"
            placeholder="Select a status"
            value={viewedJob.status}
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
