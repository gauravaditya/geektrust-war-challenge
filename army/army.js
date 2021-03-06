const { ArmyUnit } = require("./army-unit");
const { utils } = require("../helpers/utils");

class Army {
  constructor(h, e, aT, sG, defend, strength) {
    this.horses = new ArmyUnit("Horses", "H", h);
    this.elephants = new ArmyUnit("Elephants", "E", e);
    this.armouredTanks = new ArmyUnit("Armoured Tanks", "AT", aT);
    this.slingGuns = new ArmyUnit("Sling Guns", "SG", sG);
    this.defend = defend || false;
    this.armyStrength = strength || 1;
  }

  needBackUp() {
    return this.horses.needBackUp || this.elephants.needBackUp || this.armouredTanks.needBackUp || this.slingGuns.needBackUp;
  }

  deployArmy(h, e, aT, sG, fn) {
    try {
      this.horses.deployUnit(h);
      this.elephants.deployUnit(e);
      this.armouredTanks.deployUnit(aT);
      this.slingGuns.deployUnit(sG);
    } catch (e) {
      console.log(e.message);
      return fn(false);
    }

    return fn({
      horses: this.horses.deployedUnits,
      elephants: this.elephants.deployedUnits,
      tanks: this.armouredTanks.deployedUnits,
      guns: this.slingGuns.deployedUnits
    });
  }

  deployDefense(h, e, aT, sG) {
    let reqHorses = utils.toHigherStrength(h, this.armyStrength);
    let reqElephants = utils.toHigherStrength(e, this.armyStrength);
    let reqTanks = utils.toHigherStrength(aT, this.armyStrength);
    let reqGuns = utils.toHigherStrength(sG, this.armyStrength);

    this.horses.deployUnit(reqHorses, this.defend);
    this.elephants.deployUnit(reqElephants, this.defend);
    this.armouredTanks.deployUnit(reqTanks, this.defend);
    this.slingGuns.deployUnit(reqGuns, this.defend);

    this.checkForBackup(this.horses, null, this.elephants);
    this.checkForBackup(this.elephants, this.horses, this.armouredTanks);
    this.checkForBackup(this.armouredTanks, this.elephants, this.slingGuns);
    this.checkForBackup(this.slingGuns, this.armouredTanks, null);

    return this;
  }

  checkForBackup(primaryUnit, leftBackupUnit, rightBackUnit) {
    
    if (leftBackupUnit && primaryUnit.needBackUp) {
      primaryUnit.backupUnits = utils.toHigherStrength(
        leftBackupUnit.addAsBackup(
          utils.toLowerStrength(primaryUnit.backupUnits)
        )
      );
    }

    if (rightBackUnit && primaryUnit.backupUnits > 0) {
      primaryUnit.backupUnits = utils.toLowerStrength(
        rightBackUnit.addAsBackup(
          utils.toHigherStrength(primaryUnit.backupUnits)
        )
      );
    }

    primaryUnit.needBackUp = primaryUnit.backupUnits > 0;
  }

}

module.exports = {
  Army
};
