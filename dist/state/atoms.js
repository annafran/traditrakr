"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobIdQuery = exports.filteredJobListState = exports.jobListFilterState = exports.jobListState = void 0;
const recoil_1 = require("recoil");
const recoil_persist_1 = require("recoil-persist");
const { persistAtom } = (0, recoil_persist_1.recoilPersist)({
    key: "recoil-persist",
    storage: localStorage,
});
exports.jobListState = (0, recoil_1.atom)({
    key: "JobList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
exports.jobListFilterState = (0, recoil_1.atom)({
    key: "JobListFilter",
    default: { status: "Show All", sort: "Most Recent" },
});
const filterItems = (filter, jobList) => {
    switch (filter) {
        case "Show Completed":
            return jobList.filter((item) => item.status === "completed");
        case "Show Uncompleted":
            return jobList.filter((item) => item.status !== "completed");
        case "Show Invoicing":
            return jobList.filter((item) => item.status === "invoicing");
        case "Show Priced":
            return jobList.filter((item) => item.status === "priced");
        case "Show Scheduled":
            return jobList.filter((item) => item.status === "scheduled");
        case "Show Active":
            return jobList.filter((item) => item.status === "active");
        default:
            return jobList;
    }
};
const sortItems = (sort, jobList) => {
    switch (sort) {
        case "Most Recent":
            return jobList.sort((itema, itemb) => itemb.createdDate.getTime() - itema.createdDate.getTime());
        case "Least Recent":
            return jobList.sort((itema, itemb) => itema.createdDate.getTime() - itemb.createdDate.getTime());
        default:
            return jobList;
    }
};
exports.filteredJobListState = (0, recoil_1.selector)({
    key: "filteredJobList",
    get: ({ get }) => {
        const { status, sort } = get(exports.jobListFilterState);
        const jobList = get(exports.jobListState);
        const filterList = filterItems(status, jobList);
        return sortItems(sort, filterList.slice());
    },
});
exports.jobIdQuery = (0, recoil_1.selectorFamily)({
    key: "JobID",
    get: (userId) => ({ get }) => {
        const jobList = get(exports.jobListState);
        const foundJob = jobList.find((obj) => obj.jobId === userId);
        return foundJob;
    },
});
