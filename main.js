// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// Ex. 3 
const validateCred = card => {
    let cardInverted = card.slice().reverse(); // this makes a copy of the card and reverses the nos.
    for (let i = 0; i < cardInverted.length; i++) { // check each index and find the odd nos.
        if (i % 2 != 0) {
            cardInverted[i] = cardInverted[i] * 2; // double the value of odd numbered indexes.
            if (cardInverted[i] > 9) {
                cardInverted[i] -= 9;
            }
        }
    }
    let sumNumbers = cardInverted.reduce ((a, b) => a + b, 0);
    return (sumNumbers % 10 === 0);
}
// console.log(validateCred(invalid5));


// Ex. 4
const findInvalidCards = card => {
    let invalidCards = []  // this will be a returned nested array of invalid cards
    for (let j = 0; j < card.length; j++) {
        if (!validateCred(card[j])) {
            invalidCards.push(card[j]);
        }
    }
    // console.log(`There are total ${invalidCards.length} invalid cards from the batch`);  
    return invalidCards;
}
let invalidCardsArray = findInvalidCards(batch);

console.log(`There are ${findInvalidCards(batch).length} invalid cards in this list.`)
// console.log(invalidCardsArray);


// Ex. 5 - finding the card companies using a SWITCH statement
const idInvalidCardCompanies = invalidArray => {
    let invalidCompanies = [];
    for (let k = 0; k < invalidArray.length; k++) {
        switch (invalidArray[k][0]) {           // SWITCH looks at the first digit of every array. k is the first array, 0 is its first digit.
            case 3:
                if (invalidCompanies.indexOf('Amex') === -1) {
                    invalidCompanies.push('Amex');
                }
                break;
            case 4:
                if (invalidCompanies.indexOf('Visa') === -1) {
                    invalidCompanies.push('Visa');
                }
                break;
            case 5:
                if (invalidCompanies.indexOf('Mastercard') === -1) {
                    invalidCompanies.push('Mastercard');
                }
                break;
            case 6:
                if (invalidCompanies.indexOf('Discover') === -1) {
                    invalidCompanies.push('Discover');
                }
                break;
            default:
                if (invalidCompanies.indexOf('Company not found') === -1) {
                    invalidCompanies.push('Company not found');
                }
                break;
        }
    }
    return invalidCompanies;
}
console.log(`The following card companies have issued invalid numbers: ${idInvalidCardCompanies(invalidCardsArray).join(', ')}`);



// Ex. 5 - ALTERNATIVE METHOD using ELSE IF conditional statement
/* 
const idInvalidCardCompanies = invalidArray => {
    let invalidCompanies = [];  // this creates an empty array with the names of card companies w/ invalid nos.
    for (let k = 0; k < invalidArray.length; k++) {    // this loops through all the arrays of INVALID card numbers
        if (invalidArray[k][0] === 3) {
            if (invalidCompanies.indexOf('Amex') === -1) {    // the -1 here means "if there is NO 'Amex' string in the array yet, then add it"
                invalidCompanies.push('Amex');
            }
        } else if (invalidArray[k][0] === 4) {
            if (invalidCompanies.indexOf('Visa') === -1) {
                invalidCompanies.push('Visa');
            }
        } else if (invalidArray[k][0] === 5) {
            if (invalidCompanies.indexOf('Mastercard') === -1) {
                invalidCompanies.push('Mastercard');
            }
        } else if (invalidArray[k][0] === 6) {
            if (invalidCompanies.indexOf('Discover') === -1) {
                invalidCompanies.push('Discover');
            }
        } else {
            console.log('Company not found');
        }
    }
    return invalidCompanies;        // here, if I don't put 'return', the console will output "undefined", rather than the list of companies.
}
console.log(idInvalidCardCompanies(invalidCardsArray));
*/
