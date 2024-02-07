import { ConfigProvider, ThemeConfig } from "antd";
import { Skeleton } from "business/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import OptionStats from "./Pages/OptionStats";

const THEME: ThemeConfig = {
  token: {
    colorPrimary: "#00cc83",
    colorText: "rgb(23, 43, 77)",
  },
};

const App: React.FC = () => {
  return (
    <ConfigProvider theme={THEME}>
      <BrowserRouter>
        <Skeleton>
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/table" Component={OptionStats} />
          </Routes>
        </Skeleton>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
