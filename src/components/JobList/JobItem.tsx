import React from "react";

import {
  Box,
  Group,
  Button,
  Badge,
  createStyles,
  Divider,
  MediaQuery,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { FunctionComponent } from "react";
import { Job } from "../../models";

const useStyles = createStyles((theme) => ({
  clientName: {
    width: "7rem",
    fontWeight: "bold",
    padding: "5px",
    fontSize: "0.9rem",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "0.7rem",
      width: "4rem",
    },
  },
  jobName: {
    padding: "5px",
    fontSize: "0.9rem",
    flexGrow: "1",
    [theme.fn.smallerThan("xs")]: {
      fontSize: "0.7rem",
    },
  },
}));

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

interface JobItemProps {
  item: Job;
  onDeleteJob: (jobId: string) => void;
}

export const JobItem: FunctionComponent<JobItemProps> = ({
  item,
  onDeleteJob,
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Group noWrap>
        <Box className={classes.clientName}>{item.clientName}</Box>
        <Box data-testid="jobName" className={classes.jobName}>
          {item.jobName}
        </Box>
        <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
          <Badge size="md" variant="filled" color={handleColor(item.status)}>
            {item.status}
          </Badge>
        </MediaQuery>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Badge size="xs" variant="filled" color={handleColor(item.status)}>
            {item.status}
          </Badge>
        </MediaQuery>
        <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
          <Button
            color="orange"
            size="xs"
            onClick={() => navigate(`/jobs/${item.jobId}`)}
          >
            View
          </Button>
        </MediaQuery>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Button
            color="orange"
            p={5}
            size={12}
            onClick={() => navigate(`/jobs/${item.jobId}`)}
          >
            View
          </Button>
        </MediaQuery>
        <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
          <Button color="red" size="xs" onClick={() => onDeleteJob(item.jobId)}>
            Delete
          </Button>
        </MediaQuery>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Button
            color="red"
            p={5}
            size={12}
            onClick={() => onDeleteJob(item.jobId)}
          >
            Delete
          </Button>
        </MediaQuery>
      </Group>
      <Divider my="sm" />
    </>
  );
};
