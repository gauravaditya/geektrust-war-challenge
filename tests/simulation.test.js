const expect = require('expect');
const {Army} = require('../army/army');
const {utils} = require('../helpers/utils');
const {ArmyUnit} = require('../army/army-unit');

const kingShan = new Army(100, 50, 10, 5, true, 2);

describe('Test Methods for Army Unit Class: ', () => {

    it('should validate user input for army units', () => {
        let testUnit = new ArmyUnit('test', 't', 100);
        let validate = testUnit.isValid(101);

        expect(validate.valid).toBe(false);
    });

    it('should check deployUnit method takes valid input', () => {

        let testUnit = new ArmyUnit('test', 't', 100);

        expect(() => {
            testUnit.deployUnit(200);
        }).toThrow();

        let res = testUnit.deployUnit(50, true);
        expect(res).toBe(true);
    });

    it('should give units + backup units', () => {
        let testUnit = new ArmyUnit('test', 't', 100);

        let res = testUnit.deployUnit(50, true);
        let backup = testUnit.addAsBackup(20);
        expect(res).toBe(true);
        expect(backup).toBe(0);
    });
});

describe('Test methods for Army Class: ', () => {
    it('should test deployArmy method', (done) => {
        
        let testArmy = new Army(100, 100, 100, 100);
        let cb = (obj) => {
            expect(obj).toMatchObject({horses: 50});
            done();
        };

        testArmy.deployArmy(50, 50, 50, 50, cb);
    });

    it('should validated the checkForBackup method', () => {
        
        let testArmy = new Army(100, 100, 100, 100);
        let horses = new ArmyUnit("Horses", "H", 100);
        let elephants = new ArmyUnit("Elephants", "E", 100);
        let armouredTanks = new ArmyUnit("Armoured Tanks", "AT", 100);
        let slingGuns = new ArmyUnit("Sling Guns", "SG", 100);
        testArmy.horses.deployUnit(20);
        testArmy.armouredTanks.deployUnit(20);
        testArmy.elephants.deployUnit(20);
        
        testArmy.armouredTanks.backupUnits = 20;
        testArmy.checkForBackup(testArmy.armouredTanks, testArmy.horses, testArmy.elephants);

        expect(testArmy.armouredTanks.backupUnits).toBe(0);
    });

    it('should validate deployDefense method returns defense', () => {
        
        let testArmy = new Army(100, 100, 100, 100);
        let obj = testArmy.deployDefense(50, 50, 50, 50);

        expect(obj).toEqual(expect.objectContaining({
            horses: expect.objectContaining({
                totalUnits: expect.any(Number),
            }),
            elephants: expect.objectContaining({
                totalUnits: expect.any(Number),
            }),
            armouredTanks: expect.objectContaining({
                totalUnits: expect.any(Number),
            }),
            slingGuns: expect.objectContaining({
                totalUnits: expect.any(Number),
            }), 
            
          }));
    });
});

describe('Winning Criteria Defense Tests: ', () => {
    it('should give output as -> Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and wins', () => {
        let defenseArmy = kingShan.deployDefense(100, 101, 20, 5);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and Wins'));

    });

    it('should give output as -> Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and Wins', () => {
        let defenseArmy = kingShan.deployDefense(150, 96, 26, 8);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and Wins'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 38 E, 2 AT, 1 SG and Wins', () => {
        let defenseArmy = kingShan.deployDefense(250, 50, 3, 1);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 38 E, 2 AT, 1 SG and Wins'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 38 E, 7 AT, 5 SG and Wins', () => {
        let defenseArmy = kingShan.deployDefense(250, 50, 13, 10);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 38 E, 7 AT, 5 SG and Wins'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 38 E, 5 AT, 5 SG and Wins', () => {
        let defenseArmy = kingShan.deployDefense(250, 50, 10, 10);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 38 E, 5 AT, 5 SG and Wins'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 11 E, 0 AT, 0 SG and Wins', () => {
        let defenseArmy = kingShan.deployDefense(204, 20, 0, 0);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 11 E, 0 AT, 0 SG and Wins'));
    });
});

describe('Losing Criteria Defense Tests: ', () => {
    it('should give output as -> Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and Loses', () => {
        let defenseArmy = kingShan.deployDefense(250, 50, 20, 15);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and Loses'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses', () => {
        let defenseArmy = kingShan.deployDefense(250, 80, 30, 15);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses'));
    });

    it('should give output as -> Lengaburu deploys 25 H, 25 E, 10 AT, 5 SG and Loses', () => {
        let defenseArmy = kingShan.deployDefense(50, 50, 20, 19);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 25 H, 25 E, 10 AT, 5 SG and Loses'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses', () => {
        let defenseArmy = kingShan.deployDefense(201, 101, 22, 10);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses', () => {
        let defenseArmy = kingShan.deployDefense(201, 100, 20, 10);
        let res = utils.getWarOutcome(defenseArmy);

        expect(res.trim()).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 50 E, 10 AT, 5 SG and Loses'));
    });

});