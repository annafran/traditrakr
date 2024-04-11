"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_router_dom_1 = require("react-router-dom");
const JobItem_1 = require("./JobItem");
describe("JobItem", () => {
    test("Renders a job with a job name", () => {
        const item = {
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
        (0, react_1.render)((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(JobItem_1.JobItem, { item: item }) }));
        expect(react_1.screen.getByTestId("jobName")).toHaveTextContent("Fix bathroom tap");
    });
});
