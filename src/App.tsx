import { ConfigProvider, ThemeConfig } from "antd";
import { Skeleton } from "entities/components";
import { Dashboard, OptionStats } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const THEME: ThemeConfig = {
  token: {
    colorPrimary: "#00cc83",
    colorText: "rgb(23, 43, 77)",
  },
};

const App: React.FC = () => {
  return (
    <ConfigProvider theme={THEME}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
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
