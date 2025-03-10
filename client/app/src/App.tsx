import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './pages/home.tsx';
import  Register  from './pages/register.tsx';
import "./index.css";
import Login from './pages/login.tsx';
import Categories from './pages/categoriesAdd.tsx';
import NewsFeed from './pages/newsDispPage.tsx';
import SingleNews from "./pages/singleNews.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/AddCategories" element={<Categories/>} /> 
        <Route path="/news" element={<NewsFeed/>} /> 
        <Route path="/category/:cat" element={<SingleNews/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
