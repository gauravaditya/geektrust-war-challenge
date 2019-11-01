exports.utils = {
  toHigherStrength: (count, strength) => {
    strength = strength || 2;
    return Math.ceil(count / strength);
  },

  toLowerStrength: (count, strength) => {
    strength = strength || 2;
    return count * strength;
  },

  getWarOutcome: (defender) => {
    let result = 'LENGABURU_WINS_FALICORNIA';
    let outcome = `${defender.horses.deployedUnits}${defender.horses.shortName} ${defender.elephants.deployedUnits}${defender.elephants.shortName} ${defender.armouredTanks.deployedUnits}${defender.armouredTanks.shortName} ${defender.slingGuns.deployedUnits}${defender.slingGuns.shortName}`;

    if (defender.needBackUp()) {
      result = "LENGABURU_LOSES_FALICORNIA";
    }

    return result + " " + outcome;
  }
};
