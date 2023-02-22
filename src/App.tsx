import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import Routing from "./config/Routing";

function App() {
  return (
    <Routes>
      <Route path="*" element={
        <>
          <Header />
          <Routing />
          <Footer />
        </>
      } />
    </Routes>     
  )
}

export default App;