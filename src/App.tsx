import { BrowserRouter, Route, Routes } from "react-router";
import ValuatorPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ValuatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
