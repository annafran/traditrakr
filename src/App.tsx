import { FunctionComponent } from "react";
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

const App: FunctionComponent = () => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <RecoilRoot>
                <HeaderBar />
                <Routes>
                    <Route path="/" element={<JobList />} />
                    <Route path="createjob" element={<CreateJob />} />
                    <Route path="jobs/:id" element={<ViewJob />} />
                </Routes>
            </RecoilRoot>
        </MantineProvider>
    );
};

export default App;
