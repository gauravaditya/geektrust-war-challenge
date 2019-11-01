const fs = require('fs');
const path = require('path');
const { argv } = require("./input");


const relativeFilePath = "../input.txt";
let fileToRead = path.join(__dirname, relativeFilePath);
if (argv) {
    fileToRead = argv._[0].match(/.txt$/) ? argv._[0] : fileToRead
}

const inputText = fs.readFileSync(fileToRead).toString();
const fileInput = {};
fileInput.command = inputText.split(" ")[0];
fileInput.horses = inputText.match(/[0-9]+H/)[0].replace("H", "");
fileInput.elephants = inputText.match(/[0-9]+E/)[0].replace("E", "");
fileInput.tanks = inputText.match(/[0-9]+AT/)[0].replace("AT", "");
fileInput.guns = inputText.match(/[0-9]+SG/)[0].replace("SG", "");

module.exports = {
    fileInput
}