import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { JobItem } from "./JobItem";
import { Job } from "../../models";

describe("JobItem", () => {
  test("Renders a job with a job name", () => {
    const item: Job = {
      clientEmail: "sample@gmail.com",
      clientName: "Jimmy Brown",
      clientPhoneNumber: "0229796659",
      createdDate: new Date('2022-08-10'),
      jobId: "4f501873-757a-4649-961e-fd835b786b88",
      jobName: "Fix bathroom tap",
      status: "scheduled",
      notes: [
        { note: "Hot tap requires fixing", key: "mantine-4pjczx2t1" },
        { note: "Only available in afternoon", key: "mantine-pmmxjql6l" },
      ],
    };
    render(
      <BrowserRouter>
        <JobItem
          item={item}
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId("jobName")).toHaveTextContent("Fix bathroom tap");
  });
});
