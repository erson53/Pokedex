const typeEffectiveness = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    // Fügen Sie weitere Typ-Effektivität hinzu
  };
  
  const calculateDamage = (attacker, defender) => {
    const baseDamage = ((2 * 50 / 5 + 2) * attacker.attack * 50 / defender.defense / 50) + 2;
  
    let typeModifier = 1;
    attacker.type.forEach(attackerType => {
      defender.type.forEach(defenderType => {
        if (typeEffectiveness[attackerType] && typeEffectiveness[attackerType][defenderType]) {
          typeModifier *= typeEffectiveness[attackerType][defenderType];
        }
      });
    });
  
    return baseDamage * typeModifier;
  };
  
  export default calculateDamage;
  