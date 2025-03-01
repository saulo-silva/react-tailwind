import { Routes, Route } from "react-router-dom";
import { StepperExample } from "./pages/stepper-example.jsx";
import { FocusPage } from "./pages/focus-page.jsx";
import ChurchForm from "./pages/church-form.jsx";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home.jsx";
import ProductSelection from './pages/product-selection.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stepper" element={<StepperExample />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/church" element={<ChurchForm />} />
        <Route path="/products" element={<ProductSelection />} />
      </Routes>
    </Layout>
  );
}
