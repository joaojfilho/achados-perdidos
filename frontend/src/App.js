import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';
import ItemsPage from './pages/ItemsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/adicionar" element={<AddItemPage />} />
           <Route path="/itens" element={<ItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;