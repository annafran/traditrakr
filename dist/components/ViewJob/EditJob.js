"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditJob = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const atoms_1 = require("../../state/atoms");
const recoil_1 = require("recoil");
const core_1 = require("@mantine/core");
const tabler_icons_react_1 = require("tabler-icons-react");
const form_1 = require("@mantine/form");
const hooks_1 = require("@mantine/hooks");
const replaceJobAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};
const EditJob = ({ specificJob, onFormSubmit = () => { }, }) => {
    const [jobList, setJobList] = (0, recoil_1.useRecoilState)(atoms_1.jobListState);
    const form = (0, form_1.useForm)({
        initialValues: {
            jobId: specificJob.jobId,
            createdDate: specificJob.createdDate,
            clientName: specificJob.clientName,
            clientEmail: specificJob.clientEmail,
            jobName: specificJob.jobName,
            clientPhoneNumber: specificJob.clientPhoneNumber,
            notes: (0, form_1.formList)([...specificJob.notes]),
            status: specificJob.status,
        },
    });
    const fields = form.values.notes.map((item, index) => ((0, jsx_runtime_1.jsxs)(core_1.Group, Object.assign({ mt: "xs" }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ placeholder: "Write your note", label: "Add extra notes", sx: { flex: 1 } }, form.getListInputProps("notes", index, "note"))), (0, jsx_runtime_1.jsx)(core_1.ActionIcon, Object.assign({ color: "red", variant: "hover", onClick: () => form.removeListItem("notes", index) }, { children: (0, jsx_runtime_1.jsx)(tabler_icons_react_1.Trash, { size: 23 }) }))] }), item.key)));
    const handleSubmit = (values, jobItem) => {
        const index = jobList.findIndex((item) => item === jobItem);
        const updatedJobList = replaceJobAtIndex(jobList, index, Object.assign({}, values));
        setJobList(updatedJobList);
        onFormSubmit();
    };
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: form.onSubmit((values) => handleSubmit(values, specificJob)) }, { children: [(0, jsx_runtime_1.jsx)(core_1.Select, Object.assign({ label: "Change job status", placeholder: "Select a status", data: [
                    { value: "scheduled", label: "scheduled" },
                    { value: "active", label: "active" },
                    { value: "invoicing", label: "invoicing" },
                    { value: "priced", label: "priced" },
                    { value: "completed", label: "completed" },
                ] }, form.getInputProps("status"))), (0, jsx_runtime_1.jsxs)(core_1.Box, Object.assign({ sx: { maxWidth: "100%" } }, { children: [fields, (0, jsx_runtime_1.jsx)(core_1.Group, Object.assign({ position: "left", mt: "md" }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "orange", size: "xs", onClick: () => form.addListItem("notes", {
                                note: "",
                                key: (0, hooks_1.randomId)(),
                            }) }, { children: "Add note" })) }))] })), (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ radius: "xl", size: "sm", mt: "1rem", color: "red", type: "submit" }, { children: "Update job" }))] })));
};
exports.EditJob = EditJob;
