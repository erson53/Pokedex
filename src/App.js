import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import BattlePage from "./components/BattlePage";
import { PokemonProvider } from "./context/PokemonContext";
import "./App.css";
import img from "./assets/pokemon.jpg";

// Haupt-App-Komponente, die den Router und das Layout definiert
function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link className="test" to="/">
                  Pokedex
                </Link>
              </li>
              <li>
                <Link className="test" to="/battle">
                  Battle
                </Link>
              </li>
              <li style={{ float: "right" }}>
                <Link className="test" to="/">
                  <img style={{ height: "2rem" }} src={img} />
                </Link>
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
