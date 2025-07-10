import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";



function App() {
  const client = new QueryClient()


  return (
    <QueryClientProvider client={client}>
      <ProductProvider>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </QueryClientProvider>
  );

}

export default App
