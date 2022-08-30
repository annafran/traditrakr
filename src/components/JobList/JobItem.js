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
} from "@mantine/core";

import { useNavigate } from "react-router-dom";

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const useStyles = createStyles(() => ({
  clientName: {
    width: "7rem",
    fontWeight: "bold",
    padding: "5px",
    fontSize: "0.8rem",
  },
  jobName: {
    width: "7rem",
    padding: "5px",
    fontSize: "0.8rem",
    flexGrow: "1",
  },
}));

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

        <Badge
          size="md"
          variant="filled"
          color={item.status === "completed" ? "red" : "gray"}
        >
          {item.status}
        </Badge>

        <Button
          color="orange"
          size="xs"
          onClick={() => navigate(`/jobs/${item.jobId}`)}
        >
          View
        </Button>

        <Button color="red" size="xs" onClick={deleteItem}>
          Delete
        </Button>
      </Group>
      <Divider my="sm" />
    </>
  );
};
