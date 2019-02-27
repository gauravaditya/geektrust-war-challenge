const expect = require('expect');
const {Army, getDefenseArmyCombination} = require('../simulation/army-simulation');

describe('defenceArmy() Test: ', () => {
    it('should give output as -> Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and wins', () => {
        let shanArmy = new Army(100, 50, 10, 5);
        let attackArmy = new Army(100, 101, 20, 5);
        let res = getDefenseArmyCombination(attackArmy, shanArmy);

        expect(res).toEqual(expect.stringMatching('Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and wins'));

    });

    it('should give output as ->  Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and wins', () => {
        let shanArmy = new Army(100, 50, 10, 5);
        let attackArmy = new Army(150, 96, 26, 8);
        let res = getDefenseArmyCombination(attackArmy, shanArmy);

        expect(res).toEqual(expect.stringMatching('Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and wins'));
    });

    it('should give output as -> Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and loses', () => {
        let shanArmy = new Army(100, 50, 10, 5);
        let attackArmy = new Army(250, 50, 20, 15);
        let res = getDefenseArmyCombination(attackArmy, shanArmy);

        expect(res).toEqual(expect.stringMatching('Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and loses'));
    });
});