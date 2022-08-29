import React from "react";
import { RecoilRoot } from "recoil";
import { MantineProvider, Text } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RecoilRoot>
        <Text>Welcome to TradiTrakr</Text>
      </RecoilRoot>
    </MantineProvider>
  );
};

export default App;
