"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@mantine/core");
const react_router_dom_1 = require("react-router-dom");
const useStyles = (0, core_1.createStyles)((theme) => ({
    clientName: {
        width: "7rem",
        fontWeight: "bold",
        padding: "5px",
        fontSize: "0.9rem",
        [theme.fn.smallerThan("xs")]: {
            fontSize: "0.7rem",
            width: "4rem",
        },
    },
    jobName: {
        padding: "5px",
        fontSize: "0.9rem",
        [theme.fn.smallerThan("xs")]: {
            fontSize: "0.7rem",
        },
    },
}));
const handleColor = (status) => {
    let color;
    switch (status) {
        case "completed":
            color = "red";
            break;
        case "scheduled":
            color = "gray";
            break;
        case "invoicing":
            color = "blue";
            break;
        case "priced":
            color = "yellow";
            break;
        case "active":
            color = "green";
            break;
        default:
            color = "gray";
    }
    return color;
};
const JobItem = ({ item, onDeleteJob = () => { }, }) => {
    const { classes } = useStyles();
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(core_1.Group, Object.assign({ noWrap: true }, { children: [(0, jsx_runtime_1.jsx)(core_1.Box, Object.assign({ className: classes.clientName }, { children: item.clientName })), (0, jsx_runtime_1.jsx)(core_1.Box, Object.assign({ "data-testid": "jobName", className: classes.jobName }, { children: item.jobName })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ smallerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Badge, Object.assign({ size: "md", variant: "filled", color: handleColor(item.status) }, { children: item.status })) })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ largerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Badge, Object.assign({ size: "xs", variant: "filled", color: handleColor(item.status) }, { children: item.status })) })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ smallerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "orange", size: "xs", onClick: () => navigate(`/jobs/${item.jobId}`) }, { children: "View" })) })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ largerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "orange", p: 5, onClick: () => navigate(`/jobs/${item.jobId}`) }, { children: "View" })) })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ smallerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "red", size: "xs", onClick: () => onDeleteJob(item.jobId) }, { children: "Delete" })) })), (0, jsx_runtime_1.jsx)(core_1.MediaQuery, Object.assign({ largerThan: "xs", styles: { display: "none" } }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "red", p: 5, onClick: () => onDeleteJob(item.jobId) }, { children: "Delete" })) }))] })), (0, jsx_runtime_1.jsx)(core_1.Divider, { my: "sm" })] }));
};
exports.JobItem = JobItem;
