import React from "react";
import { useRecoilState } from "recoil";
import { jobListState } from "../../state/atoms";
import {
  Text,
  Group,
  Button,
  Container,
  Badge,
  createStyles,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const useStyles = createStyles((theme) => ({
  jobDate: {
    flexGrow: "1",
  },
  jobName: {
    width: "7rem",
  },
  clientName: {
    width: "7rem",
  },
}));

const JobItem = ({ item }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [jobList, setJobList] = useRecoilState(jobListState);
  const index = jobList.findIndex((listItem) => listItem === item);
  const deleteItem = () => {
    const newList = removeItemAtIndex(jobList, index);
    setJobList(newList);
  };

  return (
    <Container mt="2rem">
      <Group noWrap>
        <Text className={classes.clientName}>{item.clientName}</Text>
        <Text className={classes.jobName}>{item.jobName}</Text>
        <Text className={classes.jobDate}>{formatDate(item.createdDate)}</Text>
        <Badge color="red">{item.status}</Badge>
        <Button
          color="orange.5"
          onClick={() => navigate(`/jobs/${item.jobId}`)}
        >
          View
        </Button>
        <Button
          color="yellow"
          onClick={() => navigate(`/jobs/edit/${item.jobId}`)}
        >
          Edit
        </Button>
        <Button color="red.9" onClick={deleteItem}>
          Delete
        </Button>
      </Group>
    </Container>
  );
};

export default JobItem;
