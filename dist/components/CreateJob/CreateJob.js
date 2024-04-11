"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJob = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const uuid_1 = require("uuid");
const recoil_1 = require("recoil");
const form_1 = require("@mantine/form");
const atoms_1 = require("../../state/atoms");
const react_router_dom_1 = require("react-router-dom");
const JobForm_1 = require("./JobForm");
const react_1 = require("react");
const hooks_1 = require("@mantine/hooks");
const CreateJob = ({ setActive }) => {
    (0, react_1.useEffect)(() => {
        setActive("/createjob");
    }, [setActive]);
    const [jobList, setJobList] = (0, recoil_1.useRecoilState)(atoms_1.jobListState);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (values) => {
        setJobList([...jobList, values]);
        navigate("/");
    };
    return ((0, jsx_runtime_1.jsx)(JobForm_1.JobForm, { onJobSubmit: handleSubmit, job: {
            jobId: (0, uuid_1.v4)(),
            createdDate: new Date(),
            clientName: "",
            clientEmail: "",
            jobName: "",
            clientPhoneNumber: "",
            notes: (0, form_1.formList)([{ note: "", key: (0, hooks_1.randomId)() }]),
            status: "",
        } }));
};
exports.CreateJob = CreateJob;
