import React from "react";
import { useRecoilState } from "recoil";
import { jobListState } from "../../state/atoms";
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

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

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

const handleColor = (status) => {
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

export const JobItem = ({ item }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [jobList, setJobList] = useRecoilState(jobListState);
  const index = jobList.findIndex((listItem) => listItem === item);
  const deleteItem = () => {
    const newList = removeItemAtIndex(jobList, index);
    setJobList(newList);
  };

  return (
    <>
      <Group className={classes.container} noWrap>
        <Box className={classes.clientName}>{item.clientName}</Box>
        <Box className={classes.jobName}>{item.jobName}</Box>
        <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
          <Badge
            size="md"
            className={classes.badge}
            variant="filled"
            color={handleColor(item.status)}
            // color={item.status === "completed" ? "red" : "gray"}
          >
            {item.status}
          </Badge>
        </MediaQuery>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Badge
            size="xs"
            className={classes.badge}
            variant="filled"
            color={handleColor(item.status)}
            // color={item.status === "completed" ? "red" : "gray"}
          >
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
          <Button color="red" size="xs" onClick={deleteItem}>
            Delete
          </Button>
        </MediaQuery>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Button color="red" p={5} size={12} onClick={deleteItem}>
            Delete
          </Button>
        </MediaQuery>
      </Group>
      <Divider my="sm" />
    </>
  );
};
