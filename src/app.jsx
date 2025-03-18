import { Routes, Route } from "react-router-dom";
import { StepperExample } from "./pages/stepper-example.jsx";
import { FocusPage } from "./pages/focus-page.jsx";
import ChurchForm from "./pages/church-form.jsx";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home.jsx";
import Contact from "./pages/contact.jsx"; // Import the new Contact page
import ProductSelection from './pages/product-selection.jsx'
import Checkout from './pages/checkout.jsx'
import OrderSuccess from './pages/order-success.jsx'

const Print = () => (
  <div className="mx-auto flex h-[793.7px] w-[1122.5px] items-center justify-center gap-8 p-8">
    <ChurchForm />
    <ChurchForm />
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route
        path="/church"
        element={<Print />}
      />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stepper" element={<StepperExample />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/products" element={<ProductSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
