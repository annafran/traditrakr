import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import { JobList } from "./components/JobList";
import { HeaderBar } from "./components/Common";
import { CreateJob } from "./components/CreateJob";
import { ViewJob } from "./components/ViewJob";

const links = [
  { link: "/", label: "Jobs" },
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
            element={<JobList active={active} setActive={setActive} />}
          />
          <Route
            path="createjob"
            element={<CreateJob active={active} setActive={setActive} />}
          />
          <Route path="jobs/:id" element={<ViewJob />} />
        </Routes>
      </RecoilRoot>
    </MantineProvider>
  );
};

export default App;
