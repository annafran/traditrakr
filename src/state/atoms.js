import { atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const jobListState = atom({
  key: "JobList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const jobListFilterState = atom({
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
      return jobList.sort(
        (itema, itemb) => itemb.createdDate - itema.createdDate
      );
    case "Least Recent":
      return jobList.sort(
        (itema, itemb) => itema.createdDate - itemb.createdDate
      );
    default:
      return jobList;
  }
};

export const filteredJobListState = selector({
  key: "filteredJobList",
  get: ({ get }) => {
    const { status, sort } = get(jobListFilterState);
    const jobList = get(jobListState);
    const filterList = filterItems(status, jobList);
    return sortItems(sort, filterList.slice());
  },
});

export const jobIdQuery = selectorFamily({
  key: "JobID",
  get:
    (userId) =>
    ({ get }) => {
      const jobList = get(jobListState);
      const foundJob = jobList.find((obj) => obj.jobId === userId);
      return foundJob;
    },
});
