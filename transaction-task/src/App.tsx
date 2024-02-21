import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import BaseLayout from "./layout/baseLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
