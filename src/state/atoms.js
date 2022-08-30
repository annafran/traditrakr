import { atom, selector } from "recoil";

export const jobListState = atom({
  key: "JobList",
  default: [],
});

export const jobListFilterState = atom({
  key: "JobListFilter",
  default: { status: "Show All", sort: "Most Recent" },
});

// export const jobListSortState = atom({
//   key: "JobListSort",
//   default: "Most Recent",
// });

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
        (itema, itemb) => itema.createdDate - itemb.createdDate
      );
    case "Least Recent":
      return jobList.sort(
        (itema, itemb) => itemb.createdDate - itema.createdDate
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
    return sortItems(sort, filterList);
  },
});

// export const sortedJobListState = selector({
//   key: "sortedJobList",
//   get: ({ get }) => {
//     // const sort = get(jobListSortState);
//     const jobList = get(filteredJobListState);
//     console.log(jobList);
//     return jobList;
//     // switch (sort) {
//     //   case "Most Recent":
//     //     return jobList.sort(
//     //       (itema, itemb) => itema.createdDate - itemb.createdDate
//     //     );
//     //   case "Least Recent":
//     //     return jobList.sort(
//     //       (itema, itemb) => itemb.createdDate - itema.createdDate
//     //     );
//     //   default:
//     //     return jobList;
//     // }
//   },
// });

// { value: "Show All", label: "All jobs" },
// { value: "Show Uncompleted", label: "Uncompleted jobs" },
// { value: "Show Completed", label: "Completed jobs" },
// { value: "Show Invoicing", label: "Invoiced jobs" },
// { value: "Show Priced", label: "Priced jobs" },
// { value: "Show Scheduled", label: "Scheduled jobs" },
// { value: "Show Active", label: "Active jobs" },

// export const jobListStatsState = selector({
//   key: "jobListStats",
//   get: ({ get }) => {
//     const jobList = get(jobListState);
//     const totalNum = jobList.length;
//     const totalCompletedNum = jobList.filter(
//       (item) => item.status === "completed"
//     ).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted =
//       totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });
