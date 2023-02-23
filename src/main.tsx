import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Catalog from './pages/Catalog';
import Details from './pages/Details';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/:category/search/:keyword" element={<Catalog />} />
    <Route path="/:category/:id" element={<Details />} />
    <Route path="/:category" element={<Catalog />} />
    <Route path="/" element={<Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
  
)
