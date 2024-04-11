"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const atoms_1 = require("../../state/atoms");
const recoil_1 = require("recoil");
const react_1 = require("react");
const core_1 = require("@mantine/core");
const JobFilters_1 = require("./JobFilters");
const JobItem_1 = require("./JobItem");
const JobSort_1 = require("./JobSort");
const core_2 = require("@mantine/core");
const JobList = ({ setActive }) => {
    const [jobList, setJobList] = (0, recoil_1.useRecoilState)(atoms_1.jobListState);
    const filteredJobList = (0, recoil_1.useRecoilValue)(atoms_1.filteredJobListState);
    (0, react_1.useEffect)(() => {
        setActive("/");
    }, [setActive]);
    const deleteJob = (id) => {
        setJobList([
            ...jobList.filter((job) => {
                return job.jobId !== id;
            }),
        ]);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, Object.assign({ mt: "2rem" }, { children: [(0, jsx_runtime_1.jsxs)(core_2.Group, Object.assign({ mb: "2rem", position: "right" }, { children: [(0, jsx_runtime_1.jsx)(JobSort_1.JobSort, {}), (0, jsx_runtime_1.jsx)(JobFilters_1.JobFilters, {})] })), filteredJobList.length === 0 && (0, jsx_runtime_1.jsx)(core_2.Text, { children: "No jobs" }), filteredJobList.map((jobItem) => ((0, jsx_runtime_1.jsx)(JobItem_1.JobItem, { item: jobItem, onDeleteJob: deleteJob }, jobItem.jobId)))] })));
};
exports.JobList = JobList;
