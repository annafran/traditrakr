import React from "react";
import { Text, Group, Button, Container, Badge } from "@mantine/core";

const JobItem = ({ item }) => {
  return (
    <Container>
      <Group>
        <Text>{item.jobName}</Text>
        <Text>{item.clientName}</Text>
        <Badge>{item.status}</Badge>
        <Button color="red">Delete</Button>
      </Group>
    </Container>
  );
};

export default JobItem;
