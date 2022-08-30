import React from "react";
import { useRecoilState } from "recoil";
import { jobListState } from "../../state/atoms";
import { Text, Group, Button, Container, Badge } from "@mantine/core";

const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const JobItem = ({ item }) => {
  const [jobList, setJobList] = useRecoilState(jobListState);
  const index = jobList.findIndex((listItem) => listItem === item);
  const deleteItem = () => {
    const newList = removeItemAtIndex(jobList, index);
    setJobList(newList);
  };

  return (
    <Container>
      <Group>
        <Text>{item.jobName}</Text>
        <Text>{item.clientName}</Text>
        <Badge>{item.status}</Badge>
        <Button color="red" onClick={deleteItem}>
          Delete
        </Button>
      </Group>
    </Container>
  );
};

export default JobItem;
