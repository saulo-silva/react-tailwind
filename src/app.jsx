import { Routes, Route } from "react-router-dom";
import ChurchForm from "./pages/church-form.jsx";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home.jsx";
import Contact from "./pages/contact.jsx";
import ProductSelection from './pages/product-selection.jsx';
import Cart from './pages/cart/index.jsx';
import Checkout from './pages/checkout.jsx';
import OrderSuccess from './pages/order-success.jsx';

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
        <Route path="/products" element={<ProductSelection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
