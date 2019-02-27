let Army = function (h, e, aT, sG) {
    this.horses = h || 0;
    this.elephants = e || 0;
    this.armouredTanks = aT || 0;
    this.slingGuns = sG || 0;
}

Army.prototype.getArmy = function() {
    return this.horses + ' H, ' +
           this.elephants + ' E, ' +
           this.armouredTanks + ' AT, ' +
           this.slingGuns + ' SG ';
}

// Function to validate the input provided by the user
Army.prototype.ValidateArmy = function(army, fn) {
    let res = {
        isValid: false,
        error: null,
        army: null
    };

    // console.log(army.horses);
    if (army.horses >= this.horses) {
        res.error = `You only have ${this.horses} horses to attack!`;
        return fn(res);
    }

    if (army.elephants >= this.elephants) {
        res.error = `You only have ${this.elephants} elephants to attack!`;
        return fn(res);
    }

    if (army.armouredTanks >= this.armouredTanks) {
        res.error = `You only have ${this.armouredTanks} armoured tanks to attack!`;
        return fn(res);
    }

    if (army.slingGuns >= this.slingGuns) {
        res.error = `You only have ${this.slingGuns} sling guns to attack!`;
        return fn(res);
    }

    res.isValid = true;
    res.error = null;
    res.army = army;

    return fn(res);
}

let getDefenseArmyCombination = function(attackArmyObj, defenseArmyObj) {
   
    let attackArmyArr = Object.keys(attackArmyObj).map((key) => {
        return attackArmyObj[key]
    });

    let defenseArmyArr = Object.keys(defenseArmyObj).map((key) => {
        return defenseArmyObj[key];
    });

    let newDefenseArmyArr = [0, 0, 0, 0];
    if ( attackArmyArr.length === defenseArmyArr.length ) {
        let spareUnits = [0, 0, 0, 0];
        let reinforcementReq = [0, 0, 0, 0];

        for( let i = 0; i < attackArmyArr.length; i++ ) {
            let attackUnits = Math.ceil(attackArmyArr[i]/2);
            let defenseUnits = defenseArmyArr[i];

            if ( attackUnits < defenseUnits ) {                
                spareUnits[i] =  defenseUnits - attackUnits;
                newDefenseArmyArr[i] = defenseUnits - spareUnits[i];
            } else if (attackUnits >= defenseUnits) {
                newDefenseArmyArr[i] =  defenseUnits;
                spareUnits[i] = 0;
                reinforcementReq[i] = attackUnits - defenseUnits;
            }
        }

        for (var i = 0; i < attackArmyArr.length; i++) {
            switch (i) {
                case 0: 
                    if (reinforcementReq[i] > 0 && spareUnits[i+1] > 0) {
                        newDefenseArmyArr[i+1] = ((reinforcementReq[i]/2) < spareUnits[i+1]) ? Math.ceil(newDefenseArmyArr[i+1] + (reinforcementReq[i]/2)) : defenseArmyArr[i+1];
                        spareUnits[i+1] = defenseArmyArr[i+1] - newDefenseArmyArr[i+1]; 
                    }
                    break;
                case 1:
                case 2: 
                    if (reinforcementReq[i] > 0 && spareUnits[i-1] > 0) {
                        if((reinforcementReq[i]*2) < spareUnits[i-1]) {
                            newDefenseArmyArr[i-1] = (newDefenseArmyArr[i-1] + (reinforcementReq[i]*2));
                            reinforcementReq[i] = 0;
                        } else {
                            newDefenseArmyArr[i-1] = defenseArmyArr[i-1];
                            reinforcementReq[i] = (reinforcementReq[i]*2 - spareUnits[i-1])/2;
                        }
                        spareUnits[i-1] = defenseArmyArr[i-1] - newDefenseArmyArr[i-1];
                    } 
                    
                    if (reinforcementReq[i] > 0 && spareUnits[i+1] > 0) {
                        if ((reinforcementReq[i]/2) < spareUnits[i+1]) {
                            newDefenseArmyArr[i+1] = Math.ceil(newDefenseArmyArr[i+1] + (reinforcementReq[i]/2));
                            reinforcementReq[i] = 0;
                        } else {
                            newDefenseArmyArr[i+1] = defenseArmyArr[i+1];
                            reinforcementReq[i] = (reinforcementReq[i]/2 - spareUnits[i+1]);
                        }
                        
                        spareUnits[i+1] = defenseArmyArr[i+1] - newDefenseArmyArr[i+1];
                    } 
                    break;
                case 3: 
                    if (reinforcementReq[i] > 0 && spareUnits[i-1] > 0) {
                        newDefenseArmyArr[i-1] = ((reinforcementReq[i]*2) < spareUnits[i-1]) ? (newDefenseArmyArr[i-1] + (reinforcementReq[i]*2)) : defenseArmyArr[i-1];
                        spareUnits[i-1] = defenseArmyArr[i-1] - newDefenseArmyArr[i-1];
                    } 
                    break;
            }
        }
    }
        
    let result = {
        army: new Army(newDefenseArmyArr[0], newDefenseArmyArr[1], newDefenseArmyArr[2], newDefenseArmyArr[3]),
        warOutcome: (newDefenseArmyArr.reduce(sumArray) * 2) >=  attackArmyArr.reduce(sumArray) ? 'wins' : 'loses'
    };

    return 'Lengaburu deploys ' + result.army.getArmy() + 'and ' + result.warOutcome;
}

let sumArray = (sum, currentValue) => {
    return sum + currentValue;
};


module.exports = {
    Army,
    getDefenseArmyCombination
}