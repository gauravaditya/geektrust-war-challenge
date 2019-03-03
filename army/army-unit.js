class ArmyUnit {
    constructor(unitName, shortName, unitCount) {
        this.unitName = unitName || 'default';
        this.shortName = shortName || '';
        this.totalUnits = unitCount || 0;
        this.spareUnits = 0;
        this.backupUnits = 0;
        this.deployedUnits = 0;
        this.needBackUp = false;
    }

    isValid(count) {
        let output = {
            valid: true,
            error: null
        };
        
        if ( count < 0 || count > this.totalUnits || isNaN(count) ){
            output.valid = false;
            output.error = `Error: Invalid input for ${this.unitName}!`;
        }
        return output; 
    }

    deployUnit(count, defend) {
        let input = this.isValid(count);

        if( !input.valid && !defend) {
            throw new Error(input.error);
        }

        if ( !input.valid ) {
            this.deployedUnits = this.totalUnits;
            this.backupUnits = count - this.totalUnits;
            this.spareUnits = 0;
            this.needBackUp = true;
        } else {
            this.deployedUnits = count;
            this.spareUnits = this.totalUnits - count;
            this.backupUnits = 0;
            this.needBackUp = false;
        }

        return defend ? true : false;
    }

    addAsBackup(units) {
        if (this.spareUnits <= 0) {
            return units;
        }

        if (units <= this.spareUnits) {
            this.deployedUnits = this.deployedUnits + units;
            this.spareUnits = this.spareUnits - units;
            units = 0;
        }

        if (units > this.spareUnits) {
            this.deployedUnits = this.totalUnits;
            units = units - this.spareUnits;
            this.spareUnits = 0;
        }

        return units;

    }

}

module.exports = {
    ArmyUnit
}