import React, { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import calculateDamage from "../utils/battle";

// BattlePage-Komponente, um die Battle-Logik mit zusätzlichen Effekten zu erweitern
const BattlePage = () => {
  const { pokemonList } = useContext(PokemonContext);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isShaking1, setIsShaking1] = useState(false);
  const [isShaking2, setIsShaking2] = useState(false);
  const [winner, setWinner] = useState(null);

  // Funktion, um den Kampf zu starten und visuelle Effekte hinzuzufügen
  const handleBattle = () => {
    if (pokemon1 && pokemon2) {
      let log = [];
      let hp1 = pokemon1.hp;
      let hp2 = pokemon2.hp;
      let turn = 0;
      setWinner(null);

      // Funktion, um jeden Schritt des Kampfes zu verarbeiten
      const battleStep = () => {
        if (hp1 <= 0 || hp2 <= 0) {
          if (hp1 <= 0) {
            log.push(`${pokemon2.name} wins!`);
            setWinner(pokemon2);
          } else {
            log.push(`${pokemon1.name} wins!`);
            setWinner(pokemon1);
          }
          setBattleLog([...log]);
          return;
        }

        if (turn % 2 === 0) {
          const damageTo2 = calculateDamage(pokemon1, pokemon2);
          hp2 -= damageTo2;
          log.push(
            `${pokemon1.name} dealt ${damageTo2} damage to ${pokemon2.name}. ${
              pokemon2.name
            } has ${hp2 > 0 ? hp2 : 0} HP left.`
          );
          setBattleLog([...log]);
          setIsShaking2(true);
          setTimeout(() => {
            setIsShaking2(false);
            turn++;
            battleStep();
          }, 3000);
        } else {
          const damageTo1 = calculateDamage(pokemon2, pokemon1);
          hp1 -= damageTo1;
          log.push(
            `${pokemon2.name} dealt ${damageTo1} damage to ${pokemon1.name}. ${
              pokemon1.name
            } has ${hp1 > 0 ? hp1 : 0} HP left.`
          );
          setBattleLog([...log]);
          setIsShaking1(true);
          setTimeout(() => {
            setIsShaking1(false);
            turn++;
            battleStep();
          }, 3000);
        }
      };

      battleStep();
    }
  };

  // Funktion, um den Kampf zurückzusetzen
  const handleRestart = () => {
    setPokemon1(null);
    setPokemon2(null);
    setBattleLog([]);
    setIsShaking1(false);
    setIsShaking2(false);
    setWinner(null);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Battle</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "grid", paddingInline: "10px" }}>
          <div>
            <label>Choose Pokémon 1:</label>
          </div>
          <select
            style={{ marginBottom: "10px" }}
            className="button"
            onChange={(e) =>
              setPokemon1(
                pokemonList.find((p) => p.id === parseInt(e.target.value))
              )
            }
          >
            <option value="">Select...</option>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
          {pokemon1 && (
            <div style={{ marginBottom: "20px" }}>
              <img
                src={pokemon1.imageUrl}
                alt={pokemon1.name}
                className={isShaking1 ? "shaking" : ""}
              />
            </div>
          )}
        </div>
        <h2>vs</h2>
        <div style={{ display: "grid", paddingInline: "10px" }}>
          <div>
            <label>Choose Pokémon 2:</label>
          </div>
          <div>
            <select
              className="button"
              style={{ marginBottom: "10px" }}
              onChange={(e) =>
                setPokemon2(
                  pokemonList.find((p) => p.id === parseInt(e.target.value))
                )
              }
            >
              <option value="">Select...</option>
              {pokemonList.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
          {pokemon2 && (
            <div style={{ marginBottom: "20px" }}>
              <img
                src={pokemon2.imageUrl}
                alt={pokemon2.name}
                className={isShaking2 ? "shaking" : ""}
              />
            </div>
          )}
        </div>
      </div>
      <button style={{marginInline: "25px", width: "8rem"}} className="button" onClick={handleBattle}>
        Start
      </button>
      <button style={{marginInline: "25px", width: "8rem"}} className="button" onClick={handleRestart}>
        Restart
      </button>
      <div>
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
      {winner && (
        <div className="winner-section">
          <h3>{winner.name} wins!</h3>
          <img
            src={winner.imageUrl}
            alt={winner.name}
            className="winner-image"
          />
        </div>
      )}
    </div>
  );
};

export default BattlePage;
