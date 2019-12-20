let resultEl = document.querySelector('#result');
let lengthEl = document.querySelector('#length');
let uppercaseEl = document.querySelector('#uppercase');
let lowercaseEl = document.querySelector('#lowercase');
let numbersEl = document.querySelector('#numbers');
let symbolsEl = document.querySelector('#symbols');
let generateEl = document.querySelector('#generate');
let clipboardEl = document.querySelector('#clipboard');
let collapseEl = document.querySelector('#collapse');
let collapseableEl = document.querySelector('.collapseable');
let pwcontaineerEl = document.querySelector('.pwcontainer');

let randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    symbol: getRandomSymbol,
    number: getRandomNumber
};

//when generate button is clicked, check length and wchich boxes are checked, then run generate function.
generateEl.addEventListener('click', () => {
    let length = +lengthEl.value;
    let hasLower = lowercaseEl.checked;
    let hasUpper = uppercaseEl.checked;
    let hasSymbol = symbolsEl.checked;
    let hasNumber = numbersEl.checked;

    resultEl.innerText = generatePassword (hasUpper, hasLower, hasSymbol, hasNumber, length);
});

//when clipboard button is clicked, if there is something there, create a new element, put the pw in that, copy to clipboard, then remove the element
clipboardEl.addEventListener('click', () => {
    let textArea = document.createElement('textarea');
    let password = resultEl.innerText;

    if (!password){
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard');
})

//when show/hide button is clicked, hide instructions container and change text of the button.
collapseEl.addEventListener('click', () => {
    if (collapseableEl.style.display === 'none') {
        collapseableEl.style.display = 'block';
        collapseEl.innerText = 'Hide';
    }
    else {
        collapseableEl.style.display = 'none';
        collapseEl.innerText = 'Show';
    }
})

//huge function to generate password and put it in the span created for it, broken down more inside.
function generatePassword(upper, lower, symbol, number, length) {
    //reset the size of the pw area
    pwcontaineerEl.style.height = '30px';
    //create the password array and fill with undefined, to be changed later
    let generatedPassword = new Array(length);
    for (i = 0; i < generatedPassword.length; i++){
        generatedPassword[i] = 'undefined';
    }
    //get the number of types used, and filtered the array down to the ones selected
    let typesCount = upper + lower + number + symbol;
    let typesArray = [{upper}, {lower}, {number}, {symbol}];
    let filteredArray = typesArray.filter(item => Object.values(item)[0]);

    // console.log(generatedPassword);
    // console.log(typesArray);
    // console.log(filteredArray);

    //check to make sure there is at least 1 type checked. if not, return nothing.
    if (typesCount === 0) {
        return '';
    }

    //check to make sure the pw is within the specified character limits. if not, return nothing
    if (length < 8 || length > 128) {
        return '';
    }

    //next few blocks change the height of the box where the passowrd is placed based on the length chosen to make sure there is enough room
    if (length > 40  && length <= 70) {
        pwcontaineerEl.style.height = '50px';
    }

    if (length > 70 && length <= 100) {
        pwcontaineerEl.style.height = '70px';
    }

    if (length > 100) {
        pwcontaineerEl.style.height = '90px';
    }
    
        //puts at least 1 of each type in a random place in the array. has a second check to in case that spot happened to be filled already.
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

    //runs through the whole array and if that spot is filled does nothing. if not filled, puts a random character in of one of the chosen types
    for(let j = 0; j < generatedPassword.length; j++) {
        if (generatedPassword[j] === 'undefined') {
            let index = Math.floor(Math.random() * filteredArray.length);
            let name = Object.keys(filteredArray[index]);
            generatedPassword[j] = randomFunc[name]();
            // console.log('name ' + name);
            // console.log(generatedPassword);
        }
    }

    let finalPassword = generatedPassword.join('');
    // console.log(finalPassword);
    
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