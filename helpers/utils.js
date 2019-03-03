exports.utils = {
  toHigherStrength: count => {
    return Math.ceil(count / 2);
  },

  toLowerStrength: count => {
    return count * 2;
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
