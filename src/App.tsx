import { Outlet } from "react-router-dom";
import "swiper/swiper.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default App;
