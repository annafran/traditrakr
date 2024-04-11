"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFilters = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const recoil_1 = require("recoil");
const atoms_1 = require("../../state/atoms");
const core_1 = require("@mantine/core");
const useStyles = (0, core_1.createStyles)((theme) => ({
    label: {
        fontSize: "0.9rem",
        [theme.fn.smallerThan("xs")]: {
            fontSize: "0.7rem",
        },
    },
    input: {
        [theme.fn.smallerThan("xs")]: {
            width: "8rem",
            fontSize: "0.7rem",
        },
    },
}));
const JobFilters = () => {
    const [{ status, sort }, setFilters] = (0, recoil_1.useRecoilState)(atoms_1.jobListFilterState);
    const { classes } = useStyles();
    return ((0, jsx_runtime_1.jsxs)(core_1.Box, { children: [(0, jsx_runtime_1.jsx)(core_1.Text, Object.assign({ className: classes.label }, { children: "Filter by status:" })), (0, jsx_runtime_1.jsx)(core_1.Select, { classNames: { input: classes.input }, value: status, onChange: (value) => setFilters({ status: value, sort }), data: [
                    { value: "Show All", label: "All jobs" },
                    { value: "Show Uncompleted", label: "Uncompleted jobs" },
                    { value: "Show Completed", label: "Completed jobs" },
                    { value: "Show Invoicing", label: "Invoiced jobs" },
                    { value: "Show Priced", label: "Priced jobs" },
                    { value: "Show Scheduled", label: "Scheduled jobs" },
                    { value: "Show Active", label: "Active jobs" },
                ] })] }));
};
exports.JobFilters = JobFilters;
