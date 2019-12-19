let resultEl = document.querySelector('#result');
let lengthEl = document.querySelector('#length');
let uppercaseEl = document.querySelector('#uppercase');
let lowercaseEl = document.querySelector('#lowercase');
let numbersEl = document.querySelector('#numbers');
let symbolsEl = document.querySelector('#symbols');
let generateEl = document.querySelector('#generate');

let randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    symbol: getRandomSymbol,
    number: getRandomNumber
};

generateEl.addEventListener('click', () => {
    let length = +lengthEl.value;
    let hasLower = lowercaseEl.checked;
    let hasUpper = uppercaseEl.checked;
    let hasSymbol = symbolsEl.checked;
    let hasNumber = numbersEl.checked;

    resultEl.innerText = generatePassword (hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword(upper, lower, symbol, number, length) {
    let generatedPassword = new Array(length);
    for (i = 0; i < generatedPassword.length; i++){
        generatedPassword[i] = 'undefined';
    }
    let typesCount = upper + lower + number + symbol;
    let typesArray = [{upper}, {lower}, {number}, {symbol}];
    let filteredArray = typesArray.filter(item => Object.values(item)[0]);

    // console.log(generatedPassword);
    // console.log(typesArray);
    // console.log(filteredArray);

    if (typesCount === 0) {
        return '';
    }
    
        for (let i = 0; i < filteredArray.length; i++){
        let funcName = Object.keys(filteredArray[i]);
        // console.log(funcName);
        let randomIndex = Math.floor(Math.random() * generatedPassword.length);
        // console.log(randomIndex);
        if (generatedPassword[randomIndex] === 'undefined') {
            generatedPassword[randomIndex] = randomFunc[funcName]();
        }
        else if (generatedPassword[randomIndex] !== 'undefined') {
            randomIndex = Math.floor(Math.random() * generatedPassword.length);
            if (generatedPassword[randomIndex] === 'undefined') {
                generatedPassword[randomIndex] = randomFunc[funcName]();
            }
        }
        // console.log(generatedPassword);
    }

    for(let j = 0; j < generatedPassword.length; j++) {
        if (generatedPassword[j] === 'undefined') {
            let index = Math.floor(Math.random() * filteredArray.length);
            let name = Object.keys(filteredArray[index]);
            generatedPassword[j] = randomFunc[name]();
            console.log('name ' + name);
            console.log(generatedPassword);
        }
    }

    let finalPassword = generatedPassword.join('');
    console.log(finalPassword);
    
    return finalPassword;

}


function getRandomLower() {
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    return lowers[Math.floor(Math.random()* lowers.length)];
}

function getRandomUpper() {
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return uppers[Math.floor(Math.random() * uppers.length)];
}

function getRandomNumber() {
    const numbers = '0123456789';
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomSymbol() {
    const symbols = " $!\"'()*+,%-./#:&;<=>?@[\]^_`{|}~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}