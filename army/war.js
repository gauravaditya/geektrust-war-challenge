class War {
    constructor(attacker, defender) {
        this.attacker = attacker instanceof Army ? attacker : new Army(300, 200, 40, 20);
        this.defender = defender instanceof Army ? defender : new Army(100, 50, 10, 5, true, 2);
    }

    warOutcome() {
        
    }
}