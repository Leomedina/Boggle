let form = document.querySelector("form")
let ul = document.querySelector("ul")
const wordsPlayed = []
let score = 1

/**
 * adds event listener to form
 */

form.addEventListener('submit', function (e) {
    e.preventDefault();
    input = document.querySelector("input").value.toLowerCase()
    if (!input) return;
    checkWord(input)
    form.reset();
});

/**
 * 
 * checks if the input is already played
 * pushes the the new input into the played array
 * checks the status of the word via GET request
 * takes the validation message response 
 * adds the validation message to the DOM via addWord()
 * 
 */
async function checkWord(input) {
    if (wordsPlayed.includes(input)) {
        addWord(input, "played")
        return
    }
    wordsPlayed.push(input);
    const response = await axios.get('/check-word', {
        params: {
            guess: input,
        }
    });
    validationMessage = response.data.result
    addWord(input, validationMessage)
    if (validationMessage === 'ok') {
        sendScore(input)
    }
}
//Adds the word to the dom and if it's valid it increased the score by the length of the word
function addWord(input, message) {
    const newLi = document.createElement('li');
    const normalizedInput = input.toUpperCase()
    let inputLength = input.length;

    if (message === "ok") {
        newLi.innerText = normalizedInput + ": " + "Score!"
        score += inputLength;
    } else if (message === "not-on-board") {
        newLi.innerText = normalizedInput + ": " + "Message not in the board."
    } else if (message === "played")
        newLi.innerText = normalizedInput + ": " + "Already Played! No Extra Points."
    else {
        newLi.innerText = normalizedInput + ": " + "Not a valid word."
    }

    ul.appendChild(newLi);
}

//Sends a post request updating the score
async function sendScore() {
    const response = await axios.post('/score', {
        params: {
            score: score,
        }
    });
}