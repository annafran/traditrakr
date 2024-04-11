"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const core_1 = require("@mantine/core");
const JobList_1 = require("./components/JobList");
const Common_1 = require("./components/Common");
const CreateJob_1 = require("./components/CreateJob");
const ViewJob_1 = require("./components/ViewJob");
const links = [
    { link: "/", label: "Jobs" },
    { link: "/createjob", label: "Create a job" },
];
const App = () => {
    const [active, setActive] = (0, react_1.useState)(links[0].link);
    return ((0, jsx_runtime_1.jsx)(core_1.MantineProvider, Object.assign({ withGlobalStyles: true, withNormalizeCSS: true }, { children: (0, jsx_runtime_1.jsxs)(recoil_1.RecoilRoot, { children: [(0, jsx_runtime_1.jsx)(Common_1.HeaderBar, { active: active, setActive: setActive }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(JobList_1.JobList, { setActive: setActive }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "createjob", element: (0, jsx_runtime_1.jsx)(CreateJob_1.CreateJob, { setActive: setActive }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "jobs/:id", element: (0, jsx_runtime_1.jsx)(ViewJob_1.ViewJob, {}) })] })] }) })));
};
exports.default = App;
