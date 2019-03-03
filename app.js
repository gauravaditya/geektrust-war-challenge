const { Army } = require("./army/army");
const { argv } = require("./helpers/input");
const { utils } = require('./helpers/utils');

// Initialize both armies for simulation
let kingShan = new Army(100, 50, 10, 5, true, 2);
let QueenFalcone = new Army(300, 200, 40, 20);

// Validate attack Army input by user
QueenFalcone.deployArmy(argv.h, argv.e, argv.t, argv.g, (deployAttack) => {
  // Print Error to console and exit
  if (deployAttack) {
    let deployedDefense = kingShan.deployDefense(
      deployAttack.horses,
      deployAttack.elephants,
      deployAttack.tanks,
      deployAttack.guns
    );

    //Print war output to the console
    console.log(utils.getWarOutcome(deployedDefense));
  }

});


