import inquirer from "inquirer";
import chalk from "chalk";

const randomNumber: number = Math.floor(Math.random()*100)+1
let remainingChances=6;
// console.log(randomNumber);
function validNumber(input:string): boolean| string{

    const number= parseFloat(input);
    if (isNaN(number)){
        return"Please enter a valid number.";
    }
    if (number<0|| number>100){
        return "Please guess a number between 1 and 100.";
    }
    return true;
}
async function askForGuess() {
    inquirer.prompt([{
        type: 'input',
        name: 'guess',
        message: "Please guess a number between 1 and 100:",
        validate: validNumber,
    }])
    .then ((answer: any)=>{
        const guessedNumber = parseInt(answer.guess)
        if(guessedNumber === randomNumber){
        console.log(chalk.bgBlue.bgMagentaBright
            (`Congratulations! You guessed the number ${randomNumber} correctly.`)
        );
        process.exit(0);
    }else if (guessedNumber < randomNumber){
        remainingChances--;
        console.log(chalk.bgBlue.bgRedBright
            (`Guess again, your guessed number is less than actual number.
        Now your remaining chances are:${remainingChances}`));   

    if(remainingChances == 0){
        console.log(chalk.bgMagentaBright.bgYellowBright
            (`Sorry! You have no more chance.
        Correct number is ${randomNumber}`)
        );
        process.exit(0);
    } else{
        askForGuess();
    }}
    else if (guessedNumber > randomNumber){
        remainingChances--;
        console.log(chalk.bgBlue.bgRedBright
            (`Guess again, your guessed number is greater than actual number.
        Now your remaining chances are:${remainingChances}`)
        ); 

    if(remainingChances == 0){
        console.log(chalk.bgMagentaBright.bgYellowBright(`Sorry! You have no more chance.
     Correct number is ${randomNumber}`));
     process.exit(0);
    }else{
        askForGuess();

    }} 
    })
}
askForGuess();