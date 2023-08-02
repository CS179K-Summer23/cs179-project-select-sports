//modified based on chatgpt generated example code
//import the file system module for file read
const fs = require('fs');
//input readline to get user input
const readline = require('readline');

function getFighterByName(name) {
  try {
    const jsonData = JSON.parse(fs.readFileSync('MMA_Stats/ufc_fighters.json'));
    const filteredArray = jsonData.filter((fighter) => fighter.name.includes(name));
    return filteredArray.length > 0 ? filteredArray : null;
  } catch (error) {
    console.error('Error openning file: ', error);
    return null;
  }
}

function getFighterByWeight(weight) {
  try {
    const jsonData = JSON.parse(fs.readFileSync('MMA_Stats/ufc_fighters.json'));
    const filteredArray = jsonData.filter((fighter) => fighter.weight.includes(weight));
    return filteredArray.length > 0 ? filteredArray : null;
  } catch (error) {
    console.error('Error openning file: ', error);
    return null;
  }
}

//create an interface for data reading
const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

line.question('Type 1 to search fighter by name, or 2 to search fighter by weight class: ', (choice) => {
    if (choice == 1){
        line.question('Please provide a name to search: ', (name) => {
            line.close();
            if (!name) {
                console.log('Invalid input');
            } else {
                const output = getFighterByName(name);
                if (output) {
                console.log(`List of fighter(s) with name containing '${name}':`);
                output.forEach((fighter) => {
                    console.log(`Name: ${fighter.name}, Record: ${fighter.record}, Nickname: ${fighter.Nickname}, weight: ${fighter.weight}`);
                });
                //console.log(output);
                } else {
                console.log(`No fighter found has name containing '${name}'.`);
                }
            }
        });
    }else if (choice == 2){
        line.question('Please provide a weight class to search: ', (weight) => {
            line.close();
            if (!weight) {
                console.log('Invalid input');
            } else {
                const output = getFighterByWeight(weight);
                if (output) {
                console.log(`List of fighter(s) fight in the weight class of '${weight}' lbs:`);
                output.forEach((fighter) => {
                    console.log(`Name: ${fighter.name}, Record: ${fighter.record}, Nickname: ${fighter.Nickname}, weight: ${fighter.weight}`);
                });
                //console.log(output);
                } else {
                console.log(`The inputted weight class is not a valid weight class '${weight}'.`);
                }
            }
        });
    }else{
        line.close();
        console.log('invalid input');
    }
});