import { Outlet } from "react-router-dom";
import "swiper/swiper.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary
        errorInfo={{
          message: "Error in header",
          variant: "small",
        }}
      >
        <Header />
      </ErrorBoundary>
      <ErrorBoundary
        errorInfo={{
          message:
            "It looks like you have encountered a bug that has caused an error. Please try returning to the previous page by clicking the button below.",
          image:
            "https://cdn-icons-png.flaticon.com/512/1034/1034532.png?w=826&t=st=1677700431~exp=1677701031~hmac=a81e4bf668fd026ced8900a35d87ab6acd880d5287b84544de6ea45dc65ee098",
          variant: "main",
        }}
      >
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <ErrorBoundary
        errorInfo={{
          message: "Error in footer",
          variant: "small",
        }}
      >
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default App;
