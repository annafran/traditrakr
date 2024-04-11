import { jobIdQuery } from "../../state/atoms";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FunctionComponent } from "react";
import { EditJob } from "../ViewJob";
import {
  Container,
  Button,
  Badge,
  Table,
  createStyles,
  Modal,
} from "@mantine/core";
import { formatDate } from "../../utils/formatDate";
import { Job } from "../../models";
import { useState } from "react";

const useStyles = createStyles(() => ({
  tableTitle: {
    fontWeight: "bold",
  },
}));

export const ViewJob: FunctionComponent = () => {
  const [opened, setOpened] = useState(false);
  const { id } = useParams();
  const specificJob = useRecoilValue<Job | undefined>(jobIdQuery(id));
  const { classes } = useStyles();

  if (specificJob === undefined) {
    return null;
  }

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
        <EditJob
          specificJob={specificJob}
          onFormSubmit={() => setOpened(false)}
        />
      </Modal>
    </Container>
  );
};
