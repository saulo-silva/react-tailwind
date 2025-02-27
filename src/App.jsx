import { Routes, Route } from "react-router-dom";
import { StepperExample } from "./pages/StepperExample.jsx";
import { FocusPage } from "./pages/FocusPage.jsx";
import ChurchForm from "./pages/ChurchForm.jsx";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stepper" element={<StepperExample />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/church" element={<ChurchForm />} />
      </Routes>
    </Layout>
  );
}
