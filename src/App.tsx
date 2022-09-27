import React, { FunctionComponent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import { JobList } from "./components/JobList";
import { HeaderBar } from "./components/Common";
import { CreateJob } from "./components/CreateJob";
import { ViewJob } from "./components/ViewJob";

interface Link {
  link: string;
  label: string;
}

const links: Link[] = [
  { link: "/", label: "Jobs" },
  { link: "/createjob", label: "Create a job" },
];

const App: FunctionComponent = () => {
  const [active, setActive] = useState<string>(links[0].link);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RecoilRoot>
        <HeaderBar active={active} setActive={setActive} />
        <Routes>
          <Route path="/" element={<JobList setActive={setActive} />} />
          <Route
            path="createjob"
            element={<CreateJob setActive={setActive} />}
          />
          <Route path="jobs/:id" element={<ViewJob />} />
        </Routes>
      </RecoilRoot>
    </MantineProvider>
  );
};

export default App;
