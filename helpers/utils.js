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
    let horses = defender.horses.backupUnits;
    let elephants = defender.elephants.backupUnits;
    let tanks = defender.armouredTanks.backupUnits;
    let guns = defender.slingGuns.backupUnits;
    let result = 'Wins';
    let outcome = `Lengaburu deploys ${defender.horses.deployedUnits} ${
      defender.horses.shortName
    }, ${defender.elephants.deployedUnits} ${defender.elephants.shortName}, ${
      defender.armouredTanks.deployedUnits
    } ${defender.armouredTanks.shortName}, ${
      defender.slingGuns.deployedUnits
    } ${defender.slingGuns.shortName} and `;

    if (horses + elephants + tanks + guns > 0) {
      result = "Loses";
    }

    return outcome + result;
  }
};
