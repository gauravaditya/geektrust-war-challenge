const yargs = require("yargs");

const argv = yargs
  .command("attack", "attack with your army", {
    h: {
      describe: "no. of horses to deploy",
      demand: false,
      alias: "horses"
    },
    e: {
      describe: "no. of elephants to deploy",
      demand: false,
      alias: "elephants"
    },
    t: {
      describe: "no. of tanks to deploy",
      demand: false,
      alias: "tanks"
    },
    g: {
      describe: "no. of guns to deploy",
      demand: false,
      alias: "guns"
    }
  })
  .command("", "provide path to input file as first argument")
  .usage("Usage: $0 <command> [options]")
  .example("$0 attack -h 10 -e 15 -t 5 -g 4")
  .example("$0 input.txt")
  .demandCommand(1, "please use command to execute")
  .showHelpOnFail(true, "Specify --help for available options")
  .help("help").argv;

  module.exports = {argv};
