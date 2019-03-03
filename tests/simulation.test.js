const expect = require('expect');
const {Army} = require('../army/army');
const {utils} = require('../helpers/utils');

const kingShan = new Army(100, 50, 10, 5, true, 2);

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