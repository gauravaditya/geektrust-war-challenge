const yargs = require('yargs');

const {Army, getDefenseArmyCombination} = require('./simulation/army-simulation');

const argv = yargs
            .command('attack', 'attack with your army', {
                h: {
                    describe: 'no. of horses to deploy',
                    demand: true,
                    alias: 'horses'
                },
                e: {
                    describe: 'no. of elephants to deploy',
                    demand: true,
                    alias: 'elephants'
                },
                t: {
                    describe: 'no. of tanks to deploy',
                    demand: true,
                    alias: 'tanks'
                },
                g: {
                    describe: 'no. of guns to deploy',
                    demand: true,
                    alias: 'guns'
                }
            })
            .usage('Usage: $0 <command> [options]')
            .example('$0 attack -h 10 -e 15 -t 5 -g 4')
            .demandCommand(1, 'please use command to execute')
            .showHelpOnFail(true, 'Specify --help for available options')
            .help('help')
            .argv;


// Initialize both armies for simulation
let shanArmy = new Army(100, 50, 10, 5);
let falconeArmy = new Army(300, 200, 40, 20);

// Validate attack Army inputt by user
falconeArmy.ValidateArmy(new Army(argv.h, argv.e, argv.t, argv.g), (attackArmy) => {

    // Print Error to console and exit
    if (!attackArmy.isValid) {
        return console.log('Error: ' + attackArmy.error);
    }

    // get defense army combination and output result to console
    let warResult = getDefenseArmyCombination(attackArmy.army, shanArmy);
    console.log(warResult);
});