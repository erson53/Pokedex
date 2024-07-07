import React, { useState } from "react";
import calculateDamage from "../utils/battle";

// Battle-Komponente, um Kämpfe zwischen Pokémon zu simulieren
const Battle = ({ pokemonList }) => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  // Funktion, um den Kampf zu starten und zu verwalten
  const handleBattle = () => {
    if (pokemon1 && pokemon2) {
      let log = [];
      let hp1 = pokemon1.hp;
      let hp2 = pokemon2.hp;

      // Kampf-Schleife, die so lange läuft, bis ein Pokémon keine HP mehr hat
      while (hp1 > 0 && hp2 > 0) {
        const damageTo2 = calculateDamage(pokemon1, pokemon2);
        hp2 -= damageTo2;
        log.push(
          `${pokemon1.name} dealt ${damageTo2} damage to ${pokemon2.name}. ${
            pokemon2.name
          } has ${hp2 > 0 ? hp2 : 0} HP left.`
        );

        if (hp2 <= 0) break;

        const damageTo1 = calculateDamage(pokemon2, pokemon1);
        hp1 -= damageTo1;
        log.push(
          `${pokemon2.name} dealt ${damageTo1} damage to ${pokemon1.name}. ${
            pokemon1.name
          } has ${hp1 > 0 ? hp1 : 0} HP left.`
        );
      }

      // Bestimmt den Gewinner und fügt den Log-Eintrag hinzu
      if (hp1 <= 0) {
        log.push(`${pokemon2.name} wins!`);
      } else {
        log.push(`${pokemon1.name} wins!`);
      }

      setBattleLog(log);
    }
  };

  return (
    <div>
      <h2>Battle</h2>
      <div>
        <div>
          <label>Choose Pokémon 1:</label>
        </div>
        <select
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
      </div>
      <div>
        <label>Choose Pokémon 2:</label>
        <select
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
      <button onClick={handleBattle}>Start Battle</button>
      <div>
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Battle;
