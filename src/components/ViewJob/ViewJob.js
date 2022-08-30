import { jobListState } from "../../state/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text, Stack, Container, Button, Badge } from "@mantine/core";
import { formatDate } from "../../utils/formatDate";

export const ViewJob = () => {
  const { id } = useParams();
  const jobList = useRecoilValue(jobListState);
  const [viewedJob, setViewedJob] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const findJob = () => {
      const foundJob = jobList.find((obj) => obj.jobId === id);
      setViewedJob(foundJob);
    };
    findJob();
  }, [id, jobList]);

  return (
    <Container mt="2rem">
      <Stack>
        <Text>{viewedJob.jobName}</Text>
        <Text>{viewedJob.clientName}</Text>
        <Text>{viewedJob.clientPhoneNumber}</Text>
        <Text>{viewedJob.clientEmail}</Text>
        <Text>{viewedJob.notes}</Text>
        {/* <Text>{formatDate(viewedJob.createdDate)}</Text> */}
      </Stack>
      <Badge>{viewedJob.status}</Badge>
      <Button
        color="orange.5"
        onClick={() => navigate(`/jobs/edit/${viewedJob.jobId}`)}
      >
        Edit
      </Button>
    </Container>
  );
};
