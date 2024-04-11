"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@mantine/core");
const hooks_1 = require("@mantine/hooks");
const tabler_icons_react_1 = require("tabler-icons-react");
const form_1 = require("@mantine/form");
const useStyles = (0, core_1.createStyles)(() => ({
    input: {
        paddingBottom: "1rem;",
    },
}));
const JobForm = ({ job, onJobSubmit, }) => {
    const { classes } = useStyles();
    const form = (0, form_1.useForm)({
        initialValues: job,
        validate: {
            clientEmail: (value) => /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });
    const fields = form.values.notes.map((item, index) => ((0, jsx_runtime_1.jsxs)(core_1.Group, Object.assign({ mt: "xs" }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ placeholder: "Notes", label: "Notes", sx: { flex: 1 } }, form.getListInputProps("notes", index, "note"))), (0, jsx_runtime_1.jsx)(core_1.ActionIcon, Object.assign({ color: "red", variant: "hover", onClick: () => form.removeListItem("notes", index) }, { children: (0, jsx_runtime_1.jsx)(tabler_icons_react_1.Trash, { size: 23 }) }))] }), item.key)));
    return ((0, jsx_runtime_1.jsx)(core_1.Container, Object.assign({ mt: "2rem", size: "xs" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: form.onSubmit(onJobSubmit) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "formGrid" }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ required: true, maxLength: 20, label: "Client name" }, form.getInputProps("clientName"), { placeholder: job.clientName || "Client Name", className: classes.input })), (0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ required: true, label: "Job name", maxLength: 25 }, form.getInputProps("jobName"), { placeholder: "Job Name", className: classes.input })), (0, jsx_runtime_1.jsx)(core_1.Select, Object.assign({ label: "Job status", searchable: true, required: true, placeholder: "Select a status", data: [
                                { value: "scheduled", label: "scheduled" },
                                { value: "active", label: "active" },
                                { value: "invoicing", label: "invoicing" },
                                { value: "priced", label: "priced" },
                                { value: "completed", label: "completed" },
                            ] }, form.getInputProps("status"), { className: classes.input })), (0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ required: true, maxLength: 10, label: "Client mobile number" }, form.getInputProps("clientPhoneNumber"), { placeholder: "Client Mobile Number", className: classes.input })), (0, jsx_runtime_1.jsx)(core_1.TextInput, Object.assign({ required: true, label: "Client email" }, form.getInputProps("clientEmail"), { placeholder: "Client email", className: classes.input })), (0, jsx_runtime_1.jsxs)(core_1.Box, Object.assign({ sx: { maxWidth: "100%" } }, { children: [fields, (0, jsx_runtime_1.jsx)(core_1.Group, Object.assign({ position: "left", mt: "md" }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ color: "orange", size: "xs", onClick: () => 
                                        // @ts-ignore
                                        form.addListItem("notes", { note: "", key: (0, hooks_1.randomId)() }) }, { children: "Add note" })) }))] }))] })), (0, jsx_runtime_1.jsx)(core_1.Button, Object.assign({ radius: "xl", size: "md", mt: "1rem", type: "submit", color: "red" }, { children: "Add Job" }))] })) })));
};
exports.JobForm = JobForm;
