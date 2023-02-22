import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Details from "../pages/Details";
import Home from "../pages/Home";



function Routing() {
  return (
    <Routes>
    <Route path="/:category/search/:keyword" element={<Catalog />} />
    <Route path="/:category/:id" element={<Details />} />
    <Route path="/:category" element={<Catalog />} />
    <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default Routing;
