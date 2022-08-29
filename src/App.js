import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import JobsPage from "./components/JobsPage";
import HeaderBar from "./components/HeaderBar";
import Job from "./components/Job";
import JobForm from "./components/JobForm";
import Home from "./components/Home";

const links = [
  { link: "/", label: "Home" },
  { link: "/jobs", label: "Jobs" },
  { link: "/createjob", label: "Create a job" },
];

const App = () => {
  const [active, setActive] = useState(links[0].link);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RecoilRoot>
        <HeaderBar active={active} setActive={setActive} />
        <Routes>
          <Route
            path="/"
            element={<Home active={active} setActive={setActive} />}
          />
          <Route
            path="jobs"
            element={<JobsPage active={active} setActive={setActive} />}
          />
          <Route
            path="createjob"
            element={<JobForm active={active} setActive={setActive} />}
          />
          <Route path="jobs/:id" element={<Job />} />
        </Routes>
      </RecoilRoot>
    </MantineProvider>
  );
};

export default App;
