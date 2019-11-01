# install project
use `npm install` to install required node packages
Below node modules are used
1. `yargs` - for easy command line input handling
2. `mocha` - as the test framework
3. `expect` - test library

# Testing Application
Application can be tested by executing `npm test` in the console
- Sample test cases cover the scenarios given during the challenge as expected input and output
- Custom input can be given using below methods:
    -**METHOD 1**. By providing input via the input.txt file as per problem statement Ex: `FALICORNIA_ATTACK 100H 101E 20AT 5SG`
    -**METHOD 2**. By executing the **app.js** file using `node app.js` with required command and inputs
        - use `--help` for command help menu and usage instruction in the console  
    -**METHOD 3**. By executing `npm start PATH_TO_INPUT_FILE`, in case input file path is not provided, the default input.txt file is used to execute the app
