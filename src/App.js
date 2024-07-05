import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import BattlePage from './components/BattlePage';
import { PokemonProvider } from './context/PokemonContext';
import './App.css';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Pokedex</Link>
              </li>
              <li>
                <Link to="/battle">Battle</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/battle" element={<BattlePage />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  );
}

export default App;
