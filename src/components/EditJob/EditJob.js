// import { jobListState } from "../../state/atoms";
// import { useNavigate } from "react-router-dom";
// import { JobForm } from "../Common";
// import { useRecoilState } from "recoil";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Text, Group, Container } from "@mantine/core";

// // const replaceItemAtIndex = (arr, index, newValue) => {
// //   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// // };

// export const EditJob = () => {
//   const { id } = useParams();
//   const [jobList, setJobList] = useRecoilState(jobListState);
//   const [viewedJob, setViewedJob] = useState({});
//   //   const index = todoList.findIndex((listItem) => listItem === item);
//   //   const navigate = useNavigate();

//   useEffect(() => {
//     const findJob = () => {
//       const foundJob = jobList.find((obj) => obj.jobId === id);
//       setViewedJob(foundJob);
//     };
//     findJob();
//   }, [id, jobList]);

//   //   const handleEditJob = (values) => {
//   //     const newList = replaceItemAtIndex(jobList, index, {
//   //       ...item,
//   //       ...values,
//   //     });

//   //     setJobList(newList);
//   //     // navigate("/");
//   //   };
//   return (
//     // <Container>
//     //   <Group>
//     //     <Text>{viewedJob.clientName}</Text>
//     //   </Group>
//     // </Container>

//     <JobForm
//       //   onJobSave={handleEditJob}
//       job={{
//         jobId: viewedJob.jobId,
//         clientName: viewedJob.clientName,
//         clientEmail: viewedJob.clientEmail,
//         jobName: viewedJob.jobName,
//         clientPhoneNumber: viewedJob.clientPhoneNumber,
//         notes: viewedJob.notes,
//         status: viewedJob.status,
//         createdDate: viewedJob.createdDate,
//       }}
//       buttonText="Save"
//     />
//   );
// };
