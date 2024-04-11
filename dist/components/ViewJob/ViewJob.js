"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewJob = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const atoms_1 = require("../../state/atoms");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const ViewJob_1 = require("../ViewJob");
const core_1 = require("@mantine/core");
const formatDate_1 = require("../../utils/formatDate");
const react_1 = require("react");
const useStyles = (0, core_1.createStyles)(() => ({
    tableTitle: {
        fontWeight: "bold",
    },
}));
const ViewJob = () => {
    const [opened, setOpened] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    const specificJob = (0, recoil_1.useRecoilValue)((0, atoms_1.jobIdQuery)(id));
    const { classes } = useStyles();
    if (specificJob === undefined) {
        return null;
    }
    const tableItems = [
        { title: "Job ID", information: specificJob.jobId },
        { title: "Job Name", information: specificJob.jobName },
        { title: "Client Name", information: specificJob.clientName },
        { title: "Client Mobile", information: specificJob.clientPhoneNumber },
        { title: "Client Email", information: specificJob.clientEmail },
        { title: "Created Date", information: (0, formatDate_1.formatDate)(specificJob.createdDate) },
        ...specificJob.notes.map((obj) => {
            return { title: "Notes", information: obj.note };
        }),
    ];
    const rows = tableItems.map((item, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: classes.tableTitle }, { children: item.title })), (0, jsx_runtime_1.jsx)("td", { children: item.information })] }, `${index}-${item.title}`)));
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
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, Object.assign({ mt: "2rem", size: "xs" }, { children: [(0, jsx_runtime_1.jsx)(core_1.Badge, Object.assign({ variant: "filled", color: handleColor(specificJob.status) }, { children: specificJob.status })), (0, jsx_runtime_1.jsxs)(core_1.Table, Object.assign({ mt: "1rem", mb: "1rem" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", {}), (0, jsx_runtime_1.jsx)("th", {})] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: rows })] })), (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "orange", onClick: () => setOpened(true) }, { children: "Edit job" })), (0, jsx_runtime_1.jsx)(core_1.Modal, Object.assign({ opened: opened, onClose: () => setOpened(false), title: `Update job# ${specificJob.jobId}` }, { children: (0, jsx_runtime_1.jsx)(ViewJob_1.EditJob, { specificJob: specificJob, onFormSubmit: () => setOpened(false) }) }))] })));
};
exports.ViewJob = ViewJob;
