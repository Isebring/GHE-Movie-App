import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSlide from './components/hero-slide/HeroSlide';

function App() {
  return (
        <>
          <Header />
          <Outlet/>
          <HeroSlide />
          <Footer />
        </>
  )}
   
  


export default App;