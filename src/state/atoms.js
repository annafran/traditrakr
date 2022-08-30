import { atom, selector } from "recoil";

export const jobListState = atom({
  key: "JobList",
  default: [],
});

export const jobListFilterState = atom({
  key: "JobListFilter",
  default: "Show All",
});

export const filteredJobListState = selector({
  key: "filteredJobList",
  get: ({ get }) => {
    const filter = get(jobListFilterState);
    const jobList = get(jobListState);
    switch (filter) {
      case "Show Completed":
        return jobList.filter((item) => item.status === "completed");
      case "Show Uncompleted":
        return jobList.filter((item) => !item.status !== "completed");
      default:
        return jobList;
    }
  },
});

export const jobListStatsState = selector({
  key: "jobListStats",
  get: ({ get }) => {
    const jobList = get(jobListState);
    const totalNum = jobList.length;
    const totalCompletedNum = jobList.filter(
      (item) => item.status === "completed"
    ).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
